/**
 * Cryptographic authentication utilities for Sarang AI administration.
 * Built using the universal Web Crypto API for seamless execution in both
 * Next.js Edge Runtime (middleware.ts) and Node.js Server Runtimes.
 */

export const ADMIN_COOKIE_NAME = 'sarang_admin_session';

export function getAdminSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD;
  return secret ? secret.trim() : '';
}

/**
 * Constant-time string equality check using SHA-256 digest XOR.
 * Both strings are hashed to fixed 32-byte buffers before comparison
 * to eliminate timing leaks and length disparity vulnerabilities.
 */
export async function timingSafeEqualString(a: string, b: string): Promise<boolean> {
  if (!a || !b) return false;
  const enc = new TextEncoder();
  const hashA = await crypto.subtle.digest('SHA-256', enc.encode(a));
  const hashB = await crypto.subtle.digest('SHA-256', enc.encode(b));
  const viewA = new Uint8Array(hashA);
  const viewB = new Uint8Array(hashB);
  let diff = 0;
  for (let i = 0; i < viewA.length; i++) {
    diff |= viewA[i] ^ viewB[i];
  }
  return diff === 0;
}

async function getHmacKey(secret: string): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

function toBase64Url(str: string): string {
  // Use btoa safely with standard URI encoding
  const b64 = btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) => 
    String.fromCharCode(parseInt(p1, 16))
  ));
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(b64url: string): string {
  let b64 = b64url.replace(/-/g, '+').replace(/_/g, '/');
  while (b64.length % 4) b64 += '=';
  const str = atob(b64);
  return decodeURIComponent(
    Array.from(str)
      .map((c) => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
      .join('')
  );
}

/**
 * Generate a cryptographically signed session token: `${base64payload}.${hmacSignature}`
 */
export async function signSession(
  payload: { email?: string; timestamp: number },
  secret: string
): Promise<string> {
  if (!secret) throw new Error('Cannot sign session without secret');
  const payloadStr = JSON.stringify(payload);
  const dataB64 = toBase64Url(payloadStr);

  const key = await getHmacKey(secret);
  const enc = new TextEncoder();
  const sigBuffer = await crypto.subtle.sign('HMAC', key, enc.encode(dataB64));
  
  const sigHex = Array.from(new Uint8Array(sigBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  return `${dataB64}.${sigHex}`;
}

/**
 * Verify a signed session token. Checks signature authenticity and 7-day TTL expiration.
 */
export async function verifySession(
  token: string,
  secret: string
): Promise<{ valid: boolean; payload?: { email?: string; timestamp: number } }> {
  try {
    if (!token || !secret) return { valid: false };
    const parts = token.split('.');
    if (parts.length !== 2) return { valid: false };

    const [dataB64, sigHex] = parts;
    const key = await getHmacKey(secret);
    const enc = new TextEncoder();

    // Reconstruct signature bytes
    const sigBytes = new Uint8Array(
      sigHex.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []
    );

    const isSigValid = await crypto.subtle.verify(
      'HMAC',
      key,
      sigBytes,
      enc.encode(dataB64)
    );

    if (!isSigValid) return { valid: false };

    const payloadStr = fromBase64Url(dataB64);
    const payload = JSON.parse(payloadStr);

    // Enforce 7-day session lifetime (604,800,000 ms)
    const MAX_AGE = 7 * 24 * 60 * 60 * 1000;
    if (!payload.timestamp || Date.now() - payload.timestamp > MAX_AGE) {
      return { valid: false };
    }

    return { valid: true, payload };
  } catch {
    return { valid: false };
  }
}
