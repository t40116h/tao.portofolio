/**
 * Cryptographic utilities for security
 * Provides secure random generation and hashing functions
 */

import { createHash, createHmac, randomBytes } from 'crypto';

export class CryptoUtils {
  /**
   * Generate a cryptographically secure random string
   */
  static generateSecureToken(length: number = 32): string {
    return randomBytes(length).toString('hex');
  }

  /**
   * Generate a secure random number
   */
  static generateSecureRandom(): number {
    return randomBytes(4).readUInt32BE(0);
  }

  /**
   * Create a SHA-256 hash of the input
   */
  static sha256(input: string): string {
    return createHash('sha256').update(input).digest('hex');
  }

  /**
   * Create an HMAC-SHA256 signature
   */
  static hmacSha256(data: string, secret: string): string {
    return createHmac('sha256', secret).update(data).digest('hex');
  }

  /**
   * Generate a secure session ID
   */
  static generateSessionId(): string {
    return this.generateSecureToken(16);
  }

  /**
   * Generate a secure CSRF token
   */
  static generateCSRFToken(): string {
    return this.generateSecureToken(24);
  }

  /**
   * Verify HMAC signature
   */
  static verifySignature(data: string, signature: string, secret: string): boolean {
    const expectedSignature = this.hmacSha256(data, secret);
    return this.constantTimeCompare(signature, expectedSignature);
  }

  /**
   * Constant time string comparison to prevent timing attacks
   */
  static constantTimeCompare(a: string, b: string): boolean {
    if (a.length !== b.length) {
      return false;
    }

    let result = 0;
    for (let i = 0; i < a.length; i++) {
      result |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }

    return result === 0;
  }

  /**
   * Generate a secure password hash (for future use)
   */
  static async hashPassword(password: string, salt?: string): Promise<{ hash: string; salt: string }> {
    const actualSalt = salt || this.generateSecureToken(16);
    const hash = this.sha256(password + actualSalt);
    return { hash, salt: actualSalt };
  }

  /**
   * Verify a password against its hash
   */
  static async verifyPassword(password: string, hash: string, salt: string): Promise<boolean> {
    const { hash: computedHash } = await this.hashPassword(password, salt);
    return this.constantTimeCompare(hash, computedHash);
  }
}

export default CryptoUtils;
