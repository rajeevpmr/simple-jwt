const express = require("express");
const app = express();

const parser = require("body-parser");
app.use(parser.json());

const jwt = require("jsonwebtoken");

const users = [
  { id: 1, username: "dexter", password: "12345" },
  { id: 2, username: "peppa", password: "12345" }
];

app.get("/testing", (req, res) => {
  res.status(200).send(`This is working, a simple NodeJS Page!`);
});

app.get("*", (req, res) => {
  res.sendStatus(403);
});

app.listen(8080, () => {
  console.log(`Server is running on port 8080.`);
});

app.post("/login", (req, res) => {
  if (!req.body.username || !req.body.password) {
    res
      .status(400)
      .send("Invalid Credentials");
    return;
  }

  const user = users.find(u => {
    return u.username === req.body.username && u.password === req.body.password;
  });

  if (!user) {
    res
      .status(400)
      .send("Invalid Credentials");
    return;
  }

  const token = jwt.sign(
    {
      sub: user.id,
      username: user.username
    },
    "newKey",
    { expiresIn: "1 hours" }
  );
  res.status(200).send({ access_token: token });
});
