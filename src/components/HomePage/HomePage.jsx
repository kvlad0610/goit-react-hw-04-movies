import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const HomePage = ({ match }) => {
  const [movies, setMovies] = useState([]);
  console.log(movies);
  useEffect(() => {
    axios
      .get(
        'https://api.themoviedb.org/3/trending/all/day?api_key=7806431bde1ba6e1fc4d430dc735ffb5',
      )
      .then(({ data }) => setMovies(data.results));
  }, []);

  // const getMovies = async () => {
  //   const { data } = await axios.get(
  //     'https://api.themoviedb.org/3/trending/all/day?api_key=7806431bde1ba6e1fc4d430dc735ffb5',
  //   );
  //   return data.results;
  // };

  // useEffect(() => {
  //   getMovies().then(results => setMovies(results));
  // }, []);

  return (
    <>
      <h1>Trending today</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default HomePage;
