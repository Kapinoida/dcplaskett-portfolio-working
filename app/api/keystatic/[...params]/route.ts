import { makeRouteHandler } from '@keystatic/next/route-handler';
import keystaticConfig from '@/keystatic.config';

export const dynamic = 'force-dynamic';

const handler = makeRouteHandler({
  config: keystaticConfig,
});

export const POST = handler.POST;

export async function GET(request: Request) {
  const url = new URL(request.url);

  // Intercept GitHub OAuth login to ensure 'repo' scope
  if (url.pathname.endsWith('/github/login')) {
    const response = await handler.GET(request);

    // Check if this is a redirect to GitHub OAuth
    const location = response.headers.get('Location');
    if (response.status === 307 && location?.includes('github.com/login/oauth/authorize')) {
      const loginUrl = new URL(location);
      const currentScope = loginUrl.searchParams.get('scope');

      // Only modify if scope doesn't already include 'repo'
      if (!currentScope?.includes('repo')) {
        loginUrl.searchParams.set('scope', 'repo');

        // Create a new response preserving all original properties
        const modifiedResponse = new Response(response.body, response);
        modifiedResponse.headers.set('Location', loginUrl.toString());

        return modifiedResponse;
      }
    }

    return response;
  }

  return handler.GET(request);
}
