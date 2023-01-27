import cors, { CorsOptions } from "cors";
import * as dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/user";
import postRoutes from "./routes/post";
import commentRoutes from "./routes/comment";

import { protect } from "./utils/auth";

dotenv.config();

const PORT = process.env.PORT || 4000;
const corsOptions = {
  origin: (_, callback) => callback(null, true),
  credentials: true,
} as CorsOptions;

const app = express();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use("/user", [userRoutes]);
app.use("/posts", protect, [postRoutes]);
app.use("/comments", protect, [commentRoutes]);

app.listen(PORT, () => console.log("Server started as :" + PORT));
