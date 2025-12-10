import { makeRouteHandler } from '@keystatic/next/route-handler';
import keystaticConfig from '@/keystatic.config';




const config = { config: keystaticConfig };
const handler = makeRouteHandler(config);

export const POST = handler.POST;

export async function GET(request: Request) {
  const url = new URL(request.url);
  
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
