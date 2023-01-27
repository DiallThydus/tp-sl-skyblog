import { Link } from "react-router-dom";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import useUser from "../hooks/useUser";

import "./navbar.css";

export default function Navbar() {
  const { data: user } = useUser();
  return (
    <nav className="navbar">
      <ul className="nav-items">
        <li className="item">
          <Link to="/">Home</Link>
        </li>
        <li className="item">
          <Link to="/posts">Posts</Link>
        </li>
        {user ? (
          <li className="item">
            <Link to="/logout">Logout</Link>
          </li>
        ) : (
          <>
            <li className="item">
              <Link to="/signup">Sign Up</Link>
            </li>
            <li className="item">
              <Link to="/signin">Login</Link>
            </li>
          </>
        )}
      </ul>
      <Breadcrumb />
    </nav>
  );
}
