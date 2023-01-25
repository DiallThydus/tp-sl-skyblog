import { Link } from "react-router-dom";

import "./navbar.css";

export default function Navbar() {
	return (
		<nav className="navbar">
			<ul>
				<li className="item">
					<Link to="/">Accueil</Link>
				</li>
				<li className="item">
					<Link to="/posts">Articles</Link>
				</li>
				<li className="item">
					<Link to="/signup">S'inscrire</Link>
				</li>
				<li className="item">
					<Link to="/signin">Se connecter</Link>
				</li>
			</ul>
		</nav>
	);
}
