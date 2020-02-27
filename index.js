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
  res.json(users);
});

app.listen(3000, function() {
  console.log("Server running!");
});

module.exports = app;
