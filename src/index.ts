import express from "express";

const PORT = process.env.PORT || 4000;
const app = express();

app.get("/", (_, res) => res.status(200).send({ hello: "world" }));

app.listen(PORT, () => console.log("Server started as :" + PORT));
