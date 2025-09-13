/**
 * Contact API route
 * Handles contact form submissions with security measures
 */

import { getAllowedOrigins } from '@/lib/security/env';
import { withCORS, withSecurity } from '@/lib/security/middleware';
import { withRateLimit } from '@/lib/security/rate-limit';
import { InputValidator } from '@/lib/security/validation';
import { NextRequest, NextResponse } from 'next/server';

async function handleContactSubmission(request: NextRequest): Promise<NextResponse> {
  try {
    // Validate request
    const validation = InputValidator.validateApiInput(request, getAllowedOrigins);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: 'Invalid request', details: validation.errors },
        { status: 400 }
      );
    }

    // Parse request body
    const body = await request.json();

    // Validate contact form data
    const contactValidation = InputValidator.validateContactForm(body);
    if (!contactValidation.isValid) {
      return NextResponse.json(
        { error: 'Validation failed', details: contactValidation.errors },
        { status: 400 }
      );
    }

    const { name, email, subject, message, phone } = contactValidation.data;

    // Check for suspicious content
    const suspiciousContent = [name, email, subject, message, phone].some(
      field => field && InputValidator.detectSuspiciousInput(field)
    );

    if (suspiciousContent) {
      return NextResponse.json(
        { error: 'Suspicious content detected' },
        { status: 400 }
      );
    }

    // Log the submission (in production, you might want to store this in a database)
    console.log('Contact form submission:', {
      name,
      email,
      subject,
      message: message.substring(0, 100) + '...', // Log only first 100 chars
      phone: phone || 'Not provided',
      timestamp: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
    });

    // In a real application, you would:
    // 1. Send an email notification
    // 2. Store the submission in a database
    // 3. Send an auto-reply to the user

    // For now, we'll just return a success response
    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your message. I will get back to you within 24 hours.',
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Apply security middleware
export const POST = withRateLimit(withCORS(withSecurity(handleContactSubmission)));

// Handle preflight requests
export const OPTIONS = () => {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
};
