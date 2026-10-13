/* global process */

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

const allowedPaths = [
  /^\/movie\/popular$/,
  /^\/search\/movie$/,
  /^\/discover\/movie$/,
  /^\/trending\/movie\/week$/,
  /^\/movie\/\d+\/videos$/,
];

export default async function handler(req, res) {
  // Allow requests only from our CineFlix website.
  const origin = req.headers.origin;
  const allowedOrigin = 'https://cineflix-gamma-ten.vercel.app';

  if (origin && origin !== allowedOrigin) {
    return res.status(403).json({ error: 'Origin not allowed' });
  }

  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Vary', 'Origin');

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const requestUrl = new URL(req.url, 'http://localhost');
  const path = requestUrl.searchParams.get('path');

  if (!path || !allowedPaths.some((pattern) => pattern.test(path))) {
    return res.status(400).json({ error: 'Invalid movie API path' });
  }

  const tmdbUrl = new URL(`${TMDB_BASE_URL}${path}`);

  requestUrl.searchParams.forEach((value, key) => {
    if (key !== 'path') {
      tmdbUrl.searchParams.set(key, value);
    }
  });

  try {
    const response = await fetch(tmdbUrl, {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
        accept: 'application/json',
      },
    });

    const data = await response.json();

    return res.status(response.status).json(data);
  } catch {
    return res.status(502).json({ error: 'Unable to fetch movie data' });
  }
}