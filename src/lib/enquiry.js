export const ENQUIRY_SESSION_KEY = 'sci_enquiry_modal_seen';

export const ENQUIRY_COURSE_OPTIONS = [
  'ICSE Computer Tuition',
  'ISC Computer Science',
  'CBSE Computer Coaching',
  'Class 4 to 10 Computer',
  'Class 11 to 12 Computer Science',
  'Programming Classes',
  'C Programming',
  'Python Programming',
  'Practical IT Training',
  'Other',
];

export const createEmptyEnquiryForm = () => ({
  studentName: '',
  guardianName: '',
  mobile: '',
  email: '',
  course: '',
  address: '',
  message: '',
});

export const validateEnquiryPayload = (payload) => {
  const errors = {};

  if (!payload.studentName?.trim()) {
    errors.studentName = 'Student name is required.';
  }

  if (!payload.mobile?.trim()) {
    errors.mobile = 'Mobile number is required.';
  } else if (!/^[6-9]\d{9}$/.test(payload.mobile.trim())) {
    errors.mobile = 'Enter a valid 10-digit Indian mobile number.';
  }

  if (!payload.course?.trim()) {
    errors.course = 'Please select a class or course.';
  }

  if (payload.email?.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  return errors;
};

const fallbackText = (value) => value?.trim() || 'Not provided';

export const formatEnquiryMessage = (payload) => `New Admission Enquiry - Subho's Computer Institute

Session: 2026-27
Student Name: ${fallbackText(payload.studentName)}
Guardian Name: ${fallbackText(payload.guardianName)}
Mobile: ${fallbackText(payload.mobile)}
Email: ${fallbackText(payload.email)}
Course Interested In: ${fallbackText(payload.course)}
Address: ${fallbackText(payload.address)}
Message: ${fallbackText(payload.message)}

Source: ${fallbackText(payload.source || 'website_enquiry_modal')}`;
