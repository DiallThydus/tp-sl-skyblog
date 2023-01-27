import { Request } from "express";

export interface CreateComment extends Request {
  body: {
    description: string;
    authorId: string;
    postId: string;
  };
}

export interface EditComment extends Request {
  params: {
    commentId: string;
  };
  body: {
    description: string;
  };
}

export interface DeleteComment extends Request {
  params: {
    commentId: string;
  };
}
