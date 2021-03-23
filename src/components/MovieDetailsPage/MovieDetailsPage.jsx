import axios from 'axios';
import { useState, useEffect } from 'react';
import { Route, NavLink } from 'react-router-dom';
import Cast from '../Cast/Cast';
import Reviews from '../Reviews/Reviews';
import routes from '../../routes';

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
    // if (location.state && location.state.from) {
    //   history.push(location.state.from);
    // }
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
      <div>
        <button type="button" onClick={handleGoBack}>
          Go back
        </button>
      </div>
      <div className="film-card">
        <img
          src={'https://image.tmdb.org/t/p/w300' + movieDetails.poster_path}
          alt=""
        />
        <div className="film-card-description">
          <h1>
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
      <div className="information">
        <p>Additional information</p>
        {location.state ? (
          <>
            <NavLink
              to={{
                pathname: `${match.url}/cast`,
                state: {
                  searchQuery: location.state.searchQuery,
                  movies: location.state.movies,
                },
              }}
            >
              Cast
            </NavLink>{' '}
            <br />
            <NavLink
              to={{
                pathname: `${match.url}/reviews`,
                state: {
                  searchQuery: location.state.searchQuery,
                  movies: location.state.movies,
                },
              }}
            >
              Reviews
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to={`${match.url}/cast`}>Cast</NavLink> <br />
            <NavLink to={`${match.url}/reviews`}>Reviews</NavLink>
          </>
        )}
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
