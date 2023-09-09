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


badWordRouter.get('/all', badWordController.index)
badWordRouter.get('/badpost', badWordController.getAllBWordsById)
badWordRouter.post('/word', badWordController.checkBword, badWordController.store)
badWordRouter.post('/a',badWordController.checkBword)
badWordRouter.delete('/a',badWordController.remove)

export default badWordRouter;
