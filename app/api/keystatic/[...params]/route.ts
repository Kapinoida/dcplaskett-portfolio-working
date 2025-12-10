import { makeRouteHandler } from '@keystatic/next/route-handler';
import keystaticConfig from '@/keystatic.config';



export const POST = makeRouteHandler({
  config: keystaticConfig,
}).POST;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (code && url.pathname.includes('github/oauth/callback')) {
    console.log('--- MANUAL DEBUG START ---');
    console.log('Code found:', code);
    
    // Attempt manual exchange to see the error
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
          // redirect_uri is optional but good to verify if included
        }),
      });
      
      const tokenData = await tokenRes.json();
      console.log('GITHUB RESPONSE:', JSON.stringify(tokenData, null, 2));
    } catch (err) {
      console.error('MANUAL FETCH ERROR:', err);
    }
    console.log('--- MANUAL DEBUG END ---');
  }

  return makeRouteHandler({ config: keystaticConfig }).GET(request);
}
