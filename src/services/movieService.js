
const API_BASE_URL = '/api/movies';

const fetchMovies = async (endpoint) => {
  const response = await fetch(
    `${API_BASE_URL}?path=${encodeURIComponent(endpoint)}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch movies.');
  }

  const data = await response.json();

  return {
    results: data.results,
    totalPages: data.total_pages,
  };
};

export const getPopularMovies = async (page = 1) => {
  return fetchMovies(
    `/movie/popular?page=${page}&language=en-US`
  );
};

export const searchMovies = async (query, page = 1) => {
  return fetchMovies(
    `/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=${page}`
  );
};

export const getMoviesByGenre = async (genreId, page = 1) => {
  return fetchMovies(
    `/discover/movie?with_genres=${genreId}&include_adult=false&language=en-US&page=${page}&sort_by=popularity.desc`
  );
};

export const getTrendingMovies = async (page = 1) => {
  return fetchMovies(
    `/trending/movie/week?page=${page}&language=en-US`
  );
};

export const getMovieVideos = async (movieId) => {
  const response = await fetch(
    `${API_BASE_URL}?path=${encodeURIComponent(`/movie/${movieId}/videos?language=en-US`)}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch movie videos.');
  }

  const data = await response.json();

  return data.results;
};