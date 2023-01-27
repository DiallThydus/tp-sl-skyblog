import { Request, Response } from "express";
import db from "../db";
import { DeleteUser } from "../types/express/admin";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await db.user.findMany({
      include: {
        _count: {
          select: {
            posts: true,
            comments: true,
          },
        },
      },
    });

    const usersSafe = users.map((user) => {
      const { token, password, ...userSafe } = user;
      return userSafe;
    });
    res.status(200).json({ users: usersSafe });
  } catch (e: any) {
    return res.status(400).json({ error: e.message });
  }
};

export const deleteUser = async (req: DeleteUser, res: Response) => {
  try {
    const user = await db.user.findFirstOrThrow({
      where: {
        id: req.params.userId,
      },
    });

    await db.user.delete({
      where: {
        id: user.id,
      },
    });
    return res.status(200).json({ message: "User deleted with success" });
  } catch (e: any) {
    return res.status(400).json({ error: e.message });
  }
};
