import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<>
			<header>
				<h1>Skyblog</h1>
			</header>
			<div className="app">{children}</div>
		</>
	);
}
