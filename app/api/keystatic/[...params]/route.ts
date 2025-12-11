import { makeRouteHandler } from '@keystatic/next/route-handler';
import keystaticConfig from '@/keystatic.config';

export const dynamic = 'force-dynamic';

const handler = makeRouteHandler({
  config: keystaticConfig,
});

export const POST = handler.POST;

export async function GET(request: Request) {
  const url = new URL(request.url);

  console.log('[Keystatic] GET request:', url.pathname);

  // Intercept GitHub OAuth login to ensure 'repo' scope
  if (url.pathname.endsWith('/github/login')) {
    const response = await handler.GET(request);

    console.log('[Keystatic] Login response status:', response.status);

    // Log all Set-Cookie headers from the handler
    const originalSetCookies = response.headers.getSetCookie();
    console.log('[Keystatic] Original Set-Cookie headers count:', originalSetCookies.length);
    originalSetCookies.forEach((cookie, i) => {
      console.log(`[Keystatic] Set-Cookie ${i}:`, cookie.substring(0, 100));
    });

    // Check if this is a redirect to GitHub OAuth
    const location = response.headers.get('Location');
    if (response.status === 307 && location?.includes('github.com/login/oauth/authorize')) {
      const loginUrl = new URL(location);
      const currentScope = loginUrl.searchParams.get('scope');

      // Only modify if scope doesn't already include 'repo'
      if (!currentScope?.includes('repo')) {
        console.log('[Keystatic] Current scope:', currentScope, '- Enforcing "repo"');
        loginUrl.searchParams.set('scope', 'repo');

        // Create redirect response with the same status code
        const modifiedResponse = Response.redirect(loginUrl.toString(), response.status);

        // Manually copy all Set-Cookie headers from the original response
        originalSetCookies.forEach(cookie => {
          modifiedResponse.headers.append('Set-Cookie', cookie);
        });

        console.log('[Keystatic] Modified response Set-Cookie count:', modifiedResponse.headers.getSetCookie().length);
        return modifiedResponse;
      }
    }

    return response;
  }

  // Log callback requests
  if (url.pathname.includes('/callback')) {
    console.log('[Keystatic] Callback received with code:', url.searchParams.has('code'));
  }

  return handler.GET(request);
}
