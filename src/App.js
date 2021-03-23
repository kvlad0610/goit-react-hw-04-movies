import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import AppBar from './components/AppBar/AppBar';
import routes from './routes';
import './index.css';

const HomePage = lazy(() =>
  import('./components/HomePage/HomePage' /*WebpackChunkName: "home-page"*/),
);
const MoviesPage = lazy(() =>
  import(
    './components/MoviesPage/MoviesPage' /*WebpackChunkName: "movies-page"*/
  ),
);
const MovieDetailsPage = lazy(() =>
  import(
    './components/MovieDetailsPage/MovieDetailsPage' /*WebpackChunkName: "movie-details-page"*/
  ),
);

function App() {
  return (
    <>
      <AppBar />

      <Suspense fallback={<h1>Load...</h1>}>
        <Switch>
          <Route path={routes.home} exact component={HomePage} />
          <Route path={routes.moviesDetails} component={MovieDetailsPage} />
          <Route path={routes.movies} component={MoviesPage} />
        </Switch>
      </Suspense>
    </>
  );
}

export default App;
