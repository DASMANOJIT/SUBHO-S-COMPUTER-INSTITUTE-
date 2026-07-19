const SCRIPT_VERSION = "BOOK-ORDER-V4";

const SPREADSHEET_ID =
  "1yCXXjbkWWBJNUHiyH7QcthN-Cxe5V6QA1XCPpI3KXRs";

const SHEET_NAME = "Book Orders";

const NOTIFICATION_EMAIL =
  "subhoscomputerinstitute@gmail.com";

const BOOK_ORDER_CONTACT_NUMBER = "824 039 6568";

const OFFICIAL_BOOK_PRICE = "₹500";

const ALLOWED_STUDENT_CLASSES = [
  "Class 3",
  "Class 4",
  "Class 5",
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11",
  "Class 12",
  "Other / Computer Course",
];

const ALLOWED_PAYMENT_METHODS = [
  "UPI QR Code",
  "UPI ID / Phone Number",
];

/**
 * Run this manually to verify spreadsheet access.
 */
function testSpreadsheetConnection() {
  const spreadsheet =
    SpreadsheetApp.openById(SPREADSHEET_ID);

  console.log(
    "Connected spreadsheet: " +
      spreadsheet.getName(),
  );

  const sheet =
    spreadsheet.getSheetByName(SHEET_NAME);

  console.log(
    "Book Orders sheet found: " +
      Boolean(sheet),
  );
}

/**
 * Opening the deployed /exec URL in the browser
 * should return this information.
 */
function doGet() {
  return createJsonResponse_({
    success: true,
    version: SCRIPT_VERSION,
    scriptVersion: SCRIPT_VERSION,
    message:
      "Subho's Computer Institute book-order service is running.",
  });
}

/**
 * Receives Book Order submissions.
 */
function doPost(e) {
  const lock =
    LockService.getScriptLock();

  try {
    lock.waitLock(10000);

    const requestData =
      parseRequest_(e);

    /*
     * Temporary safe diagnostics.
     * These logs show field names and the four
     * new non-sensitive order values.
     */
    console.log(
      "Running script version: " +
        SCRIPT_VERSION,
    );

    console.log(
      "Received field names: " +
        Object.keys(requestData).join(", "),
    );

    console.log(
      "Received new Book Order fields: " +
        JSON.stringify({
          studentClass:
            requestData.studentClass || "",
          isSubhosStudent:
            requestData.isSubhosStudent || "",
          paymentMethod:
            requestData.paymentMethod || "",
          consentConfirmed:
            requestData.consentConfirmed || "",
        }),
    );

    const studentName = cleanText_(
      requestData.studentName,
      100,
    );

    const studentClass = cleanText_(
      requestData.studentClass,
      50,
    );

    const isSubhosStudent =
      normalizeYesNo_(
        requestData.isSubhosStudent,
      );

    const email = cleanText_(
      requestData.email,
      150,
    ).toLowerCase();

    const whatsappNumber =
      normalizeWhatsApp_(
        requestData.whatsappNumber,
      );

    /*
     * The trusted price comes from Apps Script,
     * not from editable browser data.
     */
    const bookPrice = cleanText_(
      OFFICIAL_BOOK_PRICE,
      30,
    );

    const paymentMethod =
      normalizePaymentMethod_(
        requestData.paymentMethod,
      );

    const utrNumber = cleanText_(
      requestData.utrNumber,
      22,
    )
      .replace(/\s+/g, "")
      .toUpperCase();

    const consentConfirmed =
      String(
        requestData.consentConfirmed || "",
      )
        .trim()
        .toLowerCase() === "true";

    console.log(
      "Normalized new fields: " +
        JSON.stringify({
          studentClass,
          isSubhosStudent,
          bookPrice,
          paymentMethod,
          consentConfirmed,
        }),
    );

    validateOrder_({
      studentName,
      studentClass,
      isSubhosStudent,
      email,
      whatsappNumber,
      bookPrice,
      paymentMethod,
      utrNumber,
      consentConfirmed,
    });

    const submittedAt = new Date();

    const orderId =
      generateOrderId_(submittedAt);

    const spreadsheet =
      SpreadsheetApp.openById(
        SPREADSHEET_ID,
      );

    let sheet =
      spreadsheet.getSheetByName(
        SHEET_NAME,
      );

    if (!sheet) {
      sheet =
        spreadsheet.insertSheet(
          SHEET_NAME,
        );
    }

    ensureHeaders_(sheet);

    /*
     * Write all 11 columns explicitly.
     * This removes any ambiguity about H–K.
     */
    const writtenRow = writeOrderRow_(
      sheet,
      {
        submittedAt,
        orderId,
        studentName,
        email,
        whatsappNumber,
        utrNumber,
        studentClass,
        isSubhosStudent,
        bookPrice,
        paymentMethod,
      },
    );

    SpreadsheetApp.flush();

    console.log(
      "Order saved in spreadsheet row: " +
        writtenRow,
    );

    console.log(
      "Saved H-K values: " +
        JSON.stringify({
          studentClass,
          isSubhosStudent,
          bookPrice,
          paymentMethod,
        }),
    );

    let emailSent = false;
    let emailWarning = null;

    try {
      sendInstituteNotification_({
        orderId,
        submittedAt,
        studentName,
        studentClass,
        isSubhosStudent,
        email,
        whatsappNumber,
        bookPrice,
        paymentMethod,
        utrNumber,
      });

      emailSent = true;
    } catch (emailError) {
      console.error(
        "Order saved, but notification email failed: " +
          sanitizeError_(emailError),
      );

      emailWarning =
        "The order was saved, but the notification email could not be sent.";
    }

    return createJsonResponse_({
  success: true,
  version: SCRIPT_VERSION,
  scriptVersion: SCRIPT_VERSION,
  orderId,
  message:
    "Book order received successfully.",
  paymentStatus:
    "Pending Verification",
  sheetSaved: true,
  sheetRow: writtenRow,
  emailSent,
  warning: emailWarning,
  studentClass,
  isSubhosStudent,
  bookPrice,
  paymentMethod,
});
  } catch (error) {
    console.error(
      "Book-order submission failed: " +
        sanitizeError_(error),
    );

    return createJsonResponse_({
  success: false,
  version: SCRIPT_VERSION,
  scriptVersion: SCRIPT_VERSION,
  message:
    error && error.message
      ? error.message
      : "The book order could not be submitted.",
});
  } finally {
    try {
      if (lock.hasLock()) {
        lock.releaseLock();
      }
    } catch (lockError) {
      console.error(
        "Could not release lock: " +
          sanitizeError_(lockError),
      );
    }
  }
}

