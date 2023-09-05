import { application, response } from 'express';
import BadWordModel from '../models/BadWordsModel.js';
import { myPromises } from "../controllers/myPromise.js";

//show all list of B words

const index = (req, res, next) => {
    BadWordModel.find().then(response => {
        res.json({
            response
        })
    }).catch(err => {
        res.json({
            messsage: "An Error occured!"
        })
    })
}

const store = (req, res) => {
    let badPhase = new BadWordModel({
        userId: req.body.name,
        badPhase: req.body.searchPhase
    })
    
    badPhase.save()
    .then(response => {       
        res.json({
            message: "post added successfully!"
        })
    })
    .catch(err => {
        res.json({
            message: "An error occured!"
        })
    })
}

//detect B word


const checkBword = (req, res, next) => {

    const phase = req.body.searchPhase

    console.log(req.body)

    myPromises(phase)
      .then((result) => {
        console.log(result);
        if(result.hasBadWords){
            console.log('inside if')
            next();
        }else res.send(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(401).send("error occured!");
      });

}
const remove = (req, res) =>{
    const wordID = req.body.ID
    BadWordModel.findByIdAndDelete(wordID)
    .then(() => {
        res.json({
           message: "Post deleted success fully!" 
        })
    })
    .catch(() =>{
        res.json({
            message: "error ocured deleting!"
        })
    })
}

export default {
    index, store, checkBword, remove
}
