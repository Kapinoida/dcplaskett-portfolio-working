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
    
    // DEBUG: Check if Keystatic set cookies in the store
    // @ts-ignore
    const ctxCookies = cookies().getAll();
    console.log('PATCH DEBUG: Context Cookies after handler:', ctxCookies.map(c => c.name));

    const location = response.headers.get('Location');
    
    if (response.status === 307 && location && location.includes('github.com/login/oauth/authorize')) {
      const loginUrl = new URL(location);
      const outputScope = loginUrl.searchParams.get('scope');
      
      // If scope is missing or doesn't include 'repo', force it
      if (!outputScope || !outputScope.includes('repo')) {
        loginUrl.searchParams.set('scope', 'repo');
        
        try {
            // Apply location change
            response.headers.set('Location', loginUrl.toString());

            // CRITICAL FIX: Manually verify/append context cookies to the response
            // This ensures that if Keystatic used cookies().set(), we definitely send them
            ctxCookies.forEach(c => {
                if (c.name.includes('keystatic')) {
                    console.log('PATCH: Syncing cookie to header:', c.name);
                    // Construct Set-Cookie header manually if needed
                    // Note: basic construction, might miss specialized attributes like HttpOnly if not exposed in .getAll()
                    // But usually Next.js handles this. If we append here, we double-ensure.
                    response.headers.append('Set-Cookie', `${c.name}=${c.value}; Path=/; SameSite=Lax`);
                }
            });

            return response;
        } catch (err) {
            console.error('PATCH ERROR:', err);
        }
      }
    }
    return response;
  }

  return handler.GET(request);
}
