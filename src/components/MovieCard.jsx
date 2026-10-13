
import { Trash2 } from 'lucide-react';
import genres from '../data/genres';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const MovieCard = ({ movie, onRemove }) => {
  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : null;

  const movieGenres = (movie.genre_ids || [])
    .map((genreId) =>
      genres.find((genre) => genre.id === genreId)
    )
    .filter(Boolean);

  return (
    <article className="movie-card">
      {posterUrl ? (
        <img
          className="movie-poster"
          src={posterUrl}
          alt={`${movie.title} poster`}
          loading="lazy"
        />
      ) : (
        <div className="poster-placeholder">
          No poster available
        </div>
      )}

      <div className="movie-info">
        <h3>{movie.title}</h3>

        <p className="movie-rating">
          ⭐ {Number(movie.vote_average).toFixed(1)}
        </p>

        <p className="movie-year">
          {movie.release_date
            ? movie.release_date.slice(0, 4)
            : 'Release date unknown'}
        </p>

        <div className="movie-genres">
          {movieGenres.length > 0 ? (
            movieGenres.map((genre) => (
              <span className="genre-tag" key={genre.id}>
                {genre.name}
              </span>
            ))
          ) : (
            <span className="genre-tag">Genre unavailable</span>
          )}
        </div>

        {onRemove && (
          <button
            className="remove-movie-button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(movie.id);
            }}
            aria-label={`Remove ${movie.title} from My List`}
          >
            <Trash2 size={16} />
            Remove
          </button>
        )}
      </div>
    </article>
  );
};

export default MovieCard;