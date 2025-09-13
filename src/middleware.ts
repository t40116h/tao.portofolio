/**
 * Next.js middleware for global security
 * Runs on every request to apply security measures
 */

import { getAllowedOrigins } from '@/lib/security/env';
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const origin = request.headers.get('origin');
  const allowedOrigins = getAllowedOrigins;

  // Add security headers to all responses
  response.headers.set('X-DNS-Prefetch-Control', 'off');
  response.headers.set('X-Download-Options', 'noopen');
  response.headers.set('X-Permitted-Cross-Domain-Policies', 'none');

  // CORS headers for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    if (origin && allowedOrigins.includes(origin)) {
      response.headers.set('Access-Control-Allow-Origin', origin);
    }

    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    response.headers.set('Access-Control-Max-Age', '86400');
  }

  // Block requests with suspicious patterns
  const userAgent = request.headers.get('user-agent') || '';
  const suspiciousPatterns = [
    /bot/i,
    /crawler/i,
    /spider/i,
    /scraper/i,
  ];

  // Allow legitimate bots but log suspicious ones
  if (suspiciousPatterns.some(pattern => pattern.test(userAgent))) {
    console.log('Suspicious user agent detected:', {
      userAgent,
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      url: request.url,
      timestamp: new Date().toISOString(),
    });
  }

  // Block requests to sensitive files
  const sensitivePaths = [
    '/.env',
    '/.env.local',
    '/.env.production',
    '/package.json',
    '/package-lock.json',
    '/pnpm-lock.yaml',
    '/yarn.lock',
    '/.git',
    '/.gitignore',
    '/README.md',
    '/security.md',
  ];

  if (sensitivePaths.some(path => request.nextUrl.pathname.startsWith(path))) {
    return new NextResponse('Not Found', { status: 404 });
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};
