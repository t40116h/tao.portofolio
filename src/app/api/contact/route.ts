/**
 * Contact API route
 * Handles contact form submissions with security measures
 */

import { withCORS, withSecurity } from '@/lib/security/middleware';
import { withRateLimit } from '@/lib/security/rate-limit';
import { NextRequest, NextResponse } from 'next/server';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function handleContactSubmission(_request: NextRequest): Promise<NextResponse> {
  try {
    // Temporarily disable contact form
    return NextResponse.json(
      {
        error: 'Service Temporarily Unavailable',
        message: 'The contact form is currently disabled for maintenance. Please try again later.'
      },
      { status: 503 }
    );
  } catch {
    // Error logging removed for linting compliance
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Apply security middleware
export const POST = withRateLimit(withCORS(withSecurity(handleContactSubmission)));

// OPTIONS handler removed - contact form is disabled
