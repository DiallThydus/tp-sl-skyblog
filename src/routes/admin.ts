import express from "express";
import {
  getAllUsers, deleteUser
} from "../handlers/admin";
import { isAdmin } from "../utils/auth";

const app = express.Router();

app.get("/usersList", isAdmin, getAllUsers)
app.delete("/:userId", isAdmin, deleteUser)

export default app