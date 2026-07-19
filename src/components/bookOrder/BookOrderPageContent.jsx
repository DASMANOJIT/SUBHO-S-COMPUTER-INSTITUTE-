import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import BookAnimation from './BookAnimation.jsx';
import BookOrderSuccess from './BookOrderSuccess.jsx';
import { BOOK_ORDER_CONFIG } from '../../config/bookOrderConfig.js';
import './bookOrder.css';

const createEmptyBookOrderForm = () => ({
  studentName: '',
  studentClass: '',
  isSubhosStudent: '',
  email: '',
  whatsappNumber: '',
  paymentMethod: '',
  utrNumber: '',
  consentConfirmed: false,
});

const BOOK_ORDER_CONTACT_NUMBER_DISPLAY = '824 039 6568';
const BOOK_ORDER_CONTACT_NUMBER_TEL = '8240396568';
const BOOK_ORDER_PRICE = BOOK_ORDER_CONFIG.bookPrice;
const BOOK_ORDER_UPI_ID = BOOK_ORDER_CONFIG.upiId;
const BOOK_ORDER_UPI_PHONE = BOOK_ORDER_CONFIG.upiPhone;
const BOOK_ORDER_PAYMENT_METHOD_QR = 'UPI QR Code';
const BOOK_ORDER_PAYMENT_METHOD_UPI = 'UPI ID / Phone Number';

const STUDENT_CLASS_OPTIONS = [
  'Class 3',
  'Class 4',
  'Class 5',
  'Class 6',
  'Class 7',
  'Class 8',
  'Class 9',
  'Class 10',
  'Class 11',
  'Class 12',
  'Other / Computer Course',
];

const PAYMENT_METHOD_OPTIONS = [BOOK_ORDER_PAYMENT_METHOD_QR, BOOK_ORDER_PAYMENT_METHOD_UPI];

const normalizeText = (value = '') => String(value).replace(/\s+/g, ' ').trim();

const formatPhoneDisplay = (value = '') => {
  const digits = String(value).replace(/\D/g, '');

  if (digits.length === 10) {
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
  }

  return normalizeText(value);
};

const orderPoints = [
  'Fill in the student’s correct information.',
  'Scan the displayed QR code and complete the payment.',
  'Enter the correct UTR or transaction reference number.',
  'Orders with incorrect payment information may require manual verification.',
  'Keep the generated order ID for future communication.',
];

const normalizeWhatsAppNumber = (value = '') => {
  const digits = value.replace(/\D/g, '');

  if (digits.length === 10) {
    return digits;
  }

  if (digits.length === 12 && digits.startsWith('91')) {
    return digits.slice(2);
  }

  if (digits.length === 11 && digits.startsWith('0')) {
    return digits.slice(1);
  }

  return digits;
};

const isValidEmailAddress = (value = '') => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

const isValidIndianWhatsAppNumber = (value = '') => /^[6-9]\d{9}$/.test(normalizeWhatsAppNumber(value));

const isValidTransactionReference = (value = '') => {
  const reference = value.trim();

  return (
    reference.length >= 8 &&
    reference.length <= 22 &&
    /^[A-Za-z0-9]+$/.test(reference)
  );
};

const isValidStudentClass = (value = '') => STUDENT_CLASS_OPTIONS.includes(value);

