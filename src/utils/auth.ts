import { User } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import db from "../db";

export const createJWT = (user: User) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET as string
  );

  return token;
};

export const protect: RequestHandler = async (req, res, next) => {
  const cookie = req.cookies;
  const token = cookie?.userToken;

  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const user = await db.user.findFirstOrThrow({
      where: {
        token: token,
      },
    });
    req.user = user;

    return next();
  } catch (e) {
    return res.status(401).json({ message: "Not authorized" });
  }
};

export const isAdmin: RequestHandler = async (req, res, next) => {
  const cookie = req.cookies;
  const token = cookie?.userToken;

  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const user = await db.user.findFirstOrThrow({
      where: {
        token: token,
      },
    });
  
    if (user.role === "USER") {
      throw new Error("Access Denied")
    }

    return next();
  } catch(e: any){
    res.status(401).json({error: e.message})
  }
  
}

export const comparePassword = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 10);
};
