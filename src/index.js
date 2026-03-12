import { offlineHTML } from './template.js';

export default {
  async fetch(request) {
    const response = await fetch(request);

    // If the Lenovo tunnel is down (Cloudflare Error 530)
    if (response.status === 530) {
      return new Response(offlineHTML, {
        status: 503, // 503 Service Unavailable is best for SEO
        headers: { 'content-type': 'text/html;charset=UTF-8' },
      });
    }

    // If the Lenovo is online, pass traffic normally
    return response;
  }
};