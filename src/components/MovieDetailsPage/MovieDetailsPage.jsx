import axios from 'axios';
import { useState, useEffect } from 'react';
import { Route, NavLink } from 'react-router-dom';
import Cast from '../Cast/Cast';
import Reviews from '../Reviews/Reviews';
import routes from '../../routes';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = ({ match, location, history }) => {
  const [movieDetails, setMovieDetails] = useState([]);
  const movie_id = match.params.movieId;
  console.log(movie_id);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movie_id}?api_key=7806431bde1ba6e1fc4d430dc735ffb5&language=en-US`,
      )
      .then(({ data }) => setMovieDetails(data));
  }, [movie_id]);

  const handleGoBack = () => {
    if (location.state) {
      history.push({
        pathname: '/movies',
        search: `?query=${location.state.searchQuery}`,
        state: { movies: location.state.movies },
      });
    } else {
      history.push(routes.home);
    }
  };

  console.log(movieDetails);

  return (
    <>
      <button type="button" onClick={handleGoBack} className={styles.button}>
        Go back
      </button>

      <div className={styles.film_card}>
        <img
          src={'https://image.tmdb.org/t/p/w300' + movieDetails.poster_path}
          alt=""
        />
        <div className={styles.film_card_description}>
          <h1 className={styles.title}>
            {movieDetails.title} (
            {String(movieDetails.release_date).slice(0, 4)})
          </h1>
          <p>
            <span>User Score:</span> {movieDetails.vote_average * 10 + '%'}
          </p>
          <h2>Overview</h2>
          <p>{movieDetails.overview}</p>
          <h3>Genres</h3>
          <p>
            {movieDetails.genres
              ? movieDetails.genres.map(genre => `${genre.name} `)
              : null}
          </p>
        </div>
      </div>
      <div className={styles.label__additional}>
        <p>Additional information</p>
        <NavLink
          to={{
            pathname: `${match.url}/cast`,
            state: location?.state || null,
          }}
          className={styles.link}
          activeClassName={styles.link_active}
        >
          Cast
        </NavLink>{' '}
        <br />
        <NavLink
          to={{
            pathname: `${match.url}/reviews`,
            state: location?.state || null,
          }}
          className={styles.link}
          activeClassName={styles.link_active}
        >
          Reviews
        </NavLink>
      </div>
      <Route
        path={`${match.path}/cast`}
        render={() => {
          return <Cast id={movie_id} />;
        }}
      />
      <Route
        path={`${match.path}/reviews`}
        render={() => {
          return <Reviews id={movie_id} />;
        }}
      />
    </>
  );
};

export default MovieDetailsPage;
