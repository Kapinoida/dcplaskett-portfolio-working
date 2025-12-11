import { makeRouteHandler } from '@keystatic/next/route-handler';
import keystaticConfig from '@/keystatic.config';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

const config = { config: keystaticConfig };
const handler = makeRouteHandler(config);

export const POST = handler.POST;

export async function GET(request: Request) {
  const url = new URL(request.url);

  // DEBUG: Check what cookies are entering/leaving
  // @ts-ignore
  const cookieStore = cookies();
  console.log('COOKIE STORE (Pre-Logic):', cookieStore.getAll());
  
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
          
          try {
            // Attempt to mutate the existing response header to preserve all other state (cookies)
            response.headers.set('Location', loginUrl.toString());
            return response;
          } catch (err) {
            console.error('PATCH ERROR: Could not mutate headers', err);
            // Fallback: Clone response
            return new Response(response.body, {
              status: response.status,
              statusText: response.statusText,
              headers: {
                ...Object.fromEntries(response.headers.entries()),
                'Location': loginUrl.toString()
              }
            });
          }
        }
    }
    return response;
  }

  return handler.GET(request);
}
