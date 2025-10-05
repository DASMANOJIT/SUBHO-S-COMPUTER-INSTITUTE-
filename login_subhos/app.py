import os
import uuid
from datetime import datetime
from flask import Flask, render_template, request, redirect, url_for, session , flash, send_from_directory ,jsonify
from flask_cors import CORS 
from supabase import create_client
from postgrest.exceptions import APIError



# === CONFIG ===
SUPABASE_URL = "https://hncpbcoebuzyxoayplyv.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhuY3BiY29lYnV6eXhvYXlwbHl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyOTM1NjQsImV4cCI6MjA3Mzg2OTU2NH0.jH47Lii9yBURK15I6G-Nx6QMmVSz1mQln3qO59LPmNI"
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), "static", "uploads")
ALLOWED_EXT = {"pdf", "png", "jpg", "jpeg", "txt", "docx"}

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app = Flask(__name__, static_folder="./dist", static_url_path="/")
CORS(app, origins=["http://localhost:5173/"])
app.secret_key = os.environ.get("FLASK_SECRET", "dev-secret-key")
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER



supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# === HELPERS ===
def allowed_filename(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXT

def get_user_by_phone(phone):
    res = supabase.table("users").select("*").eq("phone_number", phone).limit(1).execute()
    data = res.data
    return data[0] if data else None

def get_user(user_id):
    res = supabase.table("users").select("*").eq("id", user_id).limit(1).execute()
    data = res.data
    return data[0] if data else None

def login_required(role=None):
    def decorator(f):
        from functools import wraps
        @wraps(f)
        def wrapped(*args, **kwargs):
            if "user_id" not in session:
                return redirect(url_for("login"))
            if role and session.get("role") != role:
                flash("Access denied.")
                return redirect(url_for("login"))
            return f(*args, **kwargs)
        return wrapped
    return decorator

# === ROUTES ===
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_react(path):
    if path != "" and (app.static_folder and (app.static_folder + "/" + path)):
        try:
            return send_from_directory(app.static_folder, path)
        except:
            pass
    return send_from_directory(app.static_folder, "index.html")






@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        phone = request.form.get("phone")
        password = request.form.get("password")
        user = get_user_by_phone(phone)
        if not user or user.get ("password_hash") != password:
            flash("Invalid phone number or password", "danger")
            return redirect(url_for("login")) 
        # Successful login
        session["user_id"] = user["id"]
        session["role"] = user["role"]
        session["name"] = user["name"]
        # redirect to proper dashboard
        if user["role"] == "admin":
            return redirect(url_for("admin_dashboard"))
        elif user["role"] == "teacher":
            return redirect(url_for("teacher_dashboard"))
        else:
            return redirect(url_for("student_dashboard"))
    return render_template('login.html')


@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("login"))


# ---------- STUDENT ----------
@app.route("/student")
@login_required(role="student")
def student_dashboard():
    user_id = session["user_id"]
    # fetch student record to find school_id and class_id
    stu_res = (
        supabase.table("students")
        .select("id, user_id, school_id, class_id, profile_pic")  # 👈 CHANGED: added profile_pic
        .eq("user_id", user_id)
        .limit(1)
        .execute()
    )
    stu = stu_res.data[0] if stu_res.data else None

    materials = []
    announcements = []
    if stu:
        # study materials where school_id = stu.school_id AND class_id = stu.class_id
        mat_res = (
            supabase.table("study_materials")
            .select("*")
            .eq("school_id", stu["school_id"])
            .eq("class_id", stu["class_id"])
            .order("uploaded_at", desc=True)
            .execute()
        )
        materials = mat_res.data or []

        # announcements
        ann_res = (
            supabase.table("announcements")
            .select("*")
            .or_(f"school_id.eq.{stu['school_id']},class_id.eq.{stu['class_id']}")
            .order("created_at", desc=True)
            .execute()
        )
        announcements = ann_res.data or []

    return render_template(
        "student_dashboard.html",
        student=stu,
        materials=materials,
        announcements=announcements
    )

