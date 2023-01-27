import express from "express";
import { body } from "express-validator";
import {
  createNewComment,
  deleteComment,
  editComment,
  getAllComments,
} from "../handlers/comment";

const app = express.Router();

// getAllComments
app.get("/", getAllComments);

// createComment
app.post(
  "/create",
  body("description").isString().notEmpty(),
  body("postId").isString().notEmpty(),
  createNewComment
);

// editComment
app.put("/:commentId", body("description").isString().notEmpty(), editComment);

// deleteComment
app.delete("/:commentId", deleteComment);

export default app;
