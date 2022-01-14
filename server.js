const express = require("express");
const app = express();
require("dotenv").config();

const apiRoute = require("./src/routes/api");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoute);

app.get("*", (req, res) => {
  res.status(200).send("Index");
});

module.exports = app;
