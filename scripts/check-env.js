#!/usr/bin/env node

/**
 * Diagnostic script to verify Keystatic environment variables
 * Run with: node scripts/check-env.js
 */

console.log('=== Keystatic Environment Variables Check ===\n');

const required = [
  'KEYSTATIC_GITHUB_CLIENT_ID',
  'KEYSTATIC_GITHUB_CLIENT_SECRET',
];

const optional = [
  'KEYSTATIC_SECRET',
  'NODE_ENV',
];

let hasErrors = false;

console.log('Required variables:');
required.forEach(key => {
  const value = process.env[key];
  if (!value) {
    console.log(`❌ ${key}: NOT SET`);
    hasErrors = true;
  } else {
    const masked = value.substring(0, 4) + '•'.repeat(Math.min(value.length - 4, 20));
    console.log(`✅ ${key}: ${masked}`);
  }
});

console.log('\nOptional variables:');
optional.forEach(key => {
  const value = process.env[key];
  if (!value) {
    console.log(`⚠️  ${key}: not set (optional)`);
  } else {
    if (key === 'NODE_ENV') {
      console.log(`✅ ${key}: ${value}`);
    } else {
      const masked = value.substring(0, 4) + '•'.repeat(Math.min(value.length - 4, 20));
      console.log(`✅ ${key}: ${masked}`);
    }
  }
});

console.log('\n=== Keystatic Configuration ===\n');

try {
  // Try to load the config
  const config = require('../keystatic.config.ts');
  console.log('✅ keystatic.config.ts loads successfully');

  // Check storage configuration
  const isDev = process.env.NODE_ENV === 'development';
  console.log(`📦 Environment: ${isDev ? 'development' : 'production'}`);
  console.log(`📦 Storage mode: ${isDev ? 'local' : 'github'}`);

  if (!isDev) {
    console.log(`📦 Repository: Kapinoida/dcplaskett-portfolio-working`);
  }
} catch (error) {
  console.log('❌ Error loading keystatic.config.ts:', error.message);
  hasErrors = true;
}

console.log('\n=== Recommendations ===\n');

if (hasErrors) {
  console.log('⚠️  Issues detected! Please fix the errors above.\n');
  console.log('For Vercel deployment:');
  console.log('1. Go to: https://vercel.com/[your-org]/[your-project]/settings/environment-variables');
  console.log('2. Add missing variables for all environments (Production, Preview, Development)');
  console.log('3. Redeploy your application\n');
} else {
  console.log('✅ All required environment variables are set!');
  console.log('✅ Configuration looks good!\n');

  if (process.env.NODE_ENV !== 'development') {
    console.log('Note: In production, make sure:');
    console.log('1. GitHub OAuth app callback URL matches your domain');
    console.log('2. You have write access to the repository');
    console.log('3. OAuth app is authorized for the repository owner/org\n');
  }
}

process.exit(hasErrors ? 1 : 0);
