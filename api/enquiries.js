import { formatEnquiryMessage, validateEnquiryPayload } from '../src/lib/enquiry.js';

const WHATSAPP_GRAPH_API_VERSION = 'v20.0';

const getEnvValue = (envSource, key) => envSource?.[key] || process.env[key];

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

  const normalizedPayload = {
    studentName: payload.studentName?.trim() || '',
    guardianName: payload.guardianName?.trim() || '',
    mobile: payload.mobile?.trim() || '',
    email: payload.email?.trim() || '',
    course: payload.course?.trim() || '',
    address: payload.address?.trim() || '',
    message: payload.message?.trim() || '',
    source: payload.source?.trim() || 'website_enquiry_modal',
  };

  const formattedMessage = formatEnquiryMessage(normalizedPayload);
  const token = getEnvValue(envSource, 'WHATSAPP_CLOUD_API_TOKEN');
  const phoneNumberId = getEnvValue(envSource, 'WHATSAPP_PHONE_NUMBER_ID');
  const adminRecipient = getEnvValue(envSource, 'WHATSAPP_ADMIN_RECIPIENT') || '919831934306';

  logger.info?.('Admission enquiry received', normalizedPayload);

  if (!token || !phoneNumberId) {
    logger.warn?.(
      'WhatsApp Cloud API environment variables are missing. Enquiry stored in server logs only.'
    );

    return {
      status: 200,
      body: {
        success: true,
        channel: 'log_only',
        message: 'Thank you! Your enquiry has been received. Our team will contact you shortly.',
      },
    };
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/${WHATSAPP_GRAPH_API_VERSION}/${phoneNumberId}/messages`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: adminRecipient,
          type: 'text',
          text: {
            preview_url: false,
            body: formattedMessage,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      logger.error?.('WhatsApp Cloud API request failed', errorText);

      return {
        status: 200,
        body: {
          success: true,
          channel: 'log_only',
          message: 'Thank you! Your enquiry has been received. Our team will contact you shortly.',
        },
      };
    }

    return {
      status: 200,
      body: {
        success: true,
        channel: 'whatsapp_cloud_api',
        message: 'Thank you! Your enquiry has been received. Our team will contact you shortly.',
      },
    };
  } catch (error) {
    logger.error?.('Unexpected enquiry forwarding error', error);

    return {
      status: 200,
      body: {
        success: true,
        channel: 'log_only',
        message: 'Thank you! Your enquiry has been received. Our team will contact you shortly.',
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
      message: 'Something went wrong while submitting the enquiry.',
    });
  }
}
