import { Link } from "react-router-dom";

import "./navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li className="item">
          <Link to="/">Home</Link>
        </li>
        <li className="item">
          <Link to="/posts">Posts</Link>
        </li>
        <li className="item">
          <Link to="/signup">Sign Up</Link>
        </li>
        <li className="item">
          <Link to="/signin">Login</Link>
        </li>
      </ul>
    </nav>
  );
}
