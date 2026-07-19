const rawBookPrice = import.meta.env.VITE_BOOK_ORDER_PRICE;
const rawUpiId = import.meta.env.VITE_BOOK_ORDER_UPI_ID;
const rawUpiPhone = import.meta.env.VITE_BOOK_ORDER_UPI_PHONE;

function formatBookPrice(value) {
  const normalized = String(value || '').trim();

  if (!normalized) {
    return '';
  }

  if (normalized.startsWith('₹')) {
    return normalized;
  }

  return `₹${normalized}`;
}

function readConfiguredValue(value, fallback) {
  const normalized = String(value || '').trim();

  return normalized || fallback;
}

export const BOOK_ORDER_CONFIG = Object.freeze({
  bookPrice: formatBookPrice(readConfiguredValue(rawBookPrice, '500')),
  upiId: readConfiguredValue(rawUpiId, 'sounavachatterjee@slc'),
  upiPhone: readConfiguredValue(rawUpiPhone, '8240396568').replace(/\D/g, ''),
});
