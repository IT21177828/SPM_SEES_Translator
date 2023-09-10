import Feedback from '../models/FeedbackModel.js';

// Create feedback for translation
const createFeedbackForTranslation = async (req, res) => {
  try {
    const { englishWord, sinhalaWord, feedbackText } = req.body;
    const feedback = new Feedback({ word: englishWord, sword: sinhalaWord, feedbackText, userId: "req.user.id" });
    console.log(feedback)
    // Save the feedback to the database
    const savedFeedback = await feedback.save()
    .then((resp) => {
      res.status(201).json(resp);
    })

    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all feedback
const getAllFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find();
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
    const feedback = await Feedback.findById(id);
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
const updateFeedbackById = async (req, res) => {
  try {
    const { id } = req.params;
    const { feedbackText } = req.body;
    const updatedFeedback = await Feedback.findByIdAndUpdate(id, { feedbackText }, { new: true });
    if (!updatedFeedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.status(200).json(updatedFeedback);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete feedback by ID
const deleteFeedbackById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFeedback = await Feedback.findByIdAndRemove(id);
    if (!deletedFeedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.status(200).json({ message: 'Feedback deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export {
  createFeedbackForTranslation,
  getAllFeedback,
  getFeedbackById,
  updateFeedbackById,
  deleteFeedbackById,
};
