# 🎬 CineFlix

A cinematic movie discovery web application built with React and powered by The Movie Database (TMDB) API. Browse trending and popular movies, search for titles, explore genres, view movie details, watch available trailers, and save your favorites to your personal list.

🔗 **Live Demo:** [CineFlix](https://cineflix-gamma-ten.vercel.app/)

📂 **Source Code:** [GitHub Repository](https://github.com/Melvin-12143031/CineFlix)

## ✨ Features

* **Home Page** — Discover trending and popular movies.
* **Featured Movie Carousel** — Explore featured movies in a cinematic hero section.
* **Movie Browsing** — Browse movies with pagination.
* **Search** — Find movies by title.
* **Genre Filtering** — Explore movies by genre.
* **Movie Details** — View movie information and available trailers.
* **My List** — Save and remove movies from your personal list.
* **Local Storage** — Keep your saved movies between browser sessions.
* **Responsive Interface** — Browse CineFlix on different screen sizes.
* **TMDB Integration** — Retrieve up-to-date movie information from TMDB.

## 🛠️ Built With

* **React** — Component-based user interface.
* **Vite** — Development server and build tool.
* **JavaScript (ES6+)** — Application logic.
* **CSS3** — Styling and responsive layouts.
* **TMDB API** — Movie information, posters, and videos.
* **Lucide React** — Icons.
* **Vercel** — Hosting and server-side API functions.
* **Git and GitHub** — Version control and source code hosting.

## 🚀 Getting Started

### Prerequisites

* Node.js and npm
* A TMDB account with API access
* A Vercel account for running the server-side API locally and deploying the project

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Melvin-12143031/CineFlix.git
   ```

2. Navigate to the project directory:

   ```bash
   cd CineFlix
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

### Environment Variables

Create a `.env.local` file in the project root and add your TMDB API Read Access Token:

```env
TMDB_API_TOKEN=your_tmdb_api_read_access_token
```

Replace `your_tmdb_api_read_access_token` with your own token.

**Security:** Keep your token private. Do not commit `.env.local` or expose the token in frontend code. The server-side API function reads the token from the environment and uses it to communicate with TMDB.

### Run Locally

Install or use the Vercel CLI, then run:

```bash
npx vercel dev
```

This runs the application with Vercel's local development environment so the `/api/movies` server-side function can handle TMDB requests.

### Production Build

To check the frontend production build, run:

```bash
npm run build
```

To check code quality, run:

```bash
npm run lint
```

## 🔐 API Security

CineFlix communicates with TMDB through a Vercel server-side API function. The TMDB token is stored as the `TMDB_API_TOKEN` environment variable in Vercel rather than being intentionally exposed in the React application.

For deployment, configure `TMDB_API_TOKEN` in your Vercel project's Environment Variables and redeploy after changing it.

## 🎞️ Movie Data

Movie information and images are provided by [The Movie Database (TMDB)](https://www.themoviedb.org/).

This product uses the TMDB API but is not endorsed or certified by TMDB.

## 👨‍💻 About the Project

CineFlix is a personal portfolio project created to practice and demonstrate React development, reusable components, API integration, state management, client-side persistence, responsive UI design, and deployment.

---

**Built with ❤️ and React.**
