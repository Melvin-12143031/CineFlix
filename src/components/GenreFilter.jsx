
import genres from '../data/genres';

const GenreFilter = ({ selectedGenre, setSelectedGenre }) => {
  return (
    <div className="genre-filter">
      <button
        className={
          selectedGenre === 'all'
            ? 'genre-button active'
            : 'genre-button'
        }
        onClick={() => setSelectedGenre('all')}
      >
        All
      </button>

      {genres.map((genre) => (
        <button
          key={genre.id}
          className={
            selectedGenre === genre.id
              ? 'genre-button active'
              : 'genre-button'
          }
          onClick={() => setSelectedGenre(genre.id)}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
};

export default GenreFilter;