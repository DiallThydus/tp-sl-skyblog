import { RequestHandler } from "express";
import { validationResult } from "express-validator";

import db from "../db";
import { comparePassword, createJWT, hashPassword } from "../utils/auth";

import { User } from "@prisma/client";
import { SignInRequestParam, SignUpRequestParam } from "../types/express";

export const signUpUser: RequestHandler = async (
  req: SignUpRequestParam,
  res
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const body = req.body;
  try {
    const user = await db.user.findFirst({
      where: {
        OR: {
          username: body.username,
          email: body.email,
        },
      },
    });
    if (user) {
      throw new Error("Email or username already taken");
    }

    const hash = await hashPassword(body.password);

    await db.user.create({
      data: {
        username: body.username,
        password: hash,
        email: body.email,
      },
    });

    res.status(201).json({
      message: "Account created with success",
    });
  } catch (e: any) {
    res.status(400).json({
      error: {
        message: e?.message || "An error as occured (sign up)",
      },
    });
  }
};

export const signInUser: RequestHandler = async (
  req: SignInRequestParam,
  res
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await db.user.findUniqueOrThrow({
      where: {
        email: req.body.email,
      },
    });

    const correctPassword = await comparePassword(
      req.body.password,
      user.password
    );

    if (!correctPassword) {
      throw new Error("Invalid password");
    }

    const token = createJWT(user);
    await db.user.update({
      where: {
        email: user.email,
      },
      data: {
        token,
      },
    });
    res.cookie("userToken", token);

    res.status(201).json({
      message: "Connected",
      user: {
        ...getSafeUserData(user),
        token,
      },
    });
  } catch (e: any) {
    res.status(400).json({
      error: {
        message: e?.message || "An error as occured (sign in)",
      },
    });
  }
};

export function getSafeUserData(user: User) {
  const { id, password, ...userSafeData } = user;
  return userSafeData;
}
