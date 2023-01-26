import { Request, Response } from "express";
import { validationResult } from "express-validator";
import {
  GetOrDeletePost,
  GetPostByCreationDate,
  CreatePost,
  EditPost,
} from "../types/express/post";
import db from "../db";

export const getAllPosts = async (req: Request, res: Response) => {

  try {
    const allPosts = await db.post.findMany({
      orderBy: [
        {
          creation_date: "desc",
        },
      ],
    });

    return res.status(200).json({ posts: allPosts });
  } catch (e: any) {
    return res.status(400).json({ error: e.message });
  }
};

export const getPost = async (req: GetOrDeletePost, res: Response) => {
  const params = req.params;

  try {
    const getPost = await db.post.findFirstOrThrow({
      where: {
        id: params.postId,
      },
      include: {
        comment: true,
      },
    });

    return res.status(200).json({ post: getPost });
  } catch (e: any) {
    return res.status(400).json({ error: e.message });
  }
};

export const getPostByCreationDate = async (
  req: GetPostByCreationDate,
  res: Response
) => {
  const query = req.query
  const date = query.date
};

export const createNewPost = async (req: CreatePost, res: Response) => {
  const body = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newPost = await db.post.create({
      data: {
        title: body.title,
        body: body.body,
        authorId: req.user.id,
      },
    });

    return res.status(200).json({ post: newPost });
  } catch (e: any) {
    return res.status(400).json({ error: e.message });
  }
};

export const editPost = async (req: EditPost, res: Response) => {
  const body = req.body;
  const params = req.params;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const post = await db.post.findFirstOrThrow({
      where: {
        id: params.postId,
      },
    });

    if (post.authorId !== req.user.id) {
      return res
        .status(401)
        .json({ message: "Access denied: you're not the author" });
    }

    console.log(Date.now().toString())
    const updatedPost = await db.post.update({
      data: {
        title: body.title,
        body: body.body,
      },
      where: {
        id: post.id,
      },
    });

    return res.status(200).json({ post: updatedPost });
  } catch (e: any) {
    return res.status(400).json({ error: e.message });
  }
};

export const deletePost = async (req: GetOrDeletePost, res: Response) => {
  const params = req.params;

  try {
    const post = await db.post.findFirstOrThrow({
      where: {
        id: params.postId,
      },
    });

    if (post.authorId !== req.user.id) {
      return res
        .status(401)
        .json({ message: "Access denied: you're not the author" });
    }

    const deletedPost = await db.post.delete({
        where: {
          id: post.id,
        },
      });
      return res.status(200).json({message: "Post deleted with success"});
  } catch (e: any) {
    return res.status(400).json({ error: e.message });
  }
};
