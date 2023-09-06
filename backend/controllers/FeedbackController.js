import Feedback from '../models/FeedbackModel.js';



// Create feedback
const createFeedback = async (req, res) => {
  try {
    const { feedbackText } = req.body;
    const feedback = new Feedback({ feedbackText });
    const savedFeedback = await feedback.save();
    res.status(201).json(savedFeedback);
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

// Update feedback
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

// Delete feedback
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

export { createFeedback, getAllFeedback, getFeedbackById, updateFeedbackById, deleteFeedbackById };
