import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './MoviesPage.module.css';
const queryString = require('query-string');

const MoviesPage = ({ history, location }) => {
  const [searchQuery, setSearchQuery] = useState(
    queryString.parse(location.search).query,
  );
  const [movies, setMovies] = useState(
    location.state ? location.state.movies : [],
  );
  console.log(movies);
  console.log(location);

  const handleChange = event => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    history.push({
      ...location,
      search: `?query=${searchQuery}`,
    });

    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=7806431bde1ba6e1fc4d430dc735ffb5&query=${searchQuery}&page=1?&language=en-US`,
      )
      .then(({ data }) => setMovies(data.results));
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          name="search"
          value={searchQuery}
          onChange={handleChange}
          placeholder="Please, Set your query"
          className={styles.input}
        />
        <button type="submit" onSubmit={handleSubmit} className={styles.button}>
          Search
        </button>
      </form>
      <ul>
        {movies &&
          movies.map(movie => (
            <li key={movie.id}>
              <Link
                to={{
                  pathname: `/movies/${String(movie.id)}`,
                  state: {
                    searchQuery,
                    movies,
                  },
                }}
              >
                {movie?.title || movie.name}
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
};

export default MoviesPage;
