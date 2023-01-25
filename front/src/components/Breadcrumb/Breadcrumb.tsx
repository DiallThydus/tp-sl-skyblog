import { useLocation } from "react-router-dom";

import "./breadcrumb.css";

export default function Breadcrumb() {
	const { pathname } = useLocation();
	return (
		<ul className="breadcrumb">
			{pathname === "/"
				? pathname
				: pathname.split("/").map((item, index) => (
						<li className="breadcumb-item">
							{index !== 0 && "/"} {item}
						</li>
				  ))}
		</ul>
	);
}
