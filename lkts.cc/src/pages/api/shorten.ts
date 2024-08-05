import type { APIRoute } from 'astro';

const urlDatabase = new Map<string, string>();

export const GET: APIRoute = async ({ url }) => {
  const targetUrl = url.searchParams.get('url');
  const shortId = generateShortId();

  if (!targetUrl) {
    return new Response('Missing URL parameter', { status: 400 });
  }

  urlDatabase.set(shortId, targetUrl);

  const shortUrl = `https://localhost:4321/${shortId}`;
  return new Response(
    JSON.stringify({ shortUrl }),
    { headers: { 'Content-Type': 'application/json' } }
  );
};

function generateShortId(length = 6) {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let shortId = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    shortId += charset[randomIndex];
  }
  return shortId;
}

export { urlDatabase };
