const express = require("express");
const morgan = require("morgan");

const app = express();

const users = [
  { id: 1, name: "hello" },
  { id: 2, name: "My" },
  { id: 3, name: "Name" }
];

app.use(morgan("dev"));

app.get("/users", function(req, res) {
  req.query.limit = req.query.limit || 10;
  const limit = parseInt(req.query.limit, 10);

  if (Number.isNaN(limit)) {
    return res.status(400).end();
  }
  res.json(users.slice(0, limit));
});

app.listen(3000, function() {
  console.log("Server running!");
});

module.exports = app;
