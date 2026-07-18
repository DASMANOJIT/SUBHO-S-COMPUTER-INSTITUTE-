import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import BookAnimation from './BookAnimation.jsx';
import './bookOrder.css';

const BookOrderButton = ({
  to = '/book-order',
  onClick,
  className = '',
  mobile = false,
  ariaLabel = 'Open the book order page',
}) => {
  return (
    <RouterLink
      to={to}
      className={`book-order-cta ${mobile ? 'book-order-cta--mobile' : ''} ${className}`.trim()}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <BookAnimation className="book-order-cta-animation" isCompact={mobile} />
      <span className="book-order-cta-text">ORDER BOOK</span>
    </RouterLink>
  );
};

export default BookOrderButton;
