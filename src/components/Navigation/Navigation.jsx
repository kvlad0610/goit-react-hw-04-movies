import { NavLink } from 'react-router-dom';
import routes from '../../routes';
const Navigation = () => {
  return (
    <ul>
      <li>
        <NavLink to={routes.home}>Home</NavLink>
        <NavLink to={routes.movies}>Movies</NavLink>
      </li>
    </ul>
  );
};

export default Navigation;
