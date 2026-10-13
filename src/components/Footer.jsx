
import './Footer.css';

const Footer = ({ onNavigate }) => {
    const handleNavigation = (tab) => {
        onNavigate(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-brand">
                    <button
                        className="footer-logo"
                        onClick={() => handleNavigation('home')}
                        aria-label="CineFlix home"
                    >
                        CINEFLIX
                    </button>

                    <p className="footer-tagline">
                        Stories worth staying up for.
                        <br />
                        Your next favorite movie starts here.
                    </p>
                </div>

                <nav className="footer-navigation" aria-label="Footer navigation">
                    <h3>Explore</h3>

                    <button onClick={() => handleNavigation('home')}>
                        Home
                    </button>

                    <button onClick={() => handleNavigation('movies')}>
                        Movies
                    </button>

                    <button onClick={() => handleNavigation('my-list')}>
                        My List
                    </button>
                </nav>
            </div>

            <div className="footer-bottom">
                <p>
                    © {new Date().getFullYear()} CineFlix
                </p>

                <p className="footer-attribution">
                    This product uses the TMDB API but is not endorsed or
                    certified by TMDB.
                </p>
            </div>
        </footer>
    );
};

export default Footer;