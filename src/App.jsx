
import { useEffect, useState } from 'react';
import './App.css';

import {
  getPopularMovies,
  searchMovies,
  getMoviesByGenre,
  getTrendingMovies,
} from './services/movieService';

import MovieDetails from './components/MovieDetails';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import MyListPage from './pages/MyListPage';
import MoviesPage from './pages/MoviesPage';
import ClearMyListDialog from './components/ClearMyListDialog';

// Remove duplicate movies by ID before rendering them.
const uniqueMovies = (movies = []) => {
  const seenIds = new Set();

  return movies.filter((movie) => {
    if (!movie || movie.id == null || seenIds.has(movie.id)) {
      return false;
    }

    seenIds.add(movie.id);
    return true;
  });
};

const App = () => {
  // 1. State
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [heroIndex, setHeroIndex] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [showClearListDialog, setShowClearListDialog] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [myList, setMyList] = useState(() => {
    try {
      const savedList = localStorage.getItem('cineflix-my-list');
      const parsedList = savedList ? JSON.parse(savedList) : [];

      return Array.isArray(parsedList)
        ? uniqueMovies(parsedList)
        : [];
    } catch {
      return [];
    }
  });

  const heroMovies = trendingMovies.slice(0, 5);
  const featuredMovie = heroMovies[heroIndex];




  // 2. Fetch movies for the Movies tab
  useEffect(() => {
    if (activeTab !== 'movies') {
      return;
    }

    let cancelled = false;

    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError('');

        let data;

        if (search.trim()) {
          data = await searchMovies(search.trim(), page);

          // Apply the selected genre to the search results.
          if (selectedGenre !== 'all') {
            data.results = data.results.filter((movie) =>
              movie.genre_ids?.includes(Number(selectedGenre))
            );
          }
        } else if (selectedGenre !== 'all') {
          data = await getMoviesByGenre(selectedGenre, page);
        } else {
          data = await getPopularMovies(page);
        }

        if (cancelled) return;

        setMovies(uniqueMovies(data.results));
        setTotalPages(data.totalPages ?? 1);
      } catch (error) {
        if (!cancelled) {
          setError(error.message || 'Failed to load movies.');
          setMovies([]);
          setTotalPages(1);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchMovies();

    return () => {
      cancelled = true;
    };
  }, [page, search, selectedGenre, activeTab]);

  // 3. Fetch trending movies for Home
  useEffect(() => {
    let cancelled = false;

    const fetchTrendingMovies = async () => {
      try {
        const data = await getTrendingMovies(1);

        if (!cancelled) {
          setTrendingMovies(uniqueMovies(data.results));
        }
      } catch (error) {
        console.error('Failed to fetch trending movies:', error);
      }
    };

    fetchTrendingMovies();

    return () => {
      cancelled = true;
    };
  }, []);

  // 4. Fetch popular movies for Home
  useEffect(() => {
    let cancelled = false;

    const fetchPopularMovies = async () => {
      try {
        const data = await getPopularMovies(1);

        if (!cancelled) {
          setPopularMovies(uniqueMovies(data.results));
        }
      } catch (error) {
        console.error('Failed to fetch popular movies:', error);
      }
    };

    fetchPopularMovies();

    return () => {
      cancelled = true;
    };
  }, []);

  // 5. Save My List to localStorage
  useEffect(() => {
    localStorage.setItem(
      'cineflix-my-list',
      JSON.stringify(myList)
    );
  }, [myList]);

  // 6. Automatically rotate the featured movie
  useEffect(() => {
    if (heroMovies.length < 2) return;

    const timer = setInterval(() => {
      setHeroIndex(
        (currentIndex) => (currentIndex + 1) % heroMovies.length
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [heroMovies.length]);

  // 7. Navigation
  const handleNavigation = (tab) => {
    setActiveTab(tab);
    setSearch('');
    setSelectedGenre('all');
    setPage(1);
    setError('');
    setLoading(false);
  };

  // 8. Movie Details dialog handlers
  const handleOpenDetails = (movie) => {
    if (!movie) return;

    setSelectedMovie(movie);
  };

  const handleCloseDetails = () => {
    setSelectedMovie(null);
  };

  // 9. My List handlers
  const handleToggleMyList = (movie) => {
    if (!movie || movie.id == null) return;

    setMyList((currentList) => {
      const isSaved = currentList.some(
        (savedMovie) => savedMovie.id === movie.id
      );

      if (isSaved) {
        return currentList.filter(
          (savedMovie) => savedMovie.id !== movie.id
        );
      }

      return uniqueMovies([...currentList, movie]);
    });
  };

  const handleRemoveFromMyList = (movieId) => {
    setMyList((currentList) =>
      currentList.filter((movie) => movie.id !== movieId)
    );
  };



  const handleClearMyList = () => {
    setShowClearListDialog(true);
  };

  const handleConfirmClearMyList = () => {
    setMyList([]);
    setShowClearListDialog(false);
  };

  const handleCancelClearMyList = () => {
    setShowClearListDialog(false);
  };

  // 10. Filter displayed movies
  const moviesToDisplay =
    activeTab === 'my-list' ? myList : movies;

  const filteredMovies =
    activeTab === 'my-list'
      ? moviesToDisplay.filter((movie) => {
        const matchesSearch = movie.title
          ?.toLowerCase()
          .includes(search.toLowerCase());

        const matchesGenre =
          selectedGenre === 'all' ||
          movie.genre_ids?.includes(Number(selectedGenre));

        return matchesSearch && matchesGenre;
      })
      : moviesToDisplay;

  // 11. Render the app
  return (
    <div className="app">

      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        onNavigate={handleNavigation}
      />

      <main>
        {/* Home Page */}
        {activeTab === 'home' && (
          <HomePage
            trendingMovies={trendingMovies}
            popularMovies={popularMovies}
            heroMovies={heroMovies}
            featuredMovie={featuredMovie}
            heroIndex={heroIndex}
            setHeroIndex={setHeroIndex}
            myList={myList}
            onOpenDetails={handleOpenDetails}
            onToggleMyList={handleToggleMyList}
          />
        )}





        {/* Movies Page */}
        {activeTab === 'movies' && (
          <MoviesPage
            movies={filteredMovies}
            loading={loading}
            error={error}
            search={search}
            setSearch={(value) => {
              setSearch(value);
              setPage(1);
            }}
            selectedGenre={selectedGenre}
            setSelectedGenre={(value) => {
              setSelectedGenre(value);
              setPage(1);
            }}
            onOpenDetails={handleOpenDetails}
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}



        {/* My List Page */}
        {activeTab === 'my-list' && (


          <MyListPage
            myList={myList}
            onOpenDetails={handleOpenDetails}
            onRemoveFromMyList={handleRemoveFromMyList}
            onClearMyList={handleClearMyList}
          />
        )}
      </main>

      {/* Clear List Dialog */}
      {showClearListDialog && (
        <ClearMyListDialog
          onConfirm={handleConfirmClearMyList}
          onCancel={handleCancelClearMyList}
        />
      )}

      {/* Movie Details Dialog */}
      {selectedMovie && (
        <MovieDetails
          key={selectedMovie.id}
          movie={selectedMovie}
          onClose={handleCloseDetails}
          onToggleMyList={handleToggleMyList}
          myList={myList}
        />
      )}

      <Footer onNavigate={handleNavigation} />
    </div>
  );
};

export default App;