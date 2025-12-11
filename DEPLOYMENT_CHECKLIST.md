# Keystatic Deployment Checklist

Use this checklist before deploying to ensure Keystatic GitHub authentication works.

## Pre-Deployment

### 1. GitHub OAuth App Setup
- [ ] Created OAuth App at https://github.com/settings/developers
- [ ] Set Homepage URL: `https://your-domain.vercel.app`
- [ ] Set Callback URL: `https://your-domain.vercel.app/api/keystatic/github/oauth/callback`
- [ ] (Optional) Added wildcard callback for previews: `https://*.vercel.app/api/keystatic/github/oauth/callback`
- [ ] Copied Client ID
- [ ] Generated and copied Client Secret

### 2. Vercel Environment Variables
- [ ] Added `KEYSTATIC_GITHUB_CLIENT_ID` in Vercel → Settings → Environment Variables
- [ ] Added `KEYSTATIC_GITHUB_CLIENT_SECRET` in Vercel → Settings → Environment Variables
- [ ] Both variables are set for **Production**
- [ ] Both variables are set for **Preview**
- [ ] Both variables are set for **Development**

### 3. Repository Access
- [ ] Repository `Kapinoida/dcplaskett-portfolio-working` exists
- [ ] You have **write/admin** access to the repository
- [ ] If it's an organization, the OAuth app is authorized for the org

### 4. Code Configuration
- [ ] `keystatic.config.ts` has correct repository name
- [ ] Route handler at `app/api/keystatic/[...params]/route.ts` exists
- [ ] No middleware interfering with `/api/keystatic/*` routes

## Deployment

- [ ] Push code to git
- [ ] Deploy to Vercel (or wait for auto-deployment)
- [ ] Verify deployment succeeded

## Post-Deployment Testing

### 1. Basic Access
- [ ] Can access `https://your-domain.vercel.app/keystatic`
- [ ] See Keystatic login screen (not a 404 or error)

### 2. Authentication Flow
- [ ] Click "Sign in with GitHub"
- [ ] Redirected to GitHub authorization page
- [ ] See scope includes "Access private repositories" or similar (this is the `repo` scope)
- [ ] Click "Authorize"
- [ ] Redirected back to Keystatic
- [ ] Successfully authenticated (see your content)

### 3. Verify Functionality
- [ ] Can view existing content
- [ ] Can create new content
- [ ] Can edit content
- [ ] Can save changes
- [ ] Changes appear in GitHub repository

## Troubleshooting

If any step fails, see [KEYSTATIC_TROUBLESHOOTING.md](./KEYSTATIC_TROUBLESHOOTING.md) for detailed debugging steps.

### Quick Fixes

**"Authentication failed" error:**
1. Check environment variables are set in Vercel
2. Redeploy the application
3. Verify callback URL matches exactly

**Empty/no cookies:**
1. Ensure environment variables are set
2. Check browser console for errors
3. Try in incognito mode (to rule out extensions)

**"Repository not found":**
1. Verify repository name in `keystatic.config.ts`
2. Check you have write access to the repository
3. Ensure OAuth scope is `repo` (not just `public_repo`)

## Success!

Once all checks pass, Keystatic should be fully functional on Vercel. You can:
- Access `/keystatic` to manage content
- Create and edit blog posts
- Create and edit portfolio items
- All changes automatically commit to GitHub
