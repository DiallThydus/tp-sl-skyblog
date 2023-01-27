import { Request, Response } from "express";
import { validationResult } from "express-validator";
import db from "../db";
import {
  CreatePost,
  EditPost,
  GetOrDeletePost,
  GetPostByCreationDate,
} from "../types/express/post";

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await db.post.findMany({
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
      include: {
        author: true
      }
    });

    res.status(200).json({ posts });
  } catch (e: any) {
    return res.status(400).json({ error: e.message });
  }
};

export const getPost = async (req: GetOrDeletePost, res: Response) => {
  const params = req.params;

  try {
    const post = await db.post.findFirstOrThrow({
      where: {
        id: params.postId,
      },
      include: {
        comment: {
          include: {
            author: true
          }
        },
        author: true
      },
    });

    res.status(200).json({ post });
  } catch (e: any) {
    return res.status(400).json({ error: e.message });
  }
};

export const getPostByCreationDate = async (
  req: GetPostByCreationDate,
  res: Response
) => {};

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

    res.status(200).json({ post: newPost });
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
      throw new Error("Access denied: you're not the author");
    }

    const updatedPost = await db.post.update({
      data: {
        title: body.title,
        body: body.body,
      },
      where: {
        id: post.id,
      },
    });

    res.status(200).json({ post: updatedPost });
  } catch (e: any) {
    return res.status(400).json({ error: e.message });
  }
};

export const deletePost = async (req: GetOrDeletePost, res: Response) => {
  const params = req.params;
  const role = req.user.role
  
  try {
    const post = await db.post.findFirstOrThrow({
      where: {
        id: params.postId,
      },
    });

    if (role === "USER" && post.authorId !== req.user.id) {
      throw new Error("Access denied: you're not the author");
    }

    await db.post.delete({
      where: {
        id: post.id,
      },
    });
    return res.status(200).json({ message: "Post deleted with success" });
  } catch (e: any) {
    return res.status(400).json({ error: e.message });
  }
};
