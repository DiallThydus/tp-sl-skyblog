import { Request } from "express";

export interface GetOrDeletePost extends Request {
    params: {
        postId: string;
    };
  }
  
  export interface GetPostByCreationDate extends Request {
    params: {
        timestamp: string;
    };
  }

  export interface CreatePost extends Request {
    body: {
        title: string;
        body: string;
        authorId: string
    }
  }

  export interface EditPost extends Request {
    params: {
        postId: string
    },
    body: {
        title: string;
        body: string;
    }
  }