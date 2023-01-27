import ReactDOM from "react-dom/client";
import { QueryClientProvider, useQuery } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Layout from "./components/Layout/Layout";
import Navbar from "./components/Navbar/Navbar";

import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";

import PostCreate from "./components/Post/Create/PostCreate";
import PostEdit from "./components/Post/Edit/PostEdit";
import Post from "./components/Post/Post";
import Posts from "./components/Posts/Posts";

import ProtectedRoute from "./components/ProtectedRoute";
import RestrictedRoute from "./components/RestrictedRoute";

import { queryClient } from "./lib/queryCient";

import "react-toastify/dist/ReactToastify.css";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);

function App() {
  const { data: user } = useQuery("user");
  return (
    <Layout>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/posts"
            element={
              <ProtectedRoute>
                <Posts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/post/create"
            element={
              <ProtectedRoute>
                <PostCreate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/post/:postId"
            element={
              <ProtectedRoute>
                <Post />
              </ProtectedRoute>
            }
          />
          <Route
            path="/post/:postId/edit"
            element={
              <ProtectedRoute>
                <PostEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <RestrictedRoute to="/" exists={[user]}>
                <SignUp />
              </RestrictedRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <RestrictedRoute to="/" exists={[user]}>
                <SignIn />
              </RestrictedRoute>
            }
          />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer toastClassName={"toast-item"} />
    </Layout>
  );
}
