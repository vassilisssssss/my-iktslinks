import type { APIRoute } from 'astro';
import { urlDatabase } from './api/shorten.ts';

export const GET: APIRoute = async ({ params }) => {
  const shortId = params.shortId as string | undefined;

  if (!shortId) {
    return new Response('Short ID is missing', { status: 400 });
  }

  const targetUrl = urlDatabase.get(shortId);

  if (targetUrl) {
    return Response.redirect(targetUrl);
  }

  return new Response('URL not found', { status: 404 });
};
