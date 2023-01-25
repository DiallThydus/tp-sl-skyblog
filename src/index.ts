import express from "express";

const PORT = process.env.PORT || 3000;
const app = express();

app.get("/", (_, res) => res.status(200).send({ hello: "world" }));

app.listen(PORT, () => console.log("Server started as :" + PORT));
