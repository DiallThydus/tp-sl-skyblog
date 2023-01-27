import { Request } from "express";

export interface DeleteUser extends Request {
    params: {
      userId: string;
    };
}
