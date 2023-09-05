import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "../db/conn.js";
import usermodel from "../models/usermodel.js";


const userRouter = express.Router();
const User = mongoose.model("user", usermodel);


const users = [];

userRouter.get("/", (req, res) => {
  res.send(users);
});

userRouter.post("/login", async (req, res) => {
  const user = users.find((user) => (user.name = req.body.name));
  if (user == null) {
    return res.status(400).send("cannot find user");
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      //generate access token
      const accessToken = jwt.sign(
        { username: user.name, password: user.password },
        "mySecretKey"
      );
      res.json({
        username: user.name,
        password: user.password,
        accessToken: accessToken,
      });
    } else {
      res.send("Not allowed");
    }
  } catch (error) {
    return res.status(500).send(error);
  }
});

userRouter.post("/", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    console.log(salt);
    console.log(hashPassword);

    const user = { name: req.body.name, password: hashPassword };

    users.push(user);

    res.status(201).send();
  } catch (error) {
    res.status(500).send();
  }
});

userRouter.get("/name", async (req, res) => {
    User.find()
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
    res.send("hello");
  });
  
  userRouter.post("/name", (req, res) => {
    const user = new User({
      name: req.body.name,
    });
    user
      .save()
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
    res.send("hello");
  });
  


export default userRouter;
