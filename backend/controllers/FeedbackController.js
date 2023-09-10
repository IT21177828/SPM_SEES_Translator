import mongoose from '../db/conn.js';
import Feedback from '../models/FeedbackModel.js';


export const FeedbackModel = mongoose.model("feedbackSchema", Feedback);

// Create feedback for translation
const createFeedbackForTranslation = async (req, res) => {


    const { englishWord, feedbackText , userId } = req.body;


    let newFeedbackModel = new FeedbackModel();

    newFeedbackModel.word = englishWord;
    newFeedbackModel.feedbackText = feedbackText;
    newFeedbackModel.userId = userId;
    newFeedbackModel.createdAt = new Date();
    

    newFeedbackModel.save().then((response)=>{

      res.send(response)

    }).catch ((error)=>{
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  })
};


// Get all feedback
const getAllFeedback = async (req, res) => {
  try {
    const feedback = await FeedbackModel.find(req.body);
    res.status(200).json(feedback);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



// Get feedback by ID
const getFeedbackById = async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = await FeedbackModel.findById(id);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.status(200).json(feedback);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }








};

// Update feedback by ID
export function updateFeedbackById(req, res){
  const { feedback } = req.body;

  FeedbackModel.updateOne({_id:req.params.id},{
    $set: {
      feedbackText: feedback

    },
}).then((result)=>{
    res.send(result)
}).catch((err)=>{
    res.status(500).json({message : "Something went wrong"})
})

};



// Delete feedback by ID
const deleteFeedbackById = async (req, res) => {

  FeedbackModel.deleteOne({ _id: req.params.id }).then((result) => {
      if (result.deletedCount === 0) {
          res.status(404).json({ message: "feedback not found" });

      } else {
          res.send(result);
      }
  }).catch((err) => {
      console.error(err); // Log the error for debugging
      res.status(500).json({ message: "Something went wrong" });
  });

};

export {
  createFeedbackForTranslation,
  getAllFeedback,
  getFeedbackById,
  deleteFeedbackById,
};
