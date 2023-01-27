import express from "express";
import { signUpUser, signInUser, getSafeUserData } from "../handlers/user";
import { body } from "express-validator";
import { protect } from "../utils/auth";
import { SafeUser } from "../types/express";
import db from "../db";

const app = express.Router();

app.get("/", protect, (req, res) => {
  const user: SafeUser | null = getSafeUserData(req.user);
  try {
    if (!user) {
      throw new Error("No user found");
    }

    return res.status(200).json({ user });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

app.get("/logout", protect, async (req, res) => {
  try {
    res.clearCookie("userToken");
    await db.user.update({
      data: {
        token: ''
      },
      where: {
        id: req.user.id
      }
    })
    res.status(200).json({message: "Disconnected with success"})
  } catch(e: any){
    res.status(500).json({error: e.message})
  }
})

app.post(
  "/signin",
  body("email").isEmail(),
  body("password").isString().isLength({ min: 8 }),
  signInUser
);

app.post(
  "/signup",
  body("email").isEmail(),
  body("username").isString().isLength({ min: 5, max: 64 }),
  body("password").isString().isLength({ min: 8 }),
  signUpUser
);

export default app;
