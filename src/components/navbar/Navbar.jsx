import { NavLink } from "react-router-dom";
import "./navbar.css"
const Navbar = () => {
  return (
    <nav className="layout_nav">
      <NavLink to="/" >
        Home
      </NavLink>
      <NavLink to="/card">
        All CVs
      </NavLink>
    </nav>
  );
};
export default Navbar;
