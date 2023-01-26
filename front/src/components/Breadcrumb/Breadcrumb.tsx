import { useLocation } from "react-router-dom";
import capitalizeFirstLetter from "../../utils/capitalize";

import "./breadcrumb.css";

export default function Breadcrumb() {
  const { pathname } = useLocation();

  const items = pathname.split("/");
  if (pathname !== "/") {
    // remove first "/"
    items.shift();
  }

  return (
    <ul className="breadcrumb">
      {pathname === "/" ? (
        <li className="breadcrumb-item">Home</li>
      ) : (
        items.map((item, index) => (
          <li className="breadcrumb-item" key={index}>
            {index !== 0 && index !== items.length - 1 ? "》" : ""}
            {capitalizeFirstLetter(item)}
          </li>
        ))
      )}
    </ul>
  );
}
