# Setting Up a GitHub App for Keystatic (NOT OAuth App!)

## IMPORTANT: GitHub App vs OAuth App

**You need a GitHub App, NOT a GitHub OAuth App.** These are different:

- ✅ **GitHub App**: Modern, fine-grained permissions, short-lived tokens, what Keystatic requires
- ❌ **GitHub OAuth App**: Legacy, broad permissions, what you currently have but won't work

## Step-by-Step: Create a GitHub App

### 1. Go to GitHub App Settings

Visit one of these URLs depending on where you want to create the app:

**Personal Account:**
https://github.com/settings/apps/new

**Organization:**
https://github.com/organizations/YOUR_ORG_NAME/settings/apps/new

### 2. Fill Out the GitHub App Details

**GitHub App name:**
```
Keystatic CMS - Your Site Name
```
(Must be unique across all of GitHub)

**Homepage URL:**
```
https://your-domain.vercel.app
```

**Callback URL:**
```
https://your-domain.vercel.app/api/keystatic/github/oauth/callback
```

**Setup URL:** (leave blank)

**Webhook:**
- [ ] Uncheck "Active" (Keystatic doesn't use webhooks)

### 3. Set Permissions

Scroll down to **Repository permissions** and set:

| Permission | Access |
|------------|--------|
| Contents   | Read and write |
| Metadata   | Read-only (this is automatically selected) |

**DO NOT** set any other permissions - Keystatic only needs Contents access.

### 4. Where can this GitHub App be installed?

Select one of:
- **Only on this account** (if personal or single organization)
- **Any account** (if you want to reuse across multiple repos/orgs)

### 5. Create the GitHub App

Click **Create GitHub App**

### 6. Generate a Client Secret

After creation, you'll be on the app settings page:

1. Scroll down to **Client secrets**
2. Click **Generate a new client secret**
3. **IMMEDIATELY COPY IT** - you won't be able to see it again!

### 7. Get Your App Information

On the app settings page, note:

- **Client ID**: Shown at the top (looks like: `Iv1.0123456789abcdef`)
- **Client Secret**: What you just generated and copied
- **App Slug**: The URL-friendly name of your app (shown in the URL)
  - Example: If URL is `https://github.com/settings/apps/keystatic-cms-your-site`, the slug is `keystatic-cms-your-site`

### 8. Install the App to Your Repository

1. In the left sidebar of your app settings, click **Install App**
2. Click **Install** next to your account/organization
3. Choose:
   - **All repositories** (if you want to use it for all your repos)
   - **Only select repositories** → select `dcplaskett-portfolio-working`
4. Click **Install**

### 9. Set Environment Variables in Vercel

Go to your Vercel project → Settings → Environment Variables and add:

```bash
KEYSTATIC_GITHUB_CLIENT_ID=Iv1.0123456789abcdef
KEYSTATIC_GITHUB_CLIENT_SECRET=your_generated_client_secret_here
KEYSTATIC_SECRET=your_keystatic_secret_from_generate_script
NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=keystatic-cms-your-site
```

**CRITICAL:**
- Set for **all environments**: Production, Preview, Development
- The `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` must match the slug from step 7
- After adding, you MUST redeploy!

### 10. Update Your .env.example

For reference, update your local `.env.example`:

```bash
# Keystatic GitHub App Configuration (NOT OAuth App!)
KEYSTATIC_GITHUB_CLIENT_ID=your_github_app_client_id
KEYSTATIC_GITHUB_CLIENT_SECRET=your_github_app_client_secret
KEYSTATIC_SECRET=your_generated_secret
NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=your-github-app-slug
```

### 11. Redeploy and Test

1. Redeploy your Vercel application
2. Visit `https://your-domain.vercel.app/keystatic`
3. Click "Sign in with GitHub"
4. You should now see cookies being set!
5. Complete authorization
6. Success! 🎉

## Troubleshooting

### Still No Cookies?

Check the Vercel logs for:
```
[Keystatic Init] Environment check: {
  hasClientId: true,
  hasClientSecret: true,
  hasSecret: true,
  hasGithubAppSlug: true,  <-- This should now be true!
  ...
}
```

If `hasGithubAppSlug` is still false, the environment variable isn't set correctly.

### "App not installed" Error?

You need to install the GitHub App to your repository (step 8).

### Permission Denied?

Make sure:
- The GitHub App has "Contents: Read and write" permission
- The App is installed on the specific repository
- Your GitHub account has access to the repository

## Differences: GitHub App vs OAuth App

| Feature | GitHub OAuth App (❌ Old) | GitHub App (✅ Required) |
|---------|-------------------------|-------------------------|
| Token lifetime | Never expires | 1 hour (auto-refresh) |
| Permissions | Broad user permissions | Fine-grained repo permissions |
| Installation | N/A | Installed per repo/org |
| Environment var | N/A | Requires `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` |
| Used by Keystatic | ❌ No | ✅ Yes |

## References

- [GitHub Apps vs OAuth Apps - Logto Blog](https://blog.logto.io/github-apps-vs-oauth-apps)
- [Keystatic GitHub Mode Documentation](https://keystatic.com/docs/github-mode)
- [Differences between GitHub Apps and OAuth Apps - GitHub Docs](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/differences-between-github-apps-and-oauth-apps)
