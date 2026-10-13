
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import GenreFilter from '../components/GenreFilter';
import Pagination from '../components/Pagination';

const MoviesPage = ({
  movies,
  loading,
  error,
  search,
  setSearch,
  selectedGenre,
  setSelectedGenre,
  onOpenDetails,
  page,
  totalPages,
  onPageChange,
}) => {
  return (
    <section className="movies-section" id="movies">
      <div className="section-heading">
        <p>Explore Movies</p>
      </div>

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <GenreFilter
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
      />

      {loading && <p>Loading movies...</p>}

      {!loading && error && (
        <p className="error-message">{error}</p>
      )}

      {!loading && !error && (
        <>
          {movies.length > 0 ? (
            <div className="movies-grid">
              {movies.map((movie) => (
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
          ) : (
            <p>No movies found. Try another title!</p>
          )}

          {movies.length > 0 && totalPages > 1 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={onPageChange}
              loading={loading}
            />
          )}
        </>
      )}
    </section>
  );
};

export default MoviesPage;