@app.route("/upload_profile_pic", methods=["POST"])
@login_required(role="student")
def upload_profile_pic():
    user_id = session["user_id"]
    file = request.files["profile_pic"]

    # Validate image
    if not file or not file.mimetype.startswith("image/"):
        flash("Please upload a valid image.", "danger")
        return redirect(url_for("student_dashboard"))

    # Generate file path
    file_ext = file.filename.rsplit(".", 1)[-1].lower()
    file_path = f"profile_pics/{user_id}.{file_ext}"

    # Read file bytes
    file_content = file.read()
    file.seek(0)

    # ✅ Upload with correct headers
    supabase.storage.from_("profile_pics").upload(
        path=file_path,
        file=file_content,
        file_options={
            "content-type": file.mimetype,
            "x-upsert": "true"   # must be string
        },
    )

    # Get public URL
    file_url = supabase.storage.from_("profile_pics").get_public_url(file_path)

    # Save URL in students table
    supabase.table("students").update({"profile_pic": file_url}).eq("user_id", user_id).execute()

    flash("Profile picture updated!", "success")
    return redirect(url_for("student_dashboard"))




@app.route("/student/delete_profile_pic", methods=["POST"])
@login_required(role="student")
def delete_profile_pic():
    user_id = session["user_id"]

    # Get current pic from DB using user_id (consistent with upload route)
    student = (
        supabase.table("students")
        .select("profile_pic")
        .eq("user_id", user_id)
        .single()
        .execute()
        .data
    )

    if student and student.get("profile_pic"):
        url = student["profile_pic"]
        try:
            # Extract file name after "profile_pics/"
            path = url.split("/profile_pics/")[-1]
            supabase.storage.from_("profile_pics").remove([f"profile_pics/{path}"])
        except Exception as e:
            print("Storage cleanup failed:", e)

    # Clear DB field (again filter by user_id)
    supabase.table("students").update({"profile_pic": None}).eq("user_id", user_id).execute()

    flash("Profile picture deleted.", "success")
    return redirect(url_for("student_dashboard"))


# ---------- TEACHER ----------
@app.route("/teacher")
@login_required(role="teacher")
def teacher_dashboard():
    user_id = session["user_id"]

    # fetch school and class lists for dropdowns
    schools = supabase.table("schools").select("*").execute().data or []
    classes = supabase.table("classes").select("*").execute().data or []

    # fetch teacher-specific data
    mats = (
        supabase.table("study_materials")
        .select("*")
        .eq("uploaded_by", user_id)
        .order("uploaded_at", desc=True)
        .execute()
        .data or []
    )

    dues = (
        supabase.table("teacher_dues")
        .select("*")
        .eq("teacher_id", user_id)
        .order("updated_at", desc=True)
        .execute()
        .data or []
    )

    announcements = (
        supabase.table("announcements")
        .select("*")
        .eq("created_by", user_id)
        .order("created_at", desc=True)
        .execute()
        .data or []
    )

    return render_template(
        "teacher_dashboard.html",
        materials=mats,
        dues=dues,
        announcements=announcements,
        schools=schools,
        classes=classes
    )

@app.route("/teacher/upload_material", methods=["POST"])
@login_required(role="teacher")
def upload_material():
    title = request.form.get("title")
    description = request.form.get("description")
    school_id = request.form.get("school_id")
    class_id = request.form.get("class_id")
    file_urls = []

    # handle uploaded file(s)
    files = request.files.getlist("files")
    for f in files:
        if f and allowed_filename(f.filename):
            ext = f.filename.rsplit(".", 1)[1]
            filename = f"{uuid.uuid4().hex}.{ext}"
            path = f"materials/{filename}"   # folder inside your bucket

            # upload file to Supabase Storage
            res = supabase.storage.from_("study_materials").upload(path, f.read(), {
                "content-type": f.mimetype
            })

            # get public URL of the file
            public_url = supabase.storage.from_("study_materials").get_public_url(path)
            file_urls.append(public_url)

    # also accept direct external links from form
    link = request.form.get("link")
    links = [link] if link else []

    # insert record in study_materials table
    payload = {
        "title": title,
        "description": description,
        "file_urls": file_urls,
        "links": links,
        "uploaded_by": session["user_id"],
        "school_id": int(school_id) if school_id else None,
        "class_id": int(class_id) if class_id else None
    }
    supabase.table("study_materials").insert(payload).execute()

    flash("Material uploaded successfully.", "success")
    return redirect(url_for("teacher_dashboard"))


from datetime import datetime

