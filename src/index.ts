import express from "express";
import userRoutes from './routes/user';
import { protect } from "./utils/auth";
import * as dotenv from "dotenv";
dotenv.config()
const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json())

app.use("/user", [userRoutes]);

app.listen(PORT, () => console.log("Server started as :" + PORT));

