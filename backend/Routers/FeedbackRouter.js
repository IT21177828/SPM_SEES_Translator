import express from 'express';
import {
  createFeedbackForTranslation,
  getAllFeedback,
  getFeedbackById,
  updateFeedbackById,
  deleteFeedbackById,
} from '../controllers/FeedbackController.js';

const feedbackRouter = express.Router();

// Create new feedback for translation
feedbackRouter.post('/translation', createFeedbackForTranslation);

// Get all feedback
feedbackRouter.get('/', getAllFeedback);

// Get feedback by ID
feedbackRouter.get('/:id', getFeedbackById);

// Update feedback by ID
feedbackRouter.put('/update/:id', updateFeedbackById);

// Delete feedback by ID
feedbackRouter.delete('/delete/:id', deleteFeedbackById);

export default feedbackRouter;
