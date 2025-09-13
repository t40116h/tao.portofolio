/**
 * Input validation and sanitization utilities
 * Provides common validation functions for API endpoints
 */

import { NextRequest } from 'next/server';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  data?: any;
}

export class InputValidator {
  /**
   * Validate email format
   */
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
  static validateContactForm(data: any): ValidationResult {
    const errors: string[] = [];
    const sanitized: any = {};

    // Name validation
    if (!data.name || typeof data.name !== 'string') {
      errors.push('Name is required');
    } else {
      const name = this.sanitizeString(data.name, 100);
      if (name.length < 2) {
        errors.push('Name must be at least 2 characters long');
      } else {
        sanitized.name = name;
      }
    }

    // Email validation
    if (!data.email || typeof data.email !== 'string') {
      errors.push('Email is required');
    } else {
      const email = this.sanitizeString(data.email, 254);
      if (!this.validateEmail(email)) {
        errors.push('Invalid email format');
      } else {
        sanitized.email = email.toLowerCase();
      }
    }

    // Subject validation
    if (!data.subject || typeof data.subject !== 'string') {
      errors.push('Subject is required');
    } else {
      const subject = this.sanitizeString(data.subject, 200);
      if (subject.length < 3) {
        errors.push('Subject must be at least 3 characters long');
      } else {
        sanitized.subject = subject;
      }
    }

    // Message validation
    if (!data.message || typeof data.message !== 'string') {
      errors.push('Message is required');
    } else {
      const message = this.sanitizeString(data.message, 5000);
      if (message.length < 10) {
        errors.push('Message must be at least 10 characters long');
      } else {
        sanitized.message = message;
      }
    }

    // Phone validation (optional)
    if (data.phone && typeof data.phone === 'string') {
      const phone = this.sanitizeString(data.phone, 20);
      if (phone && !this.validatePhone(phone)) {
        errors.push('Invalid phone number format');
      } else if (phone) {
        sanitized.phone = phone;
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      data: errors.length === 0 ? sanitized : undefined,
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
