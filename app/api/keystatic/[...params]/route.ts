import { makeRouteHandler } from '@keystatic/next/route-handler';
import keystaticConfig from '@/keystatic.config';


const { GET: _GET, POST: _POST } = makeRouteHandler({
  config: keystaticConfig,
});

export async function GET(request: Request) {
  console.log('Keystatic GET:', request.url);
  console.log('Env Check:', {
    hasClientId: !!process.env.KEYSTATIC_GITHUB_CLIENT_ID,
    hasClientSecret: !!process.env.KEYSTATIC_GITHUB_CLIENT_SECRET,
    hasSecret: !!process.env.KEYSTATIC_SECRET,
    mode: process.env.NODE_ENV,
    repo: 'Kapinoida/dcplaskett-portfolio-working'
  });
  return _GET(request);
}

export async function POST(request: Request) {
  return _POST(request);
}
