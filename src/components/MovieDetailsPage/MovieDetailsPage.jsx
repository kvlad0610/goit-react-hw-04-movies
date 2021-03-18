import axios from 'axios';
import { useState, useEffect } from 'react';
import { Route, NavLink } from 'react-router-dom';
import Cast from '../Cast/Cast';

const MovieDetailsPage = ({ match }) => {
  const [movieDetails, setMovieDetails] = useState([]);
  const movie_id = match.params.movieId;
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movie_id}?api_key=7806431bde1ba6e1fc4d430dc735ffb5&language=en-US`,
      )
      .then(({ data }) => setMovieDetails(data));
  }, [movie_id]);

  // const getMovies = async () => {
  //   const { data } = await axios.get(
  //     `https://api.themoviedb.org/3/movie/${movie_id}?api_key=7806431bde1ba6e1fc4d430dc735ffb5&language=en-US`,
  //   );
  //   return data;
  // };

  // useEffect(() => {
  //   getMovies().then(results => setMovieDetails({ ...results }));
  // }, []);
  console.log(movieDetails);

  return (
    <>
      <img
        src={'https://image.tmdb.org/t/p/w300' + movieDetails.poster_path}
        alt=""
      />
      <h1>
        {movieDetails.title}({movieDetails.release_date}){' '}
      </h1>
      <h2>Overview</h2>
      <p>{movieDetails.overview}</p>
      <h3>Genres</h3>
      <p>
        {movieDetails.genres
          ? movieDetails.genres.map(genre => `${genre.name} `)
          : null}
      </p>
      <div>
        <p>Additional information</p>
        <NavLink to={`${match.url}/cast`}>Cast</NavLink> <br />
        <NavLink to={`${match.url}/reviews`}>Reviews</NavLink>
      </div>
      <Route
        path={`${match.path}/cast`}
        render={() => {
          return <Cast id={movie_id} />;
        }}
      ></Route>
    </>
  );
};

export default MovieDetailsPage;
