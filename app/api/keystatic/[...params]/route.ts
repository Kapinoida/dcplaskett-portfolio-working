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
        console.log('PATCH: Forcing scope=repo on GitHub Login');
        loginUrl.searchParams.set('scope', 'repo');
        return new Response(null, {
          status: 307,
          headers: { Location: loginUrl.toString(), 'Set-Cookie': response.headers.get('Set-Cookie') || '' }
        });
      }
    }
    return response;
  }

  return handler.GET(request);
}
