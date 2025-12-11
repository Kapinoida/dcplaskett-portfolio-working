#!/usr/bin/env node

/**
 * Generate a secure random secret for KEYSTATIC_SECRET
 *
 * Keystatic requires a secret for signing session cookies in GitHub mode.
 * This script generates a cryptographically secure random string.
 *
 * Usage: node scripts/generate-keystatic-secret.js
 */

const crypto = require('crypto');

// Generate a 32-byte (256-bit) random secret and encode it as base64
// This provides a good balance of security and URL-safety
const secret = crypto.randomBytes(32).toString('base64');

console.log('=== Keystatic Secret Generator ===\n');
console.log('Generated KEYSTATIC_SECRET:');
console.log(secret);
console.log('\n=== How to use ===\n');
console.log('1. Copy the secret above');
console.log('2. Add it to Vercel:');
console.log('   - Go to: Vercel Dashboard → Your Project → Settings → Environment Variables');
console.log('   - Name: KEYSTATIC_SECRET');
console.log('   - Value: (paste the secret above)');
console.log('   - Environments: Production, Preview, Development\n');
console.log('3. For local development, add to .env.local:');
console.log(`   KEYSTATIC_SECRET=${secret}\n`);
console.log('4. IMPORTANT: Redeploy your application for changes to take effect\n');
console.log('=== Security Notes ===\n');
console.log('- Keep this secret secure - do not commit it to version control');
console.log('- Do not share it publicly');
console.log('- If compromised, generate a new one (all users will need to re-authenticate)\n');
