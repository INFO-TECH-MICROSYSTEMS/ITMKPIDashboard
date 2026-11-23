/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

/**
 * Enterprise Cryptographic Utility Service
 * Uses native Web Crypto API (crypto.subtle) for secure per-user salt generation
 * and PBKDF2 password hashing with 100,000 iterations of SHA-256.
 * Zero plaintext password storage in database or memory.
 */

export class CryptoService {
  /**
   * Generates a cryptographically strong random salt (16 bytes hex).
   */
  static generateSalt(): string {
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);
    return Array.from(array, b => b.toString(16).padStart(2, '0')).join('');
  }

  /**
   * Hashes a password string with a specific salt using PBKDF2-SHA256.
   */
  static async hashPassword(password: string, salt: string): Promise<string> {
    const enc = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
      'raw',
      enc.encode(password),
      { name: 'PBKDF2' },
      false,
      ['deriveBits', 'deriveKey']
    );

    const derivedKey = await window.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: enc.encode(salt),
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      true,
      ['encrypt', 'decrypt']
    );

    const rawKey = await window.crypto.subtle.exportKey('raw', derivedKey);
    return Array.from(new Uint8Array(rawKey), b => b.toString(16).padStart(2, '0')).join('');
  }

  /**
   * Validates a password attempt against stored hash and salt.
   */
  static async verifyPassword(attempt: string, storedHash: string, salt: string): Promise<boolean> {
    const calculated = await this.hashPassword(attempt, salt);
    return calculated === storedHash;
  }
}
