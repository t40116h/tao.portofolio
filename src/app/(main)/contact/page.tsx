'use client';

import { useState } from 'react';
import styles from './contact.module.scss';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
}

interface FormState {
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    phone: '',
  });

  const [formState, setFormState] = useState<FormState>({
    isSubmitting: false,
    isSuccess: false,
    error: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState({ isSubmitting: true, isSuccess: false, error: null });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setFormState({ isSubmitting: false, isSuccess: true, error: null });
        setFormData({ name: '', email: '', subject: '', message: '', phone: '' });
      } else {
        setFormState({
          isSubmitting: false,
          isSuccess: false,
          error: result.error || 'Something went wrong. Please try again.'
        });
      }
    } catch (error) {
      setFormState({
        isSubmitting: false,
        isSuccess: false,
        error: 'Network error. Please check your connection and try again.'
      });
    }
  };

  return (
    <section className={styles.contactSection}>
      <div className={styles.contactContent}>
        <h1 className={styles.contactTitle}>Contact</h1>

        {formState.isSuccess && (
          <div className={styles.successMessage}>
            <p>Thank you for your message! I'll get back to you within 24 hours.</p>
          </div>
        )}

        {formState.error && (
          <div className={styles.errorMessage}>
            <p>{formState.error}</p>
          </div>
        )}

        <form className={styles.contactForm} onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className={styles.formInput}
            value={formData.name}
            onChange={handleInputChange}
            required
            disabled={formState.isSubmitting}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className={styles.formInput}
            value={formData.email}
            onChange={handleInputChange}
            required
            disabled={formState.isSubmitting}
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            className={styles.formInput}
            value={formData.subject}
            onChange={handleInputChange}
            required
            disabled={formState.isSubmitting}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone (optional)"
            className={styles.formInput}
            value={formData.phone}
            onChange={handleInputChange}
            disabled={formState.isSubmitting}
          />

          <textarea
            name="message"
            placeholder="Message"
            className={styles.formTextarea}
            rows={4}
            value={formData.message}
            onChange={handleInputChange}
            required
            disabled={formState.isSubmitting}
          />

          <div className={styles.formActions}>
            <button
              type="submit"
              className={styles.formButton}
              disabled={formState.isSubmitting}
            >
              {formState.isSubmitting ? 'Sending...' : 'Send'}
            </button>

            <a href="/social" className={styles.socialButton}>
              Social
            </a>
          </div>
        </form>

        <div className={styles.contactNote}>
          <p>I usually respond within 24 hours.</p>
        </div>
      </div>
    </section>
  );
}
