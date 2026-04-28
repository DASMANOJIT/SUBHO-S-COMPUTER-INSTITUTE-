import {
  formatEnquiryMessage,
  formatSubmittedAt,
  normalizeEnquiryPayload,
  validateEnquiryPayload,
} from '../src/lib/enquiry.js';

const successMessage =
  'Thank you! Your enquiry has been received. Our team will contact you shortly.';
const errorMessage =
  'Something went wrong while submitting your enquiry. Please try again or contact us directly.';

const getEnvValue = (envSource, key) => envSource?.[key] || process.env[key];

const escapeHtml = (value = '') =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const buildEnquiryHtml = (payload, submittedAt) => {
  const rows = [
    ['Session', '2026-27'],
    ['Student Name', payload.studentName || 'Not provided'],
    ['Guardian Name', payload.guardianName || 'Not provided'],
    ['Mobile Number', payload.mobile || 'Not provided'],
    ['Email', payload.email || 'Not provided'],
    ['Class / Course Interested In', payload.course || 'Not provided'],
    ['Address', payload.address || 'Not provided'],
    ['Message', payload.message || 'Not provided'],
    ['Source', payload.source || 'website_admission_enquiry_form'],
    ['Submitted At', submittedAt],
  ];

  const rowMarkup = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 12px;border:1px solid #dbe5ff;background:#f5f8ff;font-weight:600;color:#12326b;vertical-align:top;">${escapeHtml(
            label
          )}</td>
          <td style="padding:10px 12px;border:1px solid #dbe5ff;color:#1f2937;">${escapeHtml(
            value
          )}</td>
        </tr>
      `
    )
    .join('');

  return `
    <div style="font-family:Arial,sans-serif;background:#f4f7ff;padding:24px;color:#111827;">
      <div style="max-width:680px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #dbe5ff;">
        <div style="background:linear-gradient(135deg,#0f2f73,#1d4ed8);padding:24px;color:#ffffff;">
          <p style="margin:0 0 8px;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;opacity:0.9;">Admission Lead</p>
          <h1 style="margin:0;font-size:28px;line-height:1.2;">New Admission Enquiry - Subho's Computer Institute</h1>
        </div>
        <div style="padding:24px;">
          <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#374151;">
            A new admission enquiry has been submitted through the website enquiry form.
          </p>
          <table style="width:100%;border-collapse:collapse;font-size:14px;line-height:1.5;">
            <tbody>${rowMarkup}</tbody>
          </table>
        </div>
      </div>
    </div>
  `;
};

export const handleEnquiryPayload = async (payload, envSource = process.env, logger = console) => {
  const errors = validateEnquiryPayload(payload);

  if (Object.keys(errors).length > 0) {
    return {
      status: 400,
      body: {
        success: false,
        message: 'Please correct the highlighted fields.',
        errors,
      },
    };
  }

  const normalizedPayload = normalizeEnquiryPayload(payload);
  const submittedAt = formatSubmittedAt();
  const textBody = formatEnquiryMessage(normalizedPayload, submittedAt);
  const htmlBody = buildEnquiryHtml(normalizedPayload, submittedAt);

  const resendApiKey = getEnvValue(envSource, 'RESEND_API_KEY');
  const enquiryToEmail =
    getEnvValue(envSource, 'ENQUIRY_TO_EMAIL') || 'subhoscomputerinstitute@gmail.com';
  const enquiryFromEmail =
    getEnvValue(envSource, 'ENQUIRY_FROM_EMAIL') ||
    "Subho's Computer Institute <onboarding@resend.dev>";

  logger.info?.('Admission enquiry received', normalizedPayload);

  if (!resendApiKey) {
    logger.warn?.('RESEND_API_KEY is missing. Enquiry email was not sent.');

    return {
      status: 500,
      body: {
        success: false,
        message: errorMessage,
      },
    };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: enquiryFromEmail,
        to: enquiryToEmail,
        subject: "New Admission Enquiry - Subho's Computer Institute",
        html: htmlBody,
        text: textBody,
      }),
    });

    if (!response.ok) {
      const responseText = await response.text();
      logger.error?.('Resend email request failed', responseText);

      return {
        status: 502,
        body: {
          success: false,
          message: errorMessage,
        },
      };
    }

    return {
      status: 200,
      body: {
        success: true,
        message: successMessage,
      },
    };
  } catch (error) {
    logger.error?.('Unexpected enquiry email error', error);

    return {
      status: 500,
      body: {
        success: false,
        message: errorMessage,
      },
    };
  }
};

const readJsonBody = async (req) => {
  if (req.body && typeof req.body === 'object') {
    return req.body;
  }

  const chunks = [];

  for await (const chunk of req) {
    chunks.push(chunk);
  }

  const raw = Buffer.concat(chunks).toString('utf-8');
  return raw ? JSON.parse(raw) : {};
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
    return;
  }

  try {
    const payload = await readJsonBody(req);
    const result = await handleEnquiryPayload(payload, process.env, console);
    res.status(result.status).json(result.body);
  } catch (error) {
    console.error('Unable to process admission enquiry', error);
    res.status(500).json({
      success: false,
      message: errorMessage,
    });
  }
}
