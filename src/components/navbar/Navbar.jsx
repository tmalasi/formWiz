import { NavLink } from "react-router-dom";
import "./navbar.css"
const Navbar = () => {
  return (
    <nav className="layout_nav">
      <NavLink to="/" className="active">
        Home
      </NavLink>
      <NavLink to="/card" className="active">
        All CVs
      </NavLink>
    </nav>
  );
};
export default Navbar;