const validateForm = (formData, { upiDetailsAvailable = true } = {}) => {
  const errors = {};

  if (!formData.studentName.trim()) {
    errors.studentName = 'Student name is required.';
  } else if (formData.studentName.trim().length < 2) {
    errors.studentName = 'Student name must be at least 2 characters long.';
  }

  if (!formData.studentClass.trim()) {
    errors.studentClass = 'Student class is required.';
  } else if (formData.studentClass.trim().length > 50) {
    errors.studentClass = 'Student class must be 50 characters or fewer.';
  } else if (!isValidStudentClass(formData.studentClass.trim())) {
    errors.studentClass = 'Select a valid student class.';
  }

  if (formData.isSubhosStudent !== 'Yes' && formData.isSubhosStudent !== 'No') {
    errors.isSubhosStudent = 'Please select Yes or No.';
  }

  if (!formData.email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!isValidEmailAddress(formData.email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!formData.whatsappNumber.trim()) {
    errors.whatsappNumber = 'WhatsApp number is required.';
  } else if (!isValidIndianWhatsAppNumber(formData.whatsappNumber)) {
    errors.whatsappNumber = 'Enter a valid 10-digit Indian WhatsApp number.';
  }

  if (!formData.paymentMethod) {
    errors.paymentMethod = 'Please select a payment method.';
  } else if (!PAYMENT_METHOD_OPTIONS.includes(formData.paymentMethod)) {
    errors.paymentMethod = 'Please select a valid payment method.';
  } else if (formData.paymentMethod === BOOK_ORDER_PAYMENT_METHOD_UPI && !upiDetailsAvailable) {
    errors.paymentMethod =
      'UPI ID and phone payment details are currently unavailable. Please select QR payment.';
  }

  const utr = formData.utrNumber.trim();
  if (!utr) {
    errors.utrNumber = 'UTR / transaction reference number is required.';
  } else if (utr.length < 8 || utr.length > 22) {
    errors.utrNumber = 'UTR / transaction reference number must be 8 to 22 characters long.';
  } else if (!/^[A-Za-z0-9]+$/.test(utr)) {
    errors.utrNumber = 'Use only letters and numbers in the transaction reference number.';
  }

  if (!formData.consentConfirmed) {
    errors.consentConfirmed = 'Please confirm that the payment information is correct.';
  }

  return errors;
};

const submitBookOrder = async (formData, signal) => {
  const appsScriptUrl = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_WEB_APP_URL?.trim();

  if (!appsScriptUrl) {
    return {
      success: false,
      status: 503,
      message: 'Book ordering is temporarily unavailable. Please contact the institute.',
      errors: {},
    };
  }

  const requestBody = new URLSearchParams({
    studentName: formData.studentName,
    studentClass: formData.studentClass,
    isSubhosStudent: formData.isSubhosStudent,
    email: formData.email,
    whatsappNumber: formData.whatsappNumber,
    bookPrice: formData.bookPrice,
    paymentMethod: formData.paymentMethod,
    utrNumber: formData.utrNumber,
    consentConfirmed: 'true',
  });

  let response;

  try {
    response = await fetch(appsScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: requestBody.toString(),
      redirect: 'follow',
      signal,
    });
  } catch (error) {
    const networkError = new Error(
      'Unable to connect to the order service. Please check your connection and try again.'
    );
    networkError.name = error?.name || 'NetworkError';
    throw networkError;
  }

  const contentType = response.headers.get('content-type') || '';
  const responseText = await response.text();
  let responseBody = null;

  if (
    contentType.includes('application/json') ||
    contentType.includes('text/json') ||
    responseText.trim().startsWith('{') ||
    responseText.trim().startsWith('[')
  ) {
    try {
      responseBody = responseText ? JSON.parse(responseText) : null;
    } catch {
      responseBody = null;
    }
  }

  if (!response.ok) {
    const fallbackMessages = {
      404: 'Book-order service was not found. Please run the complete development server.',
      400: 'Please check the highlighted information and try again.',
      502: 'We could not submit your order right now. Please try again shortly.',
      503: 'Book ordering is temporarily unavailable. Please contact the institute.',
    };

    return {
      success: false,
      status: response.status,
      message:
        (responseBody && typeof responseBody.message === 'string' && responseBody.message.trim()) ||
        fallbackMessages[response.status] ||
        'We could not submit your order right now. Please try again shortly.',
      errors:
        responseBody && typeof responseBody === 'object' && !Array.isArray(responseBody)
          ? responseBody.errors || {}
          : {},
    };
  }

  if (!responseBody || typeof responseBody !== 'object' || Array.isArray(responseBody)) {
    return {
      success: false,
      status: response.status,
      message: 'The order service returned an unexpected response. Please try again.',
      errors: {},
    };
  }

  const orderId =
    typeof responseBody.orderId === 'string' ? responseBody.orderId.trim() : '';
  const sheetSaved = responseBody.sheetSaved === true;
  const success = responseBody.success === true && Boolean(orderId) && sheetSaved;

  if (!success) {
    return {
      success: false,
      status: response.status,
      message:
        (typeof responseBody.message === 'string' && responseBody.message.trim()) ||
        'We could not submit your order right now. Please try again shortly.',
      errors: responseBody.errors || {},
    };
  }

  return {
    ...responseBody,
    orderId,
    sheetSaved: true,
  };
};

