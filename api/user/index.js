const express = require("express");
const ctrl = require("./user.ctrl");

const userRouter = express.Router();

userRouter.get("/", ctrl.getUsers);

userRouter.get("/:id", ctrl.getUser);

userRouter.delete("/:id", ctrl.deleteUser);

userRouter.post("/", ctrl.createUser);

userRouter.put("/:id", ctrl.updateUser);

module.exports = userRouter;
