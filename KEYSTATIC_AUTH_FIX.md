# Keystatic Authentication Fix

## Root Cause

Based on your logs showing **empty cookies** and **authentication failures**, the issue is likely:

**Missing or Invalid `KEYSTATIC_SECRET`**

Keystatic requires **THREE** environment variables for GitHub mode to work:

1. ✅ `KEYSTATIC_GITHUB_CLIENT_ID` (you have this)
2. ✅ `KEYSTATIC_GITHUB_CLIENT_SECRET` (you have this)
3. ⚠️  `KEYSTATIC_SECRET` (you have this, but it might be invalid/malformed)

The `KEYSTATIC_SECRET` is used to **sign session cookies**. Without a valid secret:
- Cookies aren't set or are rejected by the browser
- Authentication state is lost between requests
- OAuth flow fails after GitHub callback

## Solution

### Step 1: Generate a New Secret

```bash
node scripts/generate-keystatic-secret.js
```

This will output a cryptographically secure random secret like:
```
5UnCbxmP3qyhKmfZwAEU2cwJ0UZ27Ed3RR5FbJIlseo=
```

### Step 2: Update Vercel Environment Variables

1. Go to [Vercel Dashboard](https://vercel.com) → Your Project → Settings → Environment Variables
2. Find the existing `KEYSTATIC_SECRET` variable
3. **Delete it** or update its value
4. Add the new secret you just generated
5. Make sure it's set for **all environments**: Production, Preview, Development

### Step 3: Redeploy

**Critical**: Environment variable changes only take effect after redeployment!

```bash
# Option 1: Trigger redeploy via Vercel dashboard
# Go to Deployments → Latest → click "..." → Redeploy

# Option 2: Trigger via git push
git commit --allow-empty -m "Trigger redeploy after env var update"
git push
```

### Step 4: Test Authentication

1. Go to `https://your-domain.vercel.app/keystatic`
2. Click "Sign in with GitHub"
3. Check browser DevTools → Application → Cookies
4. You should now see cookies being set (look for `__session` or similar)
5. Complete GitHub authorization
6. You should be authenticated successfully!

## Why This Fix Works

The updated route handler ([route.ts](app/api/keystatic/[...params]/route.ts)) now:

1. ✅ Properly enforces `repo` scope for GitHub OAuth
2. ✅ Preserves all Set-Cookie headers using `Response.redirect()`
3. ✅ Copies cookies manually using `headers.getSetCookie()` and `headers.append()`
4. ✅ Logs detailed information for debugging

With a valid `KEYSTATIC_SECRET`, Keystatic can now:
- Sign cookies securely
- Maintain session state across requests
- Complete the OAuth flow successfully

## Verification

After deploying, check the Vercel logs. You should see:

```
[Keystatic] GET request: /api/keystatic/github/login
[Keystatic] Login response status: 307
[Keystatic] Original Set-Cookie headers count: 1  <-- Should be > 0
[Keystatic] Set-Cookie 0: __session=...
[Keystatic] Current scope: <scope> - Enforcing "repo"
[Keystatic] Modified response Set-Cookie count: 1
```

If you still see `count: 0`, then the secret is still invalid.

## Still Not Working?

If authentication still fails after following these steps:

### 1. Verify the Secret is Set Correctly

```bash
# Install Vercel CLI
npm i -g vercel

# Check environment variables
vercel env ls
```

Look for `KEYSTATIC_SECRET` and verify it shows for all environments.

### 2. Check Secret Format

The secret should be:
- ✅ Base64-encoded string
- ✅ At least 32 characters
- ✅ No spaces or special characters except `=` at the end

### 3. Regenerate OAuth App

If the secret is correct but still failing, try creating a fresh GitHub OAuth App:

1. Go to https://github.com/settings/developers
2. Create a new OAuth App with:
   - Homepage URL: `https://your-domain.vercel.app`
   - Callback URL: `https://your-domain.vercel.app/api/keystatic/github/oauth/callback`
3. Copy the new Client ID
4. Generate a new Client Secret
5. Update Vercel environment variables
6. Redeploy

### 4. Check Browser Console

Open DevTools → Console and look for errors like:
- "Cookie rejected due to SameSite policy"
- "Secure cookie requires HTTPS"
- CORS errors

### 5. Try Incognito Mode

Sometimes browser extensions or cached data interfere with authentication. Try in an incognito/private window.

## References

- [Keystatic GitHub Mode Documentation](https://keystatic.com/docs/github-mode)
- [Keystatic Vercel Deployment Discussion](https://github.com/Thinkmill/keystatic/discussions/524)
- [Generated troubleshooting guide](./KEYSTATIC_TROUBLESHOOTING.md)
- [Deployment checklist](./DEPLOYMENT_CHECKLIST.md)
