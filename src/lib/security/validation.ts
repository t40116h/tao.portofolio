/**
 * Input validation and sanitization utilities
 * Provides common validation functions for API endpoints
 */

import { NextRequest } from 'next/server';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
}

export interface SanitizedContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
}

export interface ValidationResult<T = unknown> {
  isValid: boolean;
  errors: string[];
  data?: T;
}

export class InputValidator {
  /**
   * Validate email format (ReDoS-safe)
   */
  static validateEmail(email: string): boolean {
    // Simple and safe email validation to prevent ReDoS
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email) && email.length <= 254;
  }

  /**
   * Validate phone number format
   */
  static validatePhone(phone: string): boolean {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
  }

  /**
   * Sanitize string input
   */
  static sanitizeString(input: string, maxLength: number = 1000): string {
    return input
      .trim()
      .slice(0, maxLength)
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+=/gi, ''); // Remove event handlers
  }

  /**
   * Validate and sanitize contact form data
   */
  static validateContactForm(data: unknown): ValidationResult<SanitizedContactFormData> {
    const errors: string[] = [];
    const sanitized: Partial<SanitizedContactFormData> = {};

    // Type guard to ensure data is an object
    if (!data || typeof data !== 'object') {
      return {
        isValid: false,
        errors: ['Invalid data format'],
      };
    }

    const formData = data as Record<string, unknown>;

    // Name validation
    if (!formData.name || typeof formData.name !== 'string') {
      errors.push('Name is required');
    } else {
      const name = this.sanitizeString(formData.name, 100);
      if (name.length < 2) {
        errors.push('Name must be at least 2 characters long');
      } else {
        sanitized.name = name;
      }
    }

    // Email validation
    if (!formData.email || typeof formData.email !== 'string') {
      errors.push('Email is required');
    } else {
      const email = this.sanitizeString(formData.email, 254);
      if (!this.validateEmail(email)) {
        errors.push('Invalid email format');
      } else {
        sanitized.email = email.toLowerCase();
      }
    }

    // Subject validation
    if (!formData.subject || typeof formData.subject !== 'string') {
      errors.push('Subject is required');
    } else {
      const subject = this.sanitizeString(formData.subject, 200);
      if (subject.length < 3) {
        errors.push('Subject must be at least 3 characters long');
      } else {
        sanitized.subject = subject;
      }
    }

    // Message validation
    if (!formData.message || typeof formData.message !== 'string') {
      errors.push('Message is required');
    } else {
      const message = this.sanitizeString(formData.message, 5000);
      if (message.length < 10) {
        errors.push('Message must be at least 10 characters long');
      } else {
        sanitized.message = message;
      }
    }

    // Phone validation (optional)
    if (formData.phone && typeof formData.phone === 'string') {
      const phone = this.sanitizeString(formData.phone, 20);
      if (phone && !this.validatePhone(phone)) {
        errors.push('Invalid phone number format');
      } else if (phone) {
        sanitized.phone = phone;
      }
    }

    // Check if all required fields are present
    const hasAllRequired = Boolean(sanitized.name && sanitized.email && sanitized.subject && sanitized.message);

    return {
      isValid: errors.length === 0 && hasAllRequired,
      errors,
      data: (errors.length === 0 && hasAllRequired) ? sanitized as SanitizedContactFormData : undefined,
    };
  }

  /**
   * Validate request origin
   */
  static validateOrigin(request: NextRequest, allowedOrigins: string[]): boolean {
    const origin = request.headers.get('origin');
    if (!origin) return false;

    return allowedOrigins.includes(origin);
  }

  /**
   * Validate Content-Type header
   */
  static validateContentType(request: NextRequest, expectedType: string = 'application/json'): boolean {
    const contentType = request.headers.get('content-type');
    return contentType?.includes(expectedType) || false;
  }

  /**
   * Check for suspicious patterns in input
   */
  static detectSuspiciousInput(input: string): boolean {
    const suspiciousPatterns = [
      /<script/i,
      /javascript:/i,
      /on\w+\s*=/i,
      /eval\s*\(/i,
      /expression\s*\(/i,
      /vbscript:/i,
      /data:text\/html/i,
      /<iframe/i,
      /<object/i,
      /<embed/i,
    ];

    return suspiciousPatterns.some(pattern => pattern.test(input));
  }

  /**
   * Comprehensive input validation for API endpoints
   */
  static validateApiInput(request: NextRequest, allowedOrigins: string[]): ValidationResult {
    const errors: string[] = [];

    // Check Content-Type
    if (!this.validateContentType(request)) {
      errors.push('Invalid Content-Type. Expected application/json');
    }

    // Check Origin
    if (!this.validateOrigin(request, allowedOrigins)) {
      errors.push('Invalid origin');
    }

    // Check for suspicious User-Agent
    const userAgent = request.headers.get('user-agent');
    if (!userAgent || userAgent.length < 10) {
      errors.push('Invalid User-Agent');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}

export default InputValidator;
