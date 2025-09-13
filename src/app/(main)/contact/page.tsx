'use client';

import {
  CONTACT_FORM_CONFIG,
  CONTACT_INFO,
  ContactFormData
} from '@/constants/contact';
import { useState } from 'react';
import styles from './contact.module.scss';

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    phone: '',
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
    // TODO: Implement form submission
  };

  return (
    <div className="container">
      <section className={styles.contactSection}>
        <div className={styles.contactContent}>
          <h1 className={styles.contactTitle}>{CONTACT_INFO.title}</h1>

        <form className={styles.contactForm} onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder={CONTACT_FORM_CONFIG.fields.name.placeholder}
            className={styles.formInput}
            value={formData.name}
            onChange={handleInputChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder={CONTACT_FORM_CONFIG.fields.email.placeholder}
            className={styles.formInput}
            value={formData.email}
            onChange={handleInputChange}
            required
          />

          <input
            type="text"
            name="subject"
            placeholder={CONTACT_FORM_CONFIG.fields.subject.placeholder}
            className={styles.formInput}
            value={formData.subject}
            onChange={handleInputChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder={CONTACT_FORM_CONFIG.fields.phone.placeholder}
            className={styles.formInput}
            value={formData.phone}
            onChange={handleInputChange}
          />

          <textarea
            name="message"
            placeholder={CONTACT_FORM_CONFIG.fields.message.placeholder}
            className={styles.formTextarea}
            rows={4}
            value={formData.message}
            onChange={handleInputChange}
            required
          />

          <div className={styles.formActions}>
            <button
              type="submit"
              className={styles.formButton}
            >
              {CONTACT_INFO.callToAction.primary}
            </button>

            <a href="/social" className={styles.socialButton}>
              {CONTACT_INFO.callToAction.secondary}
            </a>
          </div>
        </form>

        <div className={styles.contactNote}>
          <p>{CONTACT_INFO.availability.responseTime}</p>
        </div>
      </div>
    </section>
    </div>
  );
}
