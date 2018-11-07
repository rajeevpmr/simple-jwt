const express = require("express");
const app = express();

const parser = require("body-parser");
app.use(parser.json());

const jwt = require("express-jwt");

const authenticate = jwt({
  secret: "newKey"
});

app.get("/testing", (req, res) => {
  res.status(200).send(`This is working, a simple NodeJS Page!`);
});

app.get("/public", (req, res) => {
  res.status(200).send("Welcome to the public page! No Login needed");
});

app.get("/private", authenticate, (req, res) => {
  res.status(200).send("Yay!!! You are in!");
});

app.get("*", (req, res) => {
  res.sendStatus(403);
});

app.listen(8081, () => {
  console.log(`Server is running on port 8081.`);
});
