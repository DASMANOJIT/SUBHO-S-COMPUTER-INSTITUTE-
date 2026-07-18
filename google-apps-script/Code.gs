const SHEET_NAME = 'Sheet1';
const PAYMENT_STATUS = 'Pending Verification';
const BOOK_ORDER_CONTACT_DISPLAY = '824 039 6568';
const BOOK_ORDER_CONTACT_TEL = '8240396568';
const INSTITUTE_EMAIL = 'subhoscomputerinstitute@gmail.com';

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({
      success: true,
      message: 'Google Sheets webhook is live',
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const payload = parseIncomingPayload(e);
    const validation = validatePayload(payload);

    if (Object.keys(validation.errors).length > 0) {
      return jsonResponse(400, {
        success: false,
        message: 'Please check the highlighted information and try again.',
        errors: validation.errors,
      });
    }

    const submittedAt = new Date();
    const timeZone = Session.getScriptTimeZone() || 'Asia/Kolkata';
    const orderId = generateOrderId(submittedAt, timeZone);
    const sheet = getTargetSheet();
    ensureHeaderRow(sheet);

    const studentName = normalizeText(payload.studentName);
    const email = normalizeEmail(payload.email);
    const whatsappNumber = normalizeWhatsAppNumber(payload.whatsappNumber);
    const utrNumber = normalizeUtrNumber(payload.utrNumber);

    sheet.appendRow([
      submittedAt,
      orderId,
      studentName,
      email,
      whatsappNumber,
      utrNumber,
      PAYMENT_STATUS,
    ]);

    const appendedRow = sheet.getLastRow();
    sheet.getRange(appendedRow, 1).setNumberFormat('dd mmm yyyy hh:mm:ss');

    let instituteEmailSent = false;

    try {
      sendInstituteNotificationEmail({
        orderId,
        studentName,
        email,
        whatsappNumber,
        utrNumber,
        submittedAt,
      });
      instituteEmailSent = true;
    } catch (error) {
      console.error('Institute notification email failed:', sanitizeError(error));
    }

    return jsonResponse(200, {
      success: true,
      orderId,
      message: 'Book order received successfully.',
      paymentStatus: PAYMENT_STATUS,
      sheetSaved: true,
      emailSent: instituteEmailSent,
      warning: instituteEmailSent ? '' : 'Institute notification email could not be sent.',
      contactNumber: BOOK_ORDER_CONTACT_DISPLAY,
    });
  } catch (error) {
    if (error && error.statusCode) {
      return jsonResponse(error.statusCode, {
        success: false,
        message: error.publicMessage || 'Please check the highlighted information and try again.',
        errors: error.errors || {},
      });
    }

    console.error('Unexpected book order error:', sanitizeError(error));

    return jsonResponse(500, {
      success: false,
      message: 'We could not submit your order right now. Please try again shortly.',
    });
  }
}

function parseIncomingPayload(e) {
  if (e && e.parameter && Object.keys(e.parameter).length > 0) {
    return e.parameter;
  }

  if (e && e.postData && e.postData.contents) {
    const rawBody = e.postData.contents;

    try {
      const parsed = JSON.parse(rawBody);
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        return parsed;
      }
    } catch (error) {
      // Fall through to form parsing.
    }

    return rawBody.split('&').reduce((accumulator, pair) => {
      if (!pair) {
        return accumulator;
      }

      const separatorIndex = pair.indexOf('=');
      const rawKey = separatorIndex >= 0 ? pair.slice(0, separatorIndex) : pair;
      const rawValue = separatorIndex >= 0 ? pair.slice(separatorIndex + 1) : '';
      const key = decodeURIComponent(rawKey.replace(/\+/g, ' '));
      const value = decodeURIComponent(rawValue.replace(/\+/g, ' '));
      accumulator[key] = value;
      return accumulator;
    }, {});
  }

  return {};
}

function validatePayload(payload) {
  const errors = {};

  if (typeof payload.studentName !== 'string' || normalizeText(payload.studentName).length < 2) {
    errors.studentName = 'Student name is required.';
  }

  const email = normalizeEmail(payload.email);
  if (!email) {
    errors.email = 'Email address is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Enter a valid email address.';
  }

  const whatsappNumber = normalizeWhatsAppNumber(payload.whatsappNumber);
  if (!whatsappNumber) {
    errors.whatsappNumber = 'WhatsApp number is required.';
  } else if (!/^[6-9]\d{9}$/.test(whatsappNumber)) {
    errors.whatsappNumber = 'Enter a valid 10-digit Indian WhatsApp number.';
  }

  const utrNumber = normalizeUtrNumber(payload.utrNumber);
  if (!utrNumber) {
    errors.utrNumber = 'UTR / transaction reference number is required.';
  } else if (utrNumber.length < 8 || utrNumber.length > 22) {
    errors.utrNumber = 'UTR / transaction reference number must be 8 to 22 characters long.';
  } else if (!/^[A-Z0-9]+$/.test(utrNumber)) {
    errors.utrNumber = 'Use only letters and numbers in the transaction reference number.';
  }

  const consentConfirmed =
    payload.consentConfirmed === true ||
    String(payload.consentConfirmed || '')
      .trim()
      .toLowerCase() === 'true';

  if (!consentConfirmed) {
    errors.consentConfirmed = 'Please confirm that the payment information is correct.';
  }

  return { errors };
}

function getTargetSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet) {
    throw new Error('No active spreadsheet found for the book order sheet.');
  }

  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  return sheet;
}

function ensureHeaderRow(sheet) {
  const headers = [
    'Timestamp',
    'Order ID',
    'Student Name',
    'Email Address',
    'WhatsApp Number',
    'UTR Number',
    'Payment Status',
  ];

  const lastColumn = Math.max(sheet.getLastColumn(), headers.length);
  const existingHeaders = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];
  const normalizedHeaders = existingHeaders.map((value) => normalizeText(value).toLowerCase());

  if (normalizedHeaders.every((value) => !value)) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }
}

function generateOrderId(submittedAt, timeZone) {
  const datePart = Utilities.formatDate(submittedAt, timeZone, 'yyyyMMdd');
  const timePart = Utilities.formatDate(submittedAt, timeZone, 'HHmmss');
  const randomPart = Utilities.getUuid().replace(/-/g, '').slice(0, 8).toUpperCase();
  return 'SCI-BOOK-' + datePart + '-' + timePart + '-' + randomPart;
}

function sendInstituteNotificationEmail({
  orderId,
  studentName,
  email,
  whatsappNumber,
  utrNumber,
  submittedAt,
}) {
  const timeZone = Session.getScriptTimeZone() || 'Asia/Kolkata';
  const submittedAtFormatted = Utilities.formatDate(
    submittedAt,
    timeZone,
    'dd MMMM yyyy, hh:mm a'
  );

  const subject = 'Book Order Received — ' + orderId;
  const textBody = [
    'A new book order has been received.',
    '',
    'Order ID: ' + orderId,
    'Student Name: ' + studentName,
    'Email Address: ' + email,
    'WhatsApp Number: ' + whatsappNumber,
    'UTR Number: ' + utrNumber,
    'Submission Date and Time: ' + submittedAtFormatted,
    'Payment Status: ' + PAYMENT_STATUS,
    'Book Order Contact: ' + BOOK_ORDER_CONTACT_DISPLAY,
    'Source: Subho’s Computer Institute website',
  ].join('\n');

  const htmlBody = [
    '<div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a;">',
    '<h2 style="margin:0 0 12px;color:#123280;">New Book Order Received</h2>',
    '<p><strong>Order ID:</strong> ' + escapeHtml(orderId) + '</p>',
    '<p><strong>Student Name:</strong> ' + escapeHtml(studentName) + '</p>',
    '<p><strong>Email Address:</strong> ' + escapeHtml(email) + '</p>',
    '<p><strong>WhatsApp Number:</strong> ' + escapeHtml(whatsappNumber) + '</p>',
    '<p><strong>UTR Number:</strong> ' + escapeHtml(utrNumber) + '</p>',
    '<p><strong>Submission Date and Time:</strong> ' + escapeHtml(submittedAtFormatted) + '</p>',
    '<p><strong>Payment Status:</strong> ' + escapeHtml(PAYMENT_STATUS) + '</p>',
    '<p><strong>Book Order Contact:</strong> <a href="tel:' +
      BOOK_ORDER_CONTACT_TEL +
      '">' +
      escapeHtml(BOOK_ORDER_CONTACT_DISPLAY) +
      '</a></p>',
    '<p><strong>Source:</strong> Subho’s Computer Institute website</p>',
    '</div>',
  ].join('');

  MailApp.sendEmail({
    to: INSTITUTE_EMAIL,
    subject,
    body: textBody,
    htmlBody,
  });
}

function normalizeText(value) {
  return String(value || '')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeEmail(value) {
  return normalizeText(value).toLowerCase();
}

function normalizeWhatsAppNumber(value) {
  const digits = String(value || '').replace(/\D/g, '');

  if (digits.length === 12 && digits.startsWith('91')) {
    return digits.slice(2);
  }

  if (digits.length === 11 && digits.startsWith('0')) {
    return digits.slice(1);
  }

  return digits;
}

function normalizeUtrNumber(value) {
  return normalizeText(value).replace(/\s+/g, '').toUpperCase();
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function sanitizeError(error) {
  if (!error) {
    return 'Unknown error';
  }

  if (error && error.message) {
    return error.message;
  }

  return String(error);
}

function jsonResponse(statusCode, payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}