/**
 * Supports JSON and URLSearchParams/form-encoded
 * submissions from the React website.
 */
function parseRequest_(e) {
  if (!e) {
    throw new Error(
      "No request data was received.",
    );
  }

  const contentType =
    e.postData && e.postData.type
      ? String(
          e.postData.type,
        ).toLowerCase()
      : "";

  if (
    contentType.includes(
      "application/json",
    ) &&
    e.postData &&
    e.postData.contents
  ) {
    try {
      return JSON.parse(
        e.postData.contents,
      );
    } catch (error) {
      throw new Error(
        "Invalid JSON request.",
      );
    }
  }

  return e.parameter || {};
}

/**
 * Validates all Book Order values.
 */
function validateOrder_(order) {
  if (
    !order.studentName ||
    order.studentName.length < 2 ||
    order.studentName.length > 100
  ) {
    throw new Error(
      "Please enter a valid student name.",
    );
  }

  if (
    !ALLOWED_STUDENT_CLASSES.includes(
      order.studentClass,
    )
  ) {
    throw new Error(
      "Please select a valid student class.",
    );
  }

  if (
    order.isSubhosStudent !== "Yes" &&
    order.isSubhosStudent !== "No"
  ) {
    throw new Error(
      "Please specify whether the student studies at Subho's Computer Institute.",
    );
  }

  const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (
    !order.email ||
    order.email.length > 150 ||
    !emailPattern.test(order.email)
  ) {
    throw new Error(
      "Please enter a valid email address.",
    );
  }

  const indianMobilePattern =
    /^[6-9]\d{9}$/;

  if (
    !indianMobilePattern.test(
      order.whatsappNumber,
    )
  ) {
    throw new Error(
      "Please enter a valid 10-digit WhatsApp number.",
    );
  }

  if (!order.bookPrice) {
    throw new Error(
      "The book price has not been configured.",
    );
  }

  if (
    order.bookPrice.length > 30
  ) {
    throw new Error(
      "The configured book price is invalid.",
    );
  }

  if (
    !ALLOWED_PAYMENT_METHODS.includes(
      order.paymentMethod,
    )
  ) {
    throw new Error(
      "Please select a valid payment method.",
    );
  }

  const utrPattern =
    /^[A-Z0-9]{8,22}$/;

  if (
    !utrPattern.test(
      order.utrNumber,
    )
  ) {
    throw new Error(
      "The UTR number must contain 8 to 22 letters or numbers.",
    );
  }

  if (
    order.consentConfirmed !== true
  ) {
    throw new Error(
      "Please confirm that the payment information is correct.",
    );
  }
}

/**
 * Converts WhatsApp input into a 10-digit
 * Indian mobile number.
 */
function normalizeWhatsApp_(value) {
  let digits = String(
    value || "",
  ).replace(/\D/g, "");

  if (
    digits.length === 12 &&
    digits.startsWith("91")
  ) {
    digits =
      digits.substring(2);
  }

  return digits;
}

