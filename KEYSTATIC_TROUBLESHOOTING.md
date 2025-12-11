# Keystatic GitHub Auth Troubleshooting

## Current Setup

- **Keystatic Route**: `/app/api/keystatic/[...params]/route.ts`
- **Config**: `/keystatic.config.ts`
- **Repository**: `Kapinoida/dcplaskett-portfolio-working`

## Common Issues & Solutions

### 1. "Authentication Failed" Error

**Symptom**: After clicking "Sign in with GitHub" and authorizing, you get redirected back but see "Authentication failed"

**Causes & Solutions**:

#### Missing Environment Variables
```bash
# Check if these are set in Vercel:
KEYSTATIC_GITHUB_CLIENT_ID=<your_client_id>
KEYSTATIC_GITHUB_CLIENT_SECRET=<your_client_secret>
```

**Fix**:
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add both variables for **Production**, **Preview**, and **Development**
3. **Redeploy** your application (variables only take effect after redeployment)

#### Wrong Callback URL

**Fix**:
1. Go to https://github.com/settings/developers
2. Click on your OAuth App
3. Verify "Authorization callback URL" is exactly:
   ```
   https://your-domain.vercel.app/api/keystatic/github/oauth/callback
   ```
4. For preview deployments, add:
   ```
   https://*.vercel.app/api/keystatic/github/oauth/callback
   ```

### 2. Empty Cookies (Authentication State Lost)

**Symptom**: Logs show `COOKIE STORE (Pre-Logic): []`

**Causes**:
- Environment variables not set → Keystatic can't create sessions
- Callback URL mismatch → Cookies set on different domain
- Cookie settings blocked by browser

**Fix**:
1. Ensure environment variables are set (see above)
2. Check browser console for cookie warnings
3. Verify you're not using an ad blocker that blocks cross-site cookies

### 3. "Repository Not Found" Error

**Symptom**: Authentication works but you get an error accessing the repository

**Causes & Solutions**:

#### Wrong Repository Name
Check `keystatic.config.ts`:
```typescript
repo: 'Kapinoida/dcplaskett-portfolio-working'
```
- Must be exactly `username/repo-name` or `org/repo-name`
- Case-sensitive
- No trailing slashes

#### No Repository Access
- You must have **write** access to the repository
- If it's an organization repository, ensure the OAuth app is authorized for that org
- Go to https://github.com/settings/applications and check "Authorized OAuth Apps"

#### Wrong Scope
- The OAuth token needs `repo` scope (not just `public_repo`)
- Our route handler automatically enforces this
- Check the token scope in logs: should show `"scope": "repo"`

### 4. Works Locally But Not on Vercel

**Symptom**: `npm run dev` works fine, but deployed version fails

**Causes & Solutions**:

#### Environment Variables Not Set
- Local uses `kind: 'local'` (no auth needed)
- Production uses `kind: 'github'` (requires OAuth)
- **Solution**: Set environment variables in Vercel

#### Different Callback URL
- Local: `http://localhost:3000/api/keystatic/github/oauth/callback`
- Production: `https://your-domain.vercel.app/api/keystatic/github/oauth/callback`
- **Solution**: Add both to your GitHub OAuth App

## Debugging Steps

### 1. Check Vercel Logs

```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Login
vercel login

# View logs in real-time
vercel logs --follow
```

Then try to authenticate and watch for errors.

### 2. Verify Environment Variables

In Vercel Dashboard:
1. Settings → Environment Variables
2. Verify both `KEYSTATIC_GITHUB_CLIENT_ID` and `KEYSTATIC_GITHUB_CLIENT_SECRET` are set
3. Check they're enabled for the right environments
4. Click "Redeploy" with "Use existing Build Cache" unchecked

### 3. Test GitHub OAuth Flow

1. Go to `https://your-domain.vercel.app/keystatic`
2. Open browser DevTools (F12)
3. Go to Network tab
4. Click "Sign in with GitHub"
5. Watch the requests:
   - Should redirect to `/api/keystatic/github/login`
   - Then to `github.com/login/oauth/authorize?scope=repo&...`
   - Then to `/api/keystatic/github/oauth/callback?code=...`
   - Finally back to `/keystatic` (authenticated)

### 4. Check GitHub OAuth App Settings

1. Go to https://github.com/settings/developers
2. Click on your OAuth App
3. Verify:
   - ✅ Homepage URL matches your domain
   - ✅ Callback URL is exact: `https://your-domain.vercel.app/api/keystatic/github/oauth/callback`
   - ✅ You can see "Client ID" (copy this to Vercel env vars)
   - ✅ You have a "Client Secret" (if not, generate a new one)

## Still Not Working?

If you've tried everything above and it still doesn't work:

1. **Regenerate the OAuth App**:
   - Create a brand new GitHub OAuth App
   - Use fresh Client ID and Secret
   - Update environment variables in Vercel
   - Redeploy

2. **Check for Conflicts**:
   - Make sure you don't have middleware that's interfering with cookies
   - Check `next.config.mjs` for any custom configurations

3. **Verify Keystatic Versions**:
   ```bash
   npm list @keystatic/core @keystatic/next
   ```
   Should be `@keystatic/core@^0.5.48` and `@keystatic/next@^5.0.4` or newer

4. **Check Repository**:
   - Can you manually push to `Kapinoida/dcplaskett-portfolio-working`?
   - Does it exist?
   - Is it private or public?

## Success Checklist

Before deploying, verify:

- ✅ GitHub OAuth App created
- ✅ Homepage URL and Callback URL configured
- ✅ Client ID and Secret copied
- ✅ Environment variables set in Vercel (Production, Preview, Development)
- ✅ Repository name in `keystatic.config.ts` is correct
- ✅ You have write access to the repository
- ✅ Application redeployed after setting environment variables
