import { application, response } from "express";
import BadWordModel from "../models/BadWordsModel.js";
import { myPromises } from "../controllers/myPromise.js";

//show all list of B words

const index = (req, res, next) => {
  BadWordModel.find()
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((err) => {
      res.json({
        messsage: "An Error occured!",
      });
    });
};

const store = (req, res) => {
  const name = req.body.params.name;
  const textToTranslate = req.body.params.textToTranslate;

  if (!name || !textToTranslate) {
    return res.status(400).json({
      message: "Name and textToTranslate must be provided.",
    });
  }

  let badPhase = new BadWordModel({
    userID: name,
    badPhase: textToTranslate,
  });

  badPhase
    .save()
    .then((response) => {
      res.json({
        message: "post added successfully!",
      });
    })
    .catch((err) => {
      res.json({
        message: "An error occured!",
      });
    });
};

//detect B word

const checkBword = (req, res, next) => {
  const phase = req.body.params.textToTranslate;

  console.log(req.body);

  myPromises(phase)
    .then((result) => {
      console.log(result);
      if (result.hasBadWords) {
        next();
      } else res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(401).send("error occured!");
    });
};
const remove = (req, res) => {
  const wordID = req.body.ID;
  BadWordModel.findByIdAndDelete(wordID)
    .then(() => {
      res.json({
        message: "Post deleted success fully!",
      });
    })
    .catch(() => {
      res.json({
        message: "error ocured deleting!",
      });
    });
};

const getAllBWordsById = (req, res) => {
    // const id = req.body.params.id;
    const id = req.query.user;

    if(!id){
      return res.status(400).json({
        message: "Name and textToTranslate must be provided.",
      });
    }
    console.log(req.query)

    BadWordModel.find({userID: id}).sort({createdAt: -1})
    .then((response) => {        
        res.json({
            response
        })
    }).catch(() => {
        console.log("Error")
        res.json({
          message: "error ocured deleting!",
        })
    });
}

export default {
  index,
  store,
  checkBword,
  remove,
  getAllBWordsById
};
