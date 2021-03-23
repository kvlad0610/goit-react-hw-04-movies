import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const HomePage = ({ location }) => {
  const [movies, setMovies] = useState([]);
  console.log(movies);
  useEffect(() => {
    axios
      .get(
        'https://api.themoviedb.org/3/trending/all/day?api_key=7806431bde1ba6e1fc4d430dc735ffb5',
      )
      .then(({ data }) => setMovies(data.results));
  }, []);

  return (
    <>
      <h1>Trending today</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link
              to={{
                pathname: `/movies/${movie.id}`,
                // state: { from: location },
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

export default HomePage;
