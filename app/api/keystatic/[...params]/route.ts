import { makeRouteHandler } from '../../../../node_modules/@keystatic/next/dist/keystatic-next-route-handler.js';
import keystaticConfig from '@/keystatic.config';

export const { GET, POST } = makeRouteHandler({
  config: keystaticConfig,
});
