import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App";
import Breadcrumb from "./components/Breadcrumb/Breadcrumb";
import Layout from "./components/Layout";
import Post from "./components/Post";

import "./index.css";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<Layout>
		<BrowserRouter>
			<Breadcrumb />
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/post/:postId" element={<Post />} />
			</Routes>
		</BrowserRouter>
	</Layout>
);
