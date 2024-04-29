const express = require("express");
const Body_parser = require("body-parser");
const userRouter = require("./routers/userRouter");

const app = express();

app.use(Body_parser.json());

app.use("/", userRouter);

module.exports = app;
