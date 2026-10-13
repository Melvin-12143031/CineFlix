
import MovieCard from '../components/MovieCard';

const MyListPage = ({
  myList,
  onOpenDetails,
  onRemoveFromMyList,
  onClearMyList,
}) => {
  return (
    <section className='movies-section'>

      {myList.length === 0 ? (
        <div className="empty-state">
          <h2>Your list is empty</h2>
          <p>Add movies you want to keep track of.</p>
        </div>
      ) : (
        <>


          <div className="my-list-header">
            <div className="section-heading">
              <p>My List</p>
            </div>

            {myList.length > 0 && (
              <button
                className="clear-list-button"
                onClick={onClearMyList}
              >
                Clear My List
              </button>
            )}
          </div>



          <div className="movies-grid">
            {myList.map((movie) => (
              <div key={movie.id} className="my-list-card">
                <div
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

                <button
                  className="remove-button"
                  onClick={() => onRemoveFromMyList(movie.id)}
                  aria-label={`Remove ${movie.title} from My List`}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default MyListPage;