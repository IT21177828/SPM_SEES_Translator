import mongoose from 'mongoose';

//create A Schema for bad words
const badWordsSchema = new mongoose.Schema({
    userID: {
        type: String
    },
    badPhase: {
        type: String
    } 

}, {timestamps: true})

//Create a model using badwords schema
const BadWordModel = mongoose.model('BadWordModel', badWordsSchema)
//export BadWordModel
export default BadWordModel;
