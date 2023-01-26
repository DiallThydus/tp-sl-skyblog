import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import Breadcrumb from "./components/Breadcrumb/Breadcrumb";
import Home from "./components/Home";
import Layout from "./components/Layout/Layout";
import Navbar from "./components/Navbar/Navbar";
import PageNotFound from "./components/PageNotFound";
import Post from "./components/Post";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Layout>
    <BrowserRouter>
      <Navbar />
      <Breadcrumb />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:postId" element={<Post />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
    <ToastContainer />
  </Layout>
);
