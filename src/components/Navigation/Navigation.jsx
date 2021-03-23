import { NavLink } from 'react-router-dom';
import routes from '../../routes';
import stiles from './Navigation.module.css';
const Navigation = () => {
  return (
    <div className={stiles.container}>
      <NavLink
        exact
        to={routes.home}
        className={stiles.link}
        activeClassName={stiles.link_active}
      >
        Home
      </NavLink>
      <NavLink
        to={routes.movies}
        className={stiles.link}
        activeClassName={stiles.link_active}
      >
        Movies
      </NavLink>
    </div>
  );
};

export default Navigation;
