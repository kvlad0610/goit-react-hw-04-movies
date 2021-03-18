import { NavLink } from 'react-router-dom';
const Navigation = () => {
  return (
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/movies">Movies</NavLink>
      </li>
    </ul>
  );
};

export default Navigation;
