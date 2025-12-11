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
          
          const newHeaders = new Headers();
          
          // Copy all headers EXCEPT Set-Cookie first to avoid merging issues
          response.headers.forEach((val, key) => {
             if (key.toLowerCase() !== 'set-cookie') newHeaders.append(key, val);
          });
          
          // Safely copy Set-Cookie headers
          // @ts-ignore - getSetCookie is available in Next.js/Node 18+ environment
          const cookies = typeof response.headers.getSetCookie === 'function' 
            ? response.headers.getSetCookie() 
            : [response.headers.get('Set-Cookie')].filter(Boolean);
            
          cookies.forEach((cookie: string) => {
             newHeaders.append('Set-Cookie', cookie);
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
