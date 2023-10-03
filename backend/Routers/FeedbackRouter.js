import express from "express";
import {
  createFeedbackForTranslation,
  getAllFeedback,
  getFeedbackById,
  updateFeedbackById,
  deleteFeedbackById,
} from "../controllers/FeedbackController.js";
import userController from "../controllers/userController.js";

const feedbackRouter = express.Router();

// Create new feedback for translation
feedbackRouter.post(
  "/translation",
  userController.verify,
  createFeedbackForTranslation
);

// Get all feedback
feedbackRouter.get("/", getAllFeedback);

// Get feedback by ID
feedbackRouter.get("/user", userController.verify, getFeedbackById);

// Update feedback by ID
feedbackRouter.put("/update/:id", userController.verify, updateFeedbackById);

// Delete feedback by ID
feedbackRouter.delete("/delete/:id", userController.verify, deleteFeedbackById);

export default feedbackRouter;