@app.route("/teacher/post_announcement", methods=["POST"])
@login_required(role="teacher")
def post_announcement():
    title = request.form.get("title")
    message = request.form.get("message")   # renamed from content
    meeting_link = request.form.get("meeting_link")  # optional field
    school_id = request.form.get("school_id")
    class_id = request.form.get("class_id")

    payload = {
        "title": title,
        "message": message,
        "meeting_link": meeting_link,
        "school_id": int(school_id) if school_id else None,
        "class_id": int(class_id) if class_id else None,
        "created_by": session["user_id"],
        "created_at": datetime.utcnow().isoformat()
    }

    supabase.table("announcements").insert(payload).execute()
    flash("Announcement posted successfully.", "success")
    return redirect(url_for("teacher_dashboard"))

@app.route("/teacher/delete_material/<int:material_id>", methods=["POST"])
@login_required(role="teacher")
def delete_material(material_id):
    user_id = session["user_id"]

    # ensure teacher only deletes their own materials
    supabase.table("study_materials").delete().eq("id", material_id).eq("uploaded_by", user_id).execute()

    flash("Material deleted successfully.", "success")
    return redirect(url_for("teacher_dashboard"))


@app.route("/teacher/delete_announcement/<int:announcement_id>", methods=["POST"])
@login_required(role="teacher")
def delete_announcement(announcement_id):
    user_id = session["user_id"]

    # ensure teacher only deletes their own announcements
    supabase.table("announcements").delete().eq("id", announcement_id).eq("created_by", user_id).execute()

    flash("Announcement deleted successfully.", "success")
    return redirect(url_for("teacher_dashboard"))


@app.route("/teacher/add_due", methods=["POST"])
@login_required(role="teacher")
def add_due():
    amount = request.form.get("amount")
    payload = {
        "teacher_id": session["user_id"],
        "amount": float(amount),
        "status": "unpaid",
        "approved": False,
        "updated_at": datetime.utcnow().isoformat()
    }
    supabase.table("teacher_dues").insert(payload).execute()
    flash("Due created successfully.", "success")
    return redirect(url_for("teacher_dashboard"))

# ---------- ADMIN ----------
@app.route("/admin")
@login_required(role="admin")
def admin_dashboard():
    schools = supabase.table("schools").select("*").execute().data
    classes = supabase.table("classes").select("*").execute().data
    teachers = supabase.table("users").select("*").eq("role", "teacher").execute().data
    materials = supabase.table("study_materials").select("*").execute().data
    dues = supabase.table("teacher_dues").select("*").execute().data

    return render_template(
        "admin_dashboard.html",
        schools=schools,
        classes=classes,
        teachers=teachers,
        materials=materials,
        dues=dues
    )
@app.route("/admin/create_user", methods=["POST"])
@login_required(role="admin")
def admin_create_user():
    name = request.form.get("name")
    phone = request.form.get("phone")
    dob = request.form.get("dob")
    email = request.form.get("email")
    role = request.form.get("role")
    password = request.form.get("password") or "pass123"  # plaintext per note
    payload = {
        "name": name,
        "dob": dob,
        "phone_number": phone,
        "email": email,
        "role": role,
        "password_hash": password
    }
    # Insert user, then optionally insert into students table if role == student
   



    try:
        # Check if user with the same phone number already exists
        existing_user = get_user_by_phone(phone)
        if existing_user:
            flash(f"User with phone number {phone} already exists.", "danger")
            return redirect(url_for("admin_dashboard"))

        res = supabase.table("users").insert(payload).execute()
        user_id = res.data[0]["id"]

        if role == "student":
            school_id = request.form.get("school_id")
            class_id = request.form.get("class_id")

            stu_payload = {
                "user_id": user_id,
                "school_id": int(school_id) if school_id else None,
                "class_id": int(class_id) if class_id else None,
            }

            supabase.table("students").insert(stu_payload).execute()

        flash("User created successfully.", "success")

    except APIError as e:
        flash(f"Error creating user: {str(e)}", "danger")

    return redirect(url_for("admin_dashboard"))



@app.route("/admin/mark_due_paid/<int:due_id>", methods=["POST"])
@login_required(role="admin")
def mark_due_paid(due_id):
    supabase.table("teacher_dues").update({"status": "paid", "approved": True, "updated_at": datetime.utcnow().isoformat()}).eq("id", due_id).execute()
    flash("Due marked as paid.", "success")
    return redirect(url_for("admin_dashboard"))

# Static route for uploaded files (optional - Flask already serves /static)
@app.route("/uploads/<path:filename>")
def uploaded_file(filename):
    return send_from_directory(app.config["UPLOAD_FOLDER"], filename)


if __name__ == "__main__":
    app.run(debug=True, port=5000)
