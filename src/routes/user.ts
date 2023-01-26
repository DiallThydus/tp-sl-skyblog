import express from "express";
import { signUpUser, signInUser } from "../handlers/user";
import { body } from "express-validator";

const app = express.Router();

app.get("/", (req, res) => {
  res.send({ hello: "world" });
});

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
