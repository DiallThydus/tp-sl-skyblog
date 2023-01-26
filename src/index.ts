import cors, { CorsOptions } from "cors";
import * as dotenv from "dotenv";
import express from "express";

import userRoutes from "./routes/user";

dotenv.config();

const PORT = process.env.PORT || 4000;
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
} as CorsOptions;

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use("/user", [userRoutes]);

app.listen(PORT, () => console.log("Server started as :" + PORT));
