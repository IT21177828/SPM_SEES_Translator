import express from "express";
import BadWords from "bad-words";
import badWordController from '../controllers/badWordController.js';

const badWordRouter = express.Router();
const filter = new BadWords({ placeHolder: "X" });
filter.addWords("hank");

badWordRouter.get("/", (req, res) => {
  res.send("<h1>hey bad<h1>");
  console.log(filter.clean("Don't be a hank hell"));
});


const name = "අප්පට හැමනියන් බන් හැමනියන් සාන්ත මල්ලි වේසී";

badWordRouter.get('/all', badWordController.index)
badWordRouter.post('/word', badWordController.checkBword, badWordController.store)
badWordRouter.post('/a',badWordController.checkBword)
badWordRouter.delete('/a',badWordController.remove)

export default badWordRouter;