/**
 * Converts institute-student response to
 * exactly Yes or No.
 */
function normalizeYesNo_(value) {
  const normalized = String(
    value || "",
  )
    .trim()
    .toLowerCase();

  if (normalized === "yes") {
    return "Yes";
  }

  if (normalized === "no") {
    return "No";
  }

  return "";
}

/**
 * Supports the exact official payment methods
 * and common harmless spacing variations.
 */
function normalizePaymentMethod_(value) {
  const original = cleanText_(
    value,
    40,
  );

  const normalized = original
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();

  if (
    normalized === "upi qr code" ||
    normalized === "qr code" ||
    normalized === "qr"
  ) {
    return "UPI QR Code";
  }

  if (
    normalized ===
      "upi id / phone number" ||
    normalized ===
      "upi id/phone number" ||
    normalized ===
      "upi id or phone number"
  ) {
    return "UPI ID / Phone Number";
  }

  return original;
}

/**
 * Cleans submitted text.
 */
function cleanText_(
  value,
  maximumLength,
) {
  return String(value || "")
    .trim()
    .replace(/\s+/g, " ")
    .substring(
      0,
      maximumLength,
    );
}

/**
 * Prevents spreadsheet formula injection.
 */
function safeSheetValue_(value) {
  const text = String(
    value || "",
  );

  if (/^[=+\-@]/.test(text)) {
    return "'" + text;
  }

  return text;
}

/**
 * Creates the official order ID.
 */
function generateOrderId_(date) {
  const datePart =
    Utilities.formatDate(
      date,
      Session.getScriptTimeZone(),
      "yyyyMMdd",
    );

  const randomPart =
    Utilities.getUuid()
      .replace(/-/g, "")
      .substring(0, 8)
      .toUpperCase();

  return (
    `SCI-BOOK-${datePart}-` +
    randomPart
  );
}

/**
 * Creates or verifies Sheet headers.
 */
function ensureHeaders_(sheet) {
  const originalHeaders = [
    "Timestamp",
    "Order ID",
    "Student Name",
    "Email Address",
    "WhatsApp Number",
    "UTR Number",
    "Payment Status",
  ];

  const additionalHeaders = [
    "Student Class",
    "Student at Subho's Institute",
    "Book Price",
    "Payment Method",
  ];

  if (sheet.getLastRow() === 0) {
    const allHeaders = [
      ...originalHeaders,
      ...additionalHeaders,
    ];

    sheet
      .getRange(
        1,
        1,
        1,
        allHeaders.length,
      )
      .setValues([
        allHeaders,
      ]);

    styleHeaders_(
      sheet,
      allHeaders.length,
    );

    return;
  }

  additionalHeaders.forEach(
    function (
      expectedHeader,
      index,
    ) {
      const column =
        8 + index;

      const cell =
        sheet.getRange(
          1,
          column,
        );

      const currentHeader =
        String(
          cell.getValue() || "",
        ).trim();

      if (!currentHeader) {
        cell.setValue(
          expectedHeader,
        );

        return;
      }

      if (
        currentHeader !==
        expectedHeader
      ) {
        throw new Error(
          "Unexpected header in column " +
            column +
            ": " +
            currentHeader,
        );
      }
    },
  );

  styleHeaders_(sheet, 11);
}

/**
 * Writes one complete 11-column order row.
 */
function writeOrderRow_(
  sheet,
  order,
) {
  const nextRow =
    Math.max(
      sheet.getLastRow() + 1,
      2,
    );

  const rowValues = [
    order.submittedAt,
    safeSheetValue_(
      order.orderId,
    ),
    safeSheetValue_(
      order.studentName,
    ),
    safeSheetValue_(
      order.email,
    ),
    safeSheetValue_(
      order.whatsappNumber,
    ),
    safeSheetValue_(
      order.utrNumber,
    ),
    "Pending Verification",
    safeSheetValue_(
      order.studentClass,
    ),
    safeSheetValue_(
      order.isSubhosStudent,
    ),
    safeSheetValue_(
      order.bookPrice,
    ),
    safeSheetValue_(
      order.paymentMethod,
    ),
  ];

  /*
   * Format B–K as text before inserting.
   */
  sheet
    .getRange(
      nextRow,
      2,
      1,
      10,
    )
    .setNumberFormat("@");

  /*
   * Write A–K in one operation.
   */
  sheet
    .getRange(
      nextRow,
      1,
      1,
      rowValues.length,
    )
    .setValues([
      rowValues,
    ]);

  sheet
    .getRange(
      nextRow,
      1,
    )
    .setNumberFormat(
      "dd/mm/yyyy hh:mm:ss",
    );

  return nextRow;
}

/**
 * Styles the Sheet headings.
 */