const BookOrderPageContent = () => {
  const studentNameRef = useRef(null);
  const studentClassRef = useRef(null);
  const studentAtInstituteYesRef = useRef(null);
  const emailRef = useRef(null);
  const whatsappRef = useRef(null);
  const paymentMethodQrRef = useRef(null);
  const utrRef = useRef(null);
  const consentRef = useRef(null);
  const copyResetTimerRef = useRef(null);
  const fieldRefs = useMemo(
    () => ({
      studentName: studentNameRef,
      studentClass: studentClassRef,
      isSubhosStudent: studentAtInstituteYesRef,
      email: emailRef,
      whatsappNumber: whatsappRef,
      paymentMethod: paymentMethodQrRef,
      utrNumber: utrRef,
      consentConfirmed: consentRef,
    }),
    []
  );

  const [formData, setFormData] = useState(createEmptyBookOrderForm);
  const [errors, setErrors] = useState({});
  const [submitState, setSubmitState] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [qrFailed, setQrFailed] = useState(false);
  const [showResetPrompt, setShowResetPrompt] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [copiedField, setCopiedField] = useState('');
  const requestControllerRef = useRef(null);
  const bookPrice = normalizeText(BOOK_ORDER_PRICE);
  const isBookPriceConfigured = Boolean(bookPrice);
  const upiDetailsAvailable = Boolean(BOOK_ORDER_UPI_ID || BOOK_ORDER_UPI_PHONE);
  const formattedUpiPhone = formatPhoneDisplay(BOOK_ORDER_UPI_PHONE);
  const showBookPriceMessage = !isBookPriceConfigured;
  const canSubmit = useMemo(() => {
    const normalizedStudentName = normalizeText(formData.studentName);
    const normalizedStudentClass = normalizeText(formData.studentClass);
    const normalizedEmail = normalizeText(formData.email);
    const normalizedWhatsApp = normalizeWhatsAppNumber(formData.whatsappNumber);
    const normalizedUtr = normalizeText(formData.utrNumber);
    const isBasicFormValid =
      normalizedStudentName.length >= 2 &&
      isValidStudentClass(normalizedStudentClass) &&
      (formData.isSubhosStudent === 'Yes' || formData.isSubhosStudent === 'No') &&
      isValidEmailAddress(normalizedEmail) &&
      isValidIndianWhatsAppNumber(normalizedWhatsApp) &&
      PAYMENT_METHOD_OPTIONS.includes(formData.paymentMethod) &&
      isValidTransactionReference(normalizedUtr) &&
      formData.consentConfirmed === true;

    const isSelectedPaymentMethodAvailable =
      formData.paymentMethod === BOOK_ORDER_PAYMENT_METHOD_QR ||
      (formData.paymentMethod === BOOK_ORDER_PAYMENT_METHOD_UPI && upiDetailsAvailable);

    return (
      isBasicFormValid &&
      isSelectedPaymentMethodAvailable &&
      isBookPriceConfigured &&
      !isSubmitting
    );
  }, [
    formData.studentName,
    formData.studentClass,
    formData.isSubhosStudent,
    formData.email,
    formData.whatsappNumber,
    formData.paymentMethod,
    formData.utrNumber,
    formData.consentConfirmed,
    isBookPriceConfigured,
    isSubmitting,
    upiDetailsAvailable,
  ]);

  useEffect(() => {
    return () => {
      requestControllerRef.current?.abort?.();
      if (copyResetTimerRef.current) {
        clearTimeout(copyResetTimerRef.current);
      }
    };
  }, []);

  const resetForm = useCallback(() => {
    setFormData(createEmptyBookOrderForm());
    setErrors({});
    setSubmitState({ type: '', message: '' });
    setIsSubmitting(false);
    setQrFailed(false);
    setShowResetPrompt(false);
    setSuccessData(null);
    setCopiedField('');
    if (copyResetTimerRef.current) {
      clearTimeout(copyResetTimerRef.current);
      copyResetTimerRef.current = null;
    }
  }, []);

  const isFormDirty =
    formData.studentName.trim() ||
    formData.studentClass.trim() ||
    formData.isSubhosStudent ||
    formData.email.trim() ||
    formData.whatsappNumber.trim() ||
    formData.paymentMethod ||
    formData.utrNumber.trim() ||
    formData.consentConfirmed;

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: '',
    }));

    setSubmitState({ type: '', message: '' });
    setShowResetPrompt(false);
  };

  const handleCopyToClipboard = async (value, field) => {
    if (!value || typeof navigator === 'undefined' || !navigator.clipboard?.writeText) {
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);

      if (copyResetTimerRef.current) {
        clearTimeout(copyResetTimerRef.current);
      }

      copyResetTimerRef.current = window.setTimeout(() => {
        setCopiedField('');
      }, 1500);
    } catch {
      setCopiedField('');
    }
  };

  const focusFirstErrorField = (nextErrors) => {
    const firstErrorField = Object.keys(nextErrors)[0];
    const targetRef = fieldRefs[firstErrorField];
    targetRef?.current?.focus?.();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting || requestControllerRef.current) {
      return;
    }

    const normalizedFormData = {
      studentName: formData.studentName.trim(),
      studentClass: formData.studentClass.trim(),
      isSubhosStudent: formData.isSubhosStudent,
      email: formData.email.trim(),
      whatsappNumber: normalizeWhatsAppNumber(formData.whatsappNumber),
      bookPrice,
      paymentMethod: formData.paymentMethod,
      utrNumber: formData.utrNumber.trim(),
      consentConfirmed: formData.consentConfirmed,
    };

    if (!isBookPriceConfigured) {
      setSubmitState({
        type: 'error',
        message: 'The book price has not been configured yet.',
      });
      return;
    }

    const nextErrors = validateForm(normalizedFormData, {
      upiDetailsAvailable,
    });
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      focusFirstErrorField(nextErrors);
      setSubmitState({
        type: 'error',
        message: 'Please check the highlighted information and try again.',
      });
      return;
    }

    const controller = new AbortController();
    requestControllerRef.current = controller;
    setIsSubmitting(true);

    try {
      const response = await submitBookOrder(normalizedFormData, controller.signal);
      if (response?.success && response?.orderId) {
        setSuccessData({
          orderId: response.orderId,
          studentName: normalizedFormData.studentName,
          contactNumber: response.contactNumber || BOOK_ORDER_CONTACT_NUMBER_DISPLAY,
        });
        setSubmitState({ type: '', message: '' });
        return;
      }

      if (response?.errors && Object.keys(response.errors).length > 0) {
        setErrors(response.errors);
        focusFirstErrorField(response.errors);
        setSubmitState({
          type: 'error',
          message: response?.message || 'Please check the highlighted information and try again.',
        });
        return;
      }

      setSubmitState({
        type: 'error',
        message:
          response?.message || 'We could not submit your order right now. Please try again shortly.',
      });
    } catch (error) {
      setSubmitState({
        type: 'error',
        message:
          error?.message ||
          'Unable to connect to the order service. Please check your connection and try again.',
      });
    } finally {
      if (requestControllerRef.current === controller) {
        requestControllerRef.current = null;
      }
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    if (isFormDirty) {
      setShowResetPrompt(true);
      return;
    }

    resetForm();
  };

  const confirmReset = () => {
    resetForm();
    studentNameRef.current?.focus?.();
  };

  const cancelReset = () => {
    setShowResetPrompt(false);
  };

  const qrImageSrc = '/animations/book-payment-qr.png';

  return (
    <section className="book-order-page-content">
      <div className="book-order-page-story smooth-card">
        <p className="page-eyebrow">BOOK ORDER</p>
        <h2>How to order your book</h2>
        <p className="book-order-page-intro">
          Complete the form below to order your book. Scan the QR code to make the payment and
          provide the correct UTR or transaction reference number.
        </p>

        <div className="book-order-page-animation-shell" aria-hidden="true">
          <BookAnimation className="book-order-page-animation" />
        </div>

        <div className="book-order-guidance">
          <h3>Order information</h3>
          <ol className="book-order-steps">
            {orderPoints.map((point, index) => (
              <li key={point}>
                <span className="book-order-step-index">{String(index + 1).padStart(2, '0')}</span>
                <span>{point}</span>
              </li>
            ))}
          </ol>
          <p className="book-order-contact-line">
            For further information, contact:{' '}
            <a href={`tel:${BOOK_ORDER_CONTACT_NUMBER_TEL}`}>{BOOK_ORDER_CONTACT_NUMBER_DISPLAY}</a>
          </p>
        </div>
      </div>

      <div className="book-order-page-form-card smooth-card">
        <div className="book-order-page-form-copy">
          <p className="book-order-page-form-kicker">Payment Details</p>
          <h3>Book Order Form</h3>
          <p>
            Enter your details carefully. Your order and payment information will be sent for
            verification after submission.
          </p>
        </div>

        {successData ? (
          <>
            <BookOrderSuccess
              orderId={successData.orderId}
              studentName={successData.studentName}
              contactNumber={successData.contactNumber}
            />
            <div className="book-order-success-actions">
              <button type="button" className="book-order-submit-button" onClick={resetForm}>
                PLACE ANOTHER ORDER
              </button>
            </div>
          </>
        ) : (
          <form className="book-order-form" onSubmit={handleSubmit}>
            <div className="book-order-form-grid">
              <div className="book-order-price-card book-order-field--full">
                <span className="book-order-price-label">Book Price</span>
                {showBookPriceMessage ? (
                  <p className="book-order-price-message">
                    The book price has not been configured yet.
                  </p>
                ) : (
                  <strong className="book-order-price-value">{bookPrice}</strong>
                )}
                <p className="book-order-price-note">
                  For book order help, contact:{' '}
                  <a href={`tel:${BOOK_ORDER_CONTACT_NUMBER_TEL}`}>{BOOK_ORDER_CONTACT_NUMBER_DISPLAY}</a>
                </p>
              </div>

              <label className="book-order-field">
                <span>Student Name</span>
                <input
                  ref={studentNameRef}
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  placeholder="Enter the student’s full name"
                  autoComplete="name"
                  aria-invalid={Boolean(errors.studentName)}
                  aria-describedby={errors.studentName ? 'book-order-error-studentName' : undefined}
                />
                {errors.studentName ? (
                  <small id="book-order-error-studentName">{errors.studentName}</small>
                ) : null}
              </label>

              <label className="book-order-field">
                <span>Student Class</span>
                <select
                  ref={studentClassRef}
                  name="studentClass"
                  value={formData.studentClass}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.studentClass)}
                  aria-describedby={errors.studentClass ? 'book-order-error-studentClass' : undefined}
                >
                  <option value="">Select student class</option>
                  {STUDENT_CLASS_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.studentClass ? (
                  <small id="book-order-error-studentClass">{errors.studentClass}</small>
                ) : null}
              </label>

              <fieldset className="book-order-radio-fieldset book-order-field--full">
                <legend>Student at Subho’s Computer Institute?</legend>
                <div className="book-order-radio-group">
                  {['Yes', 'No'].map((option, index) => {
                    const radioRef = index === 0 ? studentAtInstituteYesRef : undefined;
                    const isSelected = formData.isSubhosStudent === option;

                    return (
                      <label
                        key={option}
                        className={`book-order-radio-card ${
                          isSelected ? 'book-order-radio-card--selected' : ''
                        }`}
                      >
                        <input
                          ref={radioRef}
                          type="radio"
                          name="isSubhosStudent"
                          value={option}
                          checked={isSelected}
                          onChange={handleChange}
                          aria-invalid={Boolean(errors.isSubhosStudent)}
                          aria-describedby={
                            errors.isSubhosStudent ? 'book-order-error-isSubhosStudent' : undefined
                          }
                        />
                        <span className="book-order-radio-title">{option}</span>
                        <span className="book-order-radio-copy">
                          {option === 'Yes'
                            ? 'I already study at Subho’s Computer Institute.'
                            : 'I am not currently enrolled at Subho’s Computer Institute.'}
                        </span>
                      </label>
                    );
                  })}
                </div>
                {errors.isSubhosStudent ? (
                  <small id="book-order-error-isSubhosStudent" className="book-order-radio-error">
                    {errors.isSubhosStudent}
                  </small>
                ) : null}
              </fieldset>

              <label className="book-order-field">
                <span>Email Address</span>
                <input
                  ref={emailRef}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'book-order-error-email' : undefined}
                />
                {errors.email ? <small id="book-order-error-email">{errors.email}</small> : null}
              </label>

              <label className="book-order-field">
                <span>WhatsApp Number</span>
                <input
                  ref={whatsappRef}
                  type="tel"
                  name="whatsappNumber"
                  value={formData.whatsappNumber}
                  onChange={handleChange}
                  placeholder="Enter your WhatsApp number"
                  inputMode="tel"
                  autoComplete="tel"
                  aria-invalid={Boolean(errors.whatsappNumber)}
                  aria-describedby={
                    errors.whatsappNumber ? 'book-order-error-whatsappNumber' : undefined
                  }
                />
                <small className="book-order-field-help">
                  You can include +91, spaces, brackets, or hyphens.
                </small>
                {errors.whatsappNumber ? (
                  <small id="book-order-error-whatsappNumber">{errors.whatsappNumber}</small>
                ) : null}
              </label>

              <div className="book-order-payment-section book-order-field--full">
                <span className="book-order-payment-section-label">Payment Method</span>
                <div className="book-order-payment-options">
                  <label
                    className={`book-order-radio-card book-order-payment-card ${
                      formData.paymentMethod === BOOK_ORDER_PAYMENT_METHOD_QR
                        ? 'book-order-radio-card--selected'
                        : ''
                    }`}
                  >
                    <input
                      ref={paymentMethodQrRef}
                      type="radio"
                      name="paymentMethod"
                      value={BOOK_ORDER_PAYMENT_METHOD_QR}
                      checked={formData.paymentMethod === BOOK_ORDER_PAYMENT_METHOD_QR}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.paymentMethod)}
                      aria-describedby={
                        errors.paymentMethod ? 'book-order-error-paymentMethod' : undefined
                      }
                    />
                    <span className="book-order-radio-title">Scan UPI QR Code</span>
                    <span className="book-order-radio-copy">
                      Use the existing QR code to pay through any UPI app.
                    </span>
                  </label>

                  <label
                    className={`book-order-radio-card book-order-payment-card ${
                      formData.paymentMethod === BOOK_ORDER_PAYMENT_METHOD_UPI
                        ? 'book-order-radio-card--selected'
                        : ''
                    } ${!upiDetailsAvailable ? 'book-order-radio-card--disabled' : ''}`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={BOOK_ORDER_PAYMENT_METHOD_UPI}
                      checked={formData.paymentMethod === BOOK_ORDER_PAYMENT_METHOD_UPI}
                      onChange={handleChange}
                      disabled={!upiDetailsAvailable}
                      aria-invalid={Boolean(errors.paymentMethod)}
                      aria-describedby={
                        errors.paymentMethod ? 'book-order-error-paymentMethod' : undefined
                      }
                    />
                    <span className="book-order-radio-title">Pay using UPI ID / Phone Number</span>
                    <span className="book-order-radio-copy">
                      {!upiDetailsAvailable
                        ? 'UPI ID and phone payment details are currently unavailable. Please use the QR code.'
                        : 'Use the displayed UPI details below to complete payment.'}
                    </span>
                  </label>
                </div>

                {formData.paymentMethod === BOOK_ORDER_PAYMENT_METHOD_QR ? (
                  <div className="book-order-qr-block">
                    <p className="book-order-qr-title">Scan to Pay</p>
                    <p className="book-order-qr-copy">
                      Scan the QR code using any UPI application. After payment, enter the UTR or
                      transaction reference number below.
                    </p>
                    <div className="book-order-qr-card">
                      {qrFailed ? (
                        <div className="book-order-qr-placeholder">
                          <span className="book-order-qr-placeholder-mark" aria-hidden="true">
                            QR
                          </span>
                          <strong>QR placeholder</strong>
                          <span>The payment QR image will appear here when added to the site.</span>
                        </div>
                      ) : (
                        <img
                          src={qrImageSrc}
                          alt="Scan the QR code to pay for the Subho's Computer Institute book order"
                          onError={() => setQrFailed(true)}
                        />
                      )}
                    </div>
                  </div>
                ) : null}

                {formData.paymentMethod === BOOK_ORDER_PAYMENT_METHOD_UPI ? (
                  <div className="book-order-upi-block">
                    <p className="book-order-qr-title">UPI details</p>
                    <p className="book-order-qr-copy">
                      Use the displayed UPI details to complete the payment in your preferred UPI
                      app.
                    </p>

                    {BOOK_ORDER_UPI_ID || BOOK_ORDER_UPI_PHONE ? (
                      <div className="book-order-upi-list">
                        {BOOK_ORDER_UPI_ID ? (
                          <div className="book-order-upi-item">
                            <div className="book-order-upi-item-head">
                              <span className="book-order-upi-label">UPI ID</span>
                              <button
                                type="button"
                                className="book-order-copy-button"
                                onClick={() => handleCopyToClipboard(BOOK_ORDER_UPI_ID, 'upiId')}
                              >
                                Copy UPI ID
                              </button>
                            </div>
                            <p className="book-order-upi-value">{BOOK_ORDER_UPI_ID}</p>
                            {copiedField === 'upiId' ? (
                              <span className="book-order-copy-status" role="status" aria-live="polite">
                                Copied
                              </span>
                            ) : null}
                          </div>
                        ) : null}

                        {BOOK_ORDER_UPI_PHONE ? (
                          <div className="book-order-upi-item">
                            <div className="book-order-upi-item-head">
                              <span className="book-order-upi-label">UPI Phone Number</span>
                              <button
                                type="button"
                                className="book-order-copy-button"
                                onClick={() =>
                                  handleCopyToClipboard(
                                    BOOK_ORDER_UPI_PHONE.replace(/\D/g, ''),
                                    'upiPhone'
                                  )
                                }
                              >
                                Copy Phone Number
                              </button>
                            </div>
                            <p className="book-order-upi-value">{formattedUpiPhone}</p>
                            {copiedField === 'upiPhone' ? (
                              <span className="book-order-copy-status" role="status" aria-live="polite">
                                Copied
                              </span>
                            ) : null}
                          </div>
                        ) : null}
                      </div>
                    ) : (
                      <p className="book-order-payment-helper">
                        UPI ID and phone payment details are currently unavailable. Please use the
                        QR code.
                      </p>
                    )}
                  </div>
                ) : null}

                {!formData.paymentMethod ? (
                  <p className="book-order-payment-helper">Choose a payment method to continue.</p>
                ) : null}

                {errors.paymentMethod ? (
                  <small id="book-order-error-paymentMethod" className="book-order-payment-error">
                    {errors.paymentMethod}
                  </small>
                ) : null}
              </div>

              <label className="book-order-field book-order-field--full">
                <span>UTR / Transaction Reference Number</span>
                <input
                  ref={utrRef}
                  type="text"
                  name="utrNumber"
                  value={formData.utrNumber}
                  onChange={handleChange}
                  placeholder="Enter UTR or transaction ID"
                  autoComplete="off"
                  aria-invalid={Boolean(errors.utrNumber)}
                  aria-describedby={errors.utrNumber ? 'book-order-error-utrNumber' : undefined}
                />
                {errors.utrNumber ? (
                  <small id="book-order-error-utrNumber">{errors.utrNumber}</small>
                ) : null}
              </label>

              <label className="book-order-consent book-order-field--full">
                <input
                  ref={consentRef}
                  type="checkbox"
                  name="consentConfirmed"
                  checked={formData.consentConfirmed}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.consentConfirmed)}
                  aria-describedby={
                    errors.consentConfirmed ? 'book-order-error-consentConfirmed' : undefined
                  }
                />
                <span>I confirm that the payment and information provided above are correct.</span>
              </label>

              {errors.consentConfirmed ? (
                <small id="book-order-error-consentConfirmed" className="book-order-consent-error">
                  {errors.consentConfirmed}
                </small>
              ) : null}
            </div>

            {submitState.message ? (
              <div
                className={`book-order-form-status ${
                  submitState.type === 'error' ? 'book-order-form-status-error' : ''
                }`}
                role="status"
                aria-live="polite"
              >
                {submitState.message}
              </div>
            ) : null}

            {showResetPrompt ? (
              <div className="book-order-reset-confirm" role="status" aria-live="polite">
                <p>Unsaved changes will be cleared. Continue?</p>
                <div className="book-order-reset-confirm-actions">
                  <button type="button" className="book-order-reset-cancel" onClick={cancelReset}>
                    Keep Editing
                  </button>
                  <button type="button" className="book-order-reset-accept" onClick={confirmReset}>
                    Reset Form
                  </button>
                </div>
              </div>
            ) : null}

            <div className="book-order-form-actions">
              <button
                type="submit"
                className="book-order-submit-button"
                disabled={!canSubmit}
              >
                {isSubmitting ? 'SUBMITTING...' : 'SUBMIT BOOK ORDER'}
              </button>
              <button type="button" className="book-order-cancel-button" onClick={handleReset}>
                Reset Form
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default BookOrderPageContent;
