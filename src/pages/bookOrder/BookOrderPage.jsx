import React from 'react';
import { Link } from 'react-router-dom';
import BookOrderPageContent from '../../components/bookOrder/BookOrderPageContent.jsx';
import PageSeo from '../../components/seo/PageSeo.jsx';
import './bookOrderPage.css';

const BookOrderPage = () => {
  return (
    <>
      <PageSeo
        title="Order Computer Books | Subho’s Computer Institute"
        description="Order books from Subho’s Computer Institute by completing the online form and submitting your payment transaction details."
        path="/book-order"
        keywords={[
          'order computer books',
          'book order form',
          'Subho’s Computer Institute book order',
          'computer books order in Barrackpore',
          'computer books order in Shyamnagar',
        ]}
      />

      <main className="book-order-page">
        <section className="book-order-page-hero">
          <p className="page-eyebrow">BOOK ORDER</p>
          <h1>Order Your Book</h1>
          <p className="page-intro">
            Complete the form below to order your book. Scan the QR code to make the payment and
            provide the correct UTR or transaction reference number.
          </p>
          <div className="book-order-page-links">
            <Link to="/programs">Explore computer programs</Link>
            <Link to="/contact">Contact for admission</Link>
          </div>
        </section>

        <BookOrderPageContent />
      </main>
    </>
  );
};

export default BookOrderPage;
