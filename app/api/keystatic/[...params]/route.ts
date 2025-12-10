import { makeRouteHandler } from '@keystatic/next/route-handler';
import keystaticConfig from '@/keystatic.config';




const config = { config: keystaticConfig };
const handler = makeRouteHandler(config);

export const POST = handler.POST;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  // DEBUG: Inspect Callback Error
  if (code && url.pathname.endsWith('/github/oauth/callback')) {
    console.log('--- MANUAL DEBUG CALLBACK START ---');
    console.log('Code:', code);
    try {
      const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          client_id: process.env.KEYSTATIC_GITHUB_CLIENT_ID,
          client_secret: process.env.KEYSTATIC_GITHUB_CLIENT_SECRET,
          code: code,
        }),
      });
      const tokenData = await tokenRes.json();
      console.log('GITHUB TOKEN RESPONSE:', JSON.stringify(tokenData, null, 2));
    } catch (err) {
      console.error('MANUAL FETCH ERROR:', err);
    }
    console.log('--- MANUAL DEBUG CALLBACK END ---');
  }
  
  // Intercept the Login call to force scope
  if (url.pathname.endsWith('/github/login')) {
    const response = await handler.GET(request);
    const location = response.headers.get('Location');
    
    if (response.status === 307 && location && location.includes('github.com/login/oauth/authorize')) {
      const loginUrl = new URL(location);
      const outputScope = loginUrl.searchParams.get('scope');
      
      // If scope is missing or doesn't include 'repo', force it
      if (!outputScope || !outputScope.includes('repo')) {
        loginUrl.searchParams.set('scope', 'repo');
        
        // Clone headers to preserve Set-Cookie (critical for auth state)
        const newHeaders = new Headers();
        response.headers.forEach((value, key) => {
          newHeaders.append(key, value);
        });
        newHeaders.set('Location', loginUrl.toString());

        return new Response(null, {
          status: 307,
          headers: newHeaders
        });
      }
    }
    return response;
  }

  return handler.GET(request);
}
