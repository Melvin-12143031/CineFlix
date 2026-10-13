
const Navbar = ({ activeTab, onNavigate }) => {
  return (
    <header className="navbar">
      <h1 className="logo">CINEFLIX</h1>

      <nav className="nav-links">
        <a
          href="#home"
          className={activeTab === 'home' ? 'active' : ''}
          aria-current={activeTab === 'home' ? 'page' : undefined}
          onClick={(event) => {
            event.preventDefault();
            onNavigate('home');
          }}
        >
          Home
        </a>

        <a
          href="#movies"
          className={activeTab === 'movies' ? 'active' : ''}
          aria-current={activeTab === 'movies' ? 'page' : undefined}
          onClick={(event) => {
            event.preventDefault();
            onNavigate('movies');
          }}
        >
          Movies
        </a>

        <a
          href="#my-list"
          className={activeTab === 'my-list' ? 'active' : ''}
          aria-current={activeTab === 'my-list' ? 'page' : undefined}
          onClick={(event) => {
            event.preventDefault();
            onNavigate('my-list');
          }}
        >
          My List
        </a>
      </nav>
    </header>
  );
};

export default Navbar;