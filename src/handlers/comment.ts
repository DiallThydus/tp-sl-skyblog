import { Request, Response } from "express";
import { validationResult } from "express-validator";
import db from "../db";
import {
  CreateComment,
  EditComment,
  DeleteComment,
} from "../types/express/comment";

export const getAllComments = async (req: Request, res: Response) => {
  try {
    const comments = await db.comment.findMany({
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });

    res.status(200).json({ comments });
  } catch (e: any) {
    return res.status(400).json({ error: e.message });
  }
};

export const createNewComment = async (req: CreateComment, res: Response) => {
  const body = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const comment = await db.comment.create({
      data: {
        postId: body.postId,
        description: body.description,
        authorId: req.user.id,
      },
    });

    res.status(200).json({ comment });
  } catch (e: any) {
    return res.status(400).json({ error: e.message });
  }
};

export const editComment = async (req: EditComment, res: Response) => {
  const body = req.body;
  const params = req.params;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const comment = await db.comment.findFirstOrThrow({
      where: {
        id: params.commentId,
      },
    });

    if (comment.authorId !== req.user.id) {
      throw new Error("Access denied: you're not the author");
    }

    const updatedComment = await db.comment.update({
      data: {
        description: body.description
      },
      where: {
        id: comment.id,
      },
    });

    res.status(200).json({ comment: updatedComment });
  } catch (e: any) {
    return res.status(400).json({ error: e.message });
  }
};

export const deleteComment = async (req: DeleteComment, res: Response) => {
  const params = req.params;

  try {
    const comment = await db.comment.findFirstOrThrow({
      where: {
        id: params.commentId,
      },
    });

    if (comment.authorId !== req.user.id) {
      throw new Error("Access denied: you're not the author");
    }

    await db.comment.delete({
      where: {
        id: comment.id,
      },
    });
    return res.status(200).json({ message: "Post deleted with success" });
  } catch (e: any) {
    return res.status(400).json({ error: e.message });
  }
};