function styleHeaders_(
  sheet,
  numberOfColumns,
) {
  sheet
    .getRange(
      1,
      1,
      1,
      numberOfColumns,
    )
    .setFontWeight("bold")
    .setBackground("#173B8F")
    .setFontColor("#FFFFFF");

  sheet.setFrozenRows(1);

  sheet.setColumnWidth(1, 180);
  sheet.setColumnWidth(2, 240);
  sheet.setColumnWidth(3, 200);
  sheet.setColumnWidth(4, 240);
  sheet.setColumnWidth(5, 170);
  sheet.setColumnWidth(6, 190);
  sheet.setColumnWidth(7, 180);
  sheet.setColumnWidth(8, 150);
  sheet.setColumnWidth(9, 220);
  sheet.setColumnWidth(10, 130);
  sheet.setColumnWidth(11, 190);
}

/**
 * Sends the institute notification email.
 */
function sendInstituteNotification_(
  order,
) {
  const submittedTime =
    Utilities.formatDate(
      order.submittedAt,
      Session.getScriptTimeZone(),
      "dd MMMM yyyy, hh:mm a",
    );

  const subject =
    `New Book Order — ${order.orderId}`;

  const plainTextBody = [
    "A new book order has been submitted.",
    "",
    `Order ID: ${order.orderId}`,
    `Student Name: ${order.studentName}`,
    `Student Class: ${order.studentClass}`,
    `Student at Subho's Institute: ${order.isSubhosStudent}`,
    `Email Address: ${order.email}`,
    `WhatsApp Number: ${order.whatsappNumber}`,
    `Book Price: ${order.bookPrice}`,
    `Payment Method: ${order.paymentMethod}`,
    `UTR Number: ${order.utrNumber}`,
    `Submitted At: ${submittedTime}`,
    "Payment Status: Pending Verification",
    "Source: Subho's Computer Institute website",
    `Book Order Contact: ${BOOK_ORDER_CONTACT_NUMBER}`,
    "",
    "Please verify the payment before confirming the order.",
  ].join("\n");

  const htmlBody = `
    <div
      style="
        font-family:Arial,sans-serif;
        line-height:1.6;
        color:#172033;
      "
    >
      <h2 style="color:#173B8F;">
        New Book Order
      </h2>

      <table
        style="
          border-collapse:collapse;
          width:100%;
          max-width:700px;
        "
      >
        ${emailRow_(
          "Order ID",
          order.orderId,
        )}

        ${emailRow_(
          "Student Name",
          order.studentName,
        )}

        ${emailRow_(
          "Student Class",
          order.studentClass,
        )}

        ${emailRow_(
          "Student at Subho's Institute",
          order.isSubhosStudent,
        )}

        ${emailRow_(
          "Email Address",
          order.email,
        )}

        ${emailRow_(
          "WhatsApp Number",
          order.whatsappNumber,
        )}

        ${emailRow_(
          "Book Price",
          order.bookPrice,
        )}

        ${emailRow_(
          "Payment Method",
          order.paymentMethod,
        )}

        ${emailRow_(
          "UTR Number",
          order.utrNumber,
        )}

        ${emailRow_(
          "Submitted At",
          submittedTime,
        )}

        ${emailRow_(
          "Payment Status",
          "Pending Verification",
        )}

        ${emailRow_(
          "Book Order Contact",
          BOOK_ORDER_CONTACT_NUMBER,
        )}
      </table>

      <p style="margin-top:20px;">
        Please verify the payment before confirming the order.
      </p>
    </div>
  `;

  MailApp.sendEmail({
    to: NOTIFICATION_EMAIL,
    subject,
    body: plainTextBody,
    htmlBody,
    name:
      "Subho's Computer Institute Website",
  });
}

/**
 * Creates one HTML email table row.
 */
function emailRow_(
  label,
  value,
) {
  return `
    <tr>
      <td
        style="
          padding:10px;
          border:1px solid #d8dfed;
          font-weight:bold;
          background:#f5f7fc;
          width:40%;
        "
      >
        ${escapeHtml_(label)}
      </td>

      <td
        style="
          padding:10px;
          border:1px solid #d8dfed;
        "
      >
        ${escapeHtml_(value)}
      </td>
    </tr>
  `;
}

/**
 * Escapes user values used in HTML emails.
 */
function escapeHtml_(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Produces a safe log message.
 */
function sanitizeError_(error) {
  if (!error) {
    return "Unknown error";
  }

  if (error.message) {
    return String(
      error.message,
    ).substring(0, 300);
  }

  return String(
    error,
  ).substring(0, 300);
}

/**
 * Returns JSON from the Apps Script Web App.
 */
function createJsonResponse_(data) {
  return ContentService
    .createTextOutput(
      JSON.stringify(data),
    )
    .setMimeType(
      ContentService.MimeType.JSON,
    );
}