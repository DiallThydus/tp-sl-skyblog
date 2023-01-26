import express from "express";
import { body } from "express-validator";
import {
  createNewPost,
  deletePost,
  editPost,
  getAllPosts,
  getPost,
  getPostByCreationDate,
} from "../handlers/post";

const app = express.Router();

// getAllPosts
app.get("/", getAllPosts);

// getPost
app.get("/:postId", getPost);

// getPostByCreationDate
app.get("/:timestamp", getPostByCreationDate);

// createPost
app.post(
  "/create",
  body("title").isString().notEmpty(),
  body("body").isString().notEmpty(),
  createNewPost
);

// editPost
app.put(
  "/edit/:postId",
  body("title").isString().notEmpty(),
  body("body").isString().notEmpty(),
  editPost
);

// deletePost
app.delete("/delete/:postId", deletePost);

export default app;
