
import MovieCard from '../components/MovieCard';

const HomePage = ({
  trendingMovies,
  popularMovies,
  heroMovies,
  featuredMovie,
  heroIndex,
  setHeroIndex,
  myList,
  onOpenDetails,
  onToggleMyList,
}) => {
  return (
    <>
      {/* Hero Carousel */}
      <section className="hero" id="home">
        <div
          key={featuredMovie?.id || 'hero-background'}
          className="hero-background"
          style={{
            backgroundImage: featuredMovie?.backdrop_path
              ? `
                linear-gradient(
                  90deg,
                  #0b0b0f 0%,
                  rgba(11, 11, 15, 0.85) 40%,
                  rgba(11, 11, 15, 0.25) 100%
                ),
                linear-gradient(
                  0deg,
                  #0b0b0f 0%,
                  transparent 45%
                ),
                url(https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path})
              `
              : 'none',
          }}
        />

        <p className="hero-label">FEATURED MOVIE</p>

        <h2>
          {featuredMovie?.title ||
            'Stories worth staying up for.'}
        </h2>

        <p className="hero-description">
          {featuredMovie?.overview ||
            "Discover movies you'll want to watch again and again."}
        </p>

        {featuredMovie && (
          <div className="hero-movie-meta">
            <span>
              ⭐ {Number(featuredMovie.vote_average).toFixed(1)}
            </span>

            <span>
              {featuredMovie.release_date
                ? featuredMovie.release_date.slice(0, 4)
                : 'Release date unknown'}
            </span>
          </div>
        )}

        <div className="hero-actions">
          <button
            className="explore-button"
            onClick={() => onOpenDetails(featuredMovie)}
            disabled={!featuredMovie}
          >
            View Details
          </button>

          <button
            className="hero-secondary-button"
            onClick={() => onToggleMyList(featuredMovie)}
            disabled={!featuredMovie}
          >
            {featuredMovie &&
            myList.some(
              (movie) => movie.id === featuredMovie.id
            )
              ? '✓ In My List'
              : '+ My List'}
          </button>
        </div>

        {/* Previous / Next Controls */}
        <div className="hero-carousel-controls">
          <button
            onClick={() =>
              setHeroIndex((currentIndex) =>
                currentIndex === 0
                  ? heroMovies.length - 1
                  : currentIndex - 1
              )
            }
            disabled={heroMovies.length < 2}
            aria-label="Previous featured movie"
          >
            ‹
          </button>

          <span>
            {heroMovies.length > 0 ? heroIndex + 1 : 0}
            {' / '}
            {heroMovies.length}
          </span>

          <button
            onClick={() =>
              setHeroIndex(
                (currentIndex) =>
                  (currentIndex + 1) % heroMovies.length
              )
            }
            disabled={heroMovies.length < 2}
            aria-label="Next featured movie"
          >
            ›
          </button>
        </div>

        {/* Carousel Indicators */}
        <div className="hero-indicators">
          {heroMovies.map((movie, index) => (
            <button
              key={movie.id}
              className={index === heroIndex ? 'active' : ''}
              onClick={() => setHeroIndex(index)}
              aria-label={`Show featured movie ${index + 1}`}
              aria-current={
                index === heroIndex ? 'true' : undefined
              }
            />
          ))}
        </div>
      </section>

      {/* Trending Movies */}
      <section className="movies-section">
        <div className="section-heading">
          <p>Trending This Week</p>
        </div>

        <div className="movies-grid">
          {trendingMovies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => onOpenDetails(movie)}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (
                  event.key === 'Enter' ||
                  event.key === ' '
                ) {
                  event.preventDefault();
                  onOpenDetails(movie);
                }
              }}
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </section>

      {/* Popular Movies */}
      <section className="movies-section">
        <div className="section-heading">
          <p>Popular Movies</p>
        </div>

        <div className="movies-grid">
          {popularMovies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => onOpenDetails(movie)}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (
                  event.key === 'Enter' ||
                  event.key === ' '
                ) {
                  event.preventDefault();
                  onOpenDetails(movie);
                }
              }}
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default HomePage;