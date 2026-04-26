import React, { useEffect, useMemo, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { useLocation } from 'react-router-dom';
import FounderPhoto from '../assets/subho.jpg';
import {
  createEmptyEnquiryForm,
  ENQUIRY_COURSE_OPTIONS,
  ENQUIRY_SESSION_KEY,
  validateEnquiryPayload,
} from '../../lib/enquiry.js';
import './enquiryModal.css';

const successMessage =
  'Thank you! Your enquiry has been received. Our team will contact you shortly.';

const EnquiryModal = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(createEmptyEnquiryForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState({ type: '', message: '' });

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    if (!isHomePage || typeof window === 'undefined') return undefined;
    if (window.sessionStorage.getItem(ENQUIRY_SESSION_KEY)) return undefined;

    const timerId = window.setTimeout(() => {
      setIsOpen(true);
    }, 1500);

    return () => window.clearTimeout(timerId);
  }, [isHomePage]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!submitState.type || submitState.type !== 'success') return undefined;

    const timeoutId = window.setTimeout(() => {
      setIsOpen(false);
    }, 2000);

    return () => window.clearTimeout(timeoutId);
  }, [submitState.type]);

  const introPoints = useMemo(
    () => [
      'Session 2026-27 admissions support',
      'ICSE, ISC, CBSE and programming guidance',
      'Quick follow-up from our academic team',
    ],
    []
  );

  const closeModal = () => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(ENQUIRY_SESSION_KEY, 'true');
    }
    setIsOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: '',
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      ...formData,
      source: 'website_enquiry_modal',
    };

    const nextErrors = validateEnquiryPayload(payload);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setSubmitState({ type: '', message: '' });

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setSubmitState({
          type: 'error',
          message: result.message || 'Unable to submit your enquiry right now.',
        });

        if (result.errors) {
          setErrors(result.errors);
        }
        return;
      }

      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem(ENQUIRY_SESSION_KEY, 'true');
      }

      setSubmitState({
        type: 'success',
        message: successMessage,
      });
      setFormData(createEmptyEnquiryForm());
      setErrors({});
    } catch (error) {
      setSubmitState({
        type: 'error',
        message: 'Something went wrong while sending your enquiry. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="enquiry-modal-overlay" onClick={closeModal}>
      <div
        className="enquiry-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="enquiry-modal-close"
          onClick={closeModal}
          aria-label="Close enquiry form"
        >
          <IoClose aria-hidden="true" />
        </button>

        <div className="enquiry-modal-poster">
          <div className="enquiry-modal-poster-inner">
            <p className="enquiry-modal-eyebrow">Admission Support</p>
            <h2 id="enquiry-modal-title">Admission Enquiry Form</h2>
            <p className="enquiry-modal-session">Session 2026-27</p>
            <p className="enquiry-modal-copy">
              Fill up this short enquiry form and our team will contact you shortly for
              admission guidance.
            </p>

            <ul className="enquiry-modal-points">
              {introPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>

            <img
              src={FounderPhoto}
              alt="Admission guidance at Subho's Computer Institute"
              className="enquiry-modal-image"
            />
          </div>
        </div>

        <div className="enquiry-modal-form-panel">
          {submitState.type === 'success' ? (
            <div className="enquiry-modal-success" role="status" aria-live="polite">
              <p className="enquiry-modal-success-badge">Enquiry Received</p>
              <h3>Thank you!</h3>
              <p>{submitState.message}</p>
            </div>
          ) : (
            <>
              <div className="enquiry-modal-form-copy">
                <h3>Admission Enquiry Form</h3>
                <p>
                  Fill up this short enquiry form and our team will contact you shortly for
                  admission guidance.
                </p>
              </div>

              <form className="enquiry-form" onSubmit={handleSubmit} noValidate>
                <div className="enquiry-form-grid">
                  <label className="enquiry-field">
                    <span>Student Name</span>
                    <input
                      type="text"
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleChange}
                      placeholder="Enter student name"
                      aria-invalid={Boolean(errors.studentName)}
                    />
                    {errors.studentName ? <small>{errors.studentName}</small> : null}
                  </label>

                  <label className="enquiry-field">
                    <span>Guardian Name</span>
                    <input
                      type="text"
                      name="guardianName"
                      value={formData.guardianName}
                      onChange={handleChange}
                      placeholder="Enter guardian name"
                    />
                  </label>

                  <label className="enquiry-field">
                    <span>Mobile Number</span>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="Enter 10-digit mobile number"
                      inputMode="numeric"
                      maxLength={10}
                      aria-invalid={Boolean(errors.mobile)}
                    />
                    {errors.mobile ? <small>{errors.mobile}</small> : null}
                  </label>

                  <label className="enquiry-field">
                    <span>Email</span>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email address"
                      aria-invalid={Boolean(errors.email)}
                    />
                    {errors.email ? <small>{errors.email}</small> : null}
                  </label>

                  <label className="enquiry-field enquiry-field-full">
                    <span>Class / Course Interested In</span>
                    <select
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.course)}
                    >
                      <option value="">Select a course</option>
                      {ENQUIRY_COURSE_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors.course ? <small>{errors.course}</small> : null}
                  </label>

                  <label className="enquiry-field enquiry-field-full">
                    <span>Address</span>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter address"
                    />
                  </label>

                  <label className="enquiry-field enquiry-field-full">
                    <span>Message</span>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Add any class preference or question"
                    />
                  </label>
                </div>

                {submitState.type === 'error' ? (
                  <p className="enquiry-form-status enquiry-form-status-error" role="alert">
                    {submitState.message}
                  </p>
                ) : null}

                <button type="submit" className="enquiry-submit-button" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnquiryModal;
