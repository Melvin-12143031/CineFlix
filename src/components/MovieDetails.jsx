
import { useEffect, useState } from 'react';
import {
    X,
    Star,
    CalendarDays,
    Plus,
    Check,
    Play,
    LoaderCircle,
} from 'lucide-react';
import { getMovieVideos } from '../services/movieService';




const MovieDetails = ({ movie, onClose, onToggleMyList, myList }) => {

    const [trailer, setTrailer] = useState(null);
    const [showTrailer, setShowTrailer] = useState(false);
    const [trailerLoading, setTrailerLoading] = useState(false);
    const [trailerError, setTrailerError] = useState('');

    const movieId = movie?.id;



    useEffect(() => {
        if (!movieId) return;

        let cancelled = false;

        const fetchTrailer = async () => {
            setTrailer(null);
            setTrailerError('');
            setTrailerLoading(true);

            try {
                const videos = await getMovieVideos(movieId);

                const availableTrailer = videos.find(
                    (video) =>
                        video.site === 'YouTube' &&
                        video.type === 'Trailer' &&
                        video.key
                );

                if (!cancelled) {
                    setTrailer(availableTrailer || null);

                    if (!availableTrailer) {
                        setTrailerError('No trailer available for this movie.');
                    }
                }
            } catch {
                if (!cancelled) {
                    setTrailerError('Could not load the trailer.');
                }
            } finally {
                if (!cancelled) {
                    setTrailerLoading(false);
                }
            }
        };

        fetchTrailer();

        return () => {
            cancelled = true;
        };



    }, [movieId]);

    if (!movie) return null

    const isSaved = myList.some(
        (savedMovie) => savedMovie.id === movie.id
    );

    const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

    const posterUrl = movie.poster_path
        ? `${IMAGE_BASE_URL}${movie.poster_path}`
        : null


    const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/w1280';

    const backdropUrl = movie.backdrop_path
        ? `${BACKDROP_BASE_URL}${movie.backdrop_path}`
        : null;

    return (
        <div className="dialog-backdrop" onClick={onClose}>
            <section
                className="movie-details"
                role="dialog"
                aria-modal="true"
                aria-labelledby="movie-details-title"
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    className="dialog-close"
                    onClick={onClose}
                    aria-label="Close movie details"
                >
                    <X size={22} />
                </button>

                {backdropUrl && (
                    <div className="details-backdrop">
                        <img
                            src={backdropUrl}
                            alt={`${movie.title} backdrop`}
                        />
                        <div className="details-backdrop-overlay" />
                    </div>
                )}


                {posterUrl && (
                    <img
                        className="details-poster"
                        src={posterUrl}
                        alt={`${movie.title} poster`}
                    />
                )}

                <div className="details-content">
                    <h2 id="movie-details-title">{movie.title}</h2>

                    <div className="details-meta">
                        <span>
                            <Star size={16} />
                            {Number(movie.vote_average).toFixed(1)}
                        </span>

                        <span>
                            <CalendarDays size={16} />
                            {movie.release_date
                                ? movie.release_date.slice(0, 4)
                                : 'Unknown'}
                        </span>
                    </div>

                    <h3>Overview</h3>
                    <p>
                        {movie.overview || 'No overview available for this movie.'}
                    </p>

                    <button
                        className="watchlist-button"
                        onClick={() => onToggleMyList(movie)}
                    >
                        {isSaved ? <Check size={20} /> : <Plus size={20} />}
                        {isSaved ? 'Added to My List' : 'Add to My List'}
                    </button>

                    {trailerLoading ? (
                        <button className="trailer-button" disabled>
                            <LoaderCircle size={20} className="spinner" />
                            Loading Trailer...
                        </button>
                    ) : trailer ? (
                        <button
                            className="trailer-button"
                            onClick={() => setShowTrailer(true)}
                        >
                            <Play size={20} />
                            Watch Trailer
                        </button>
                    ) : (
                        <p className="trailer-message">
                            {trailerError}
                        </p>
                    )}



                    {showTrailer && trailer && (
                        <div className="trailer-player">
                            <div className="trailer-player-header">
                                <h3>Now Playing: Trailer</h3>

                                <button
                                    className="trailer-close-button"
                                    onClick={() => {
                                        setShowTrailer(false);
                                        setTrailerError('');
                                    }}
                                    aria-label="Close trailer"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="trailer-video-wrapper">
                                <iframe
                                    src={`https://www.youtube-nocookie.com/embed/${trailer.key}?autoplay=1`}
                                    title={`${movie.title} trailer`}
                                    allow="autoplay; encrypted-media; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}

export default MovieDetails
