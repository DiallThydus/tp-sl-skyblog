import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import Home from "./components/Home";
import Layout from "./components/Layout/Layout";
import Navbar from "./components/Navbar/Navbar";
import PageNotFound from "./components/PageNotFound";
import Post from "./components/Post/Post";
import Posts from "./components/Posts/Posts";

import "react-toastify/dist/ReactToastify.css";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Layout>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/post/:postId" element={<Post />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
    <ToastContainer />
  </Layout>
);
