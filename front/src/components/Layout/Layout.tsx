import { ReactNode } from "react";

import "./layout.css";

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<>
			<header className="hero-header">
				<h1>Skyblog</h1>
			</header>
			<div className="app">{children}</div>
		</>
	);
}
