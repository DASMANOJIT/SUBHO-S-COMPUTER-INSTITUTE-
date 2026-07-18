import React from 'react';
import './bookOrder.css';

const BookOrderSuccess = ({
  orderId,
  studentName,
  contactNumber,
}) => {
  const contactDigits = String(contactNumber || '').replace(/\D/g, '');

  return (
    <div className="book-order-success" role="status" aria-live="polite">
      <p className="book-order-success-badge">THANKS FOR ORDERING THE BOOK</p>
      <h3>Your order ID is: {orderId}</h3>
      <p className="book-order-success-copy">
        {studentName ? `${studentName}, ` : ''}
        your payment details have been received and are pending verification.
      </p>
      <p className="book-order-success-contact">
        For further information, contact:{' '}
        <a href={`tel:${contactDigits || '8240396568'}`}>{contactNumber || '824 039 6568'}</a>
      </p>
    </div>
  );
};

export default BookOrderSuccess;
