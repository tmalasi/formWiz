import { NavLink } from "react-router-dom";
import "./navbar.css"
const Navbar = () => {
  return (
    <nav className="layout_nav">
      <NavLink to="/" activeClassName="active">
        Home
      </NavLink>
      <NavLink to="/card" activeClassName="active">
        All CVs
      </NavLink>
    </nav>
  );
};
export default Navbar;
