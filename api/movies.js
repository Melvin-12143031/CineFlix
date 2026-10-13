
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
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const requestUrl = new URL(req.url, 'http://localhost');
  const endpoint = requestUrl.searchParams.get('path');

  if (!endpoint) {
    return res.status(400).json({ error: 'Missing API path' });
  }

  let parsedEndpoint;

  try {
    parsedEndpoint = new URL(
      endpoint,
      'https://api.themoviedb.org'
    );
  } catch {
    return res.status(400).json({ error: 'Invalid API path' });
  }

  if (
    parsedEndpoint.origin !== 'https://api.themoviedb.org' ||
    !allowedPaths.some((pattern) =>
      pattern.test(parsedEndpoint.pathname)
    )
  ) {
    return res.status(400).json({ error: 'Invalid movie API path' });
  }

  if (!process.env.TMDB_API_TOKEN) {
    return res.status(500).json({
      error: 'TMDB_API_TOKEN is not configured',
    });
  }

  try {
    const tmdbUrl = new URL(
      `${TMDB_BASE_URL}${parsedEndpoint.pathname}`
    );

    parsedEndpoint.searchParams.forEach((value, key) => {
      tmdbUrl.searchParams.set(key, value);
    });

    const response = await fetch(tmdbUrl, {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
        accept: 'application/json',
      },
    });

    const data = await response.json();

    return res.status(response.status).json(data);
  } catch {
    return res.status(502).json({
      error: 'Unable to fetch movie data',
    });
  }
}