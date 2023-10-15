import React, { useState } from 'react';

export default function FeedbackModal({ feedback, setFeedback, handleFeedbackSubmit, handleFeedbackModel }) {
  const { englishWord, sinhalaWord, feedbackText } = feedback;
  const [showAlert, setShowAlert] = useState(false);

  // Define a function to handle feedback text change
  const handleFeedbackTextChange = (e) => {
    if (e.target.value.length <= 100) {
      setFeedback({ ...feedback, feedbackText: e.target.value });
    }
    if (e.target.value.length > 50) {
      setShowAlert(true); // Show the alert when character limit is exceeded
    } else {
      setShowAlert(false); // Hide the alert when within the limit
    }
  };

  // Calculate the remaining characters
  const remainingCharacters = 50 - feedbackText.length;

  return (
    <div className="feedback-modal">
      <h2>Provide Feedback</h2>
      <div>
        <p>English Word: {englishWord}</p>
        <p>Sinhala Word: {sinhalaWord}</p>
      </div>
      <textarea
        rows="4"
        placeholder="Enter your feedback here..."
        value={feedbackText}
        onChange={handleFeedbackTextChange}
        style={{
          borderColor: showAlert ? 'red' : 'initial',
          color: showAlert ? 'red' : 'initial',
        }}
      />
      {showAlert && <p style={{ color: 'red' }}>Character limit exceeded</p>}
      <p>Remaining Characters: {remainingCharacters}</p> {/* Display remaining characters */}
      <div className="feedback-buttons">
        <button className="submit-button" onClick={handleFeedbackSubmit} disabled={feedbackText.length > 500}>
          Submit
        </button>
        <button className="back-button" onClick={() => {setFeedback({ englishWord: '', sinhalaWord: '', feedbackText: '' })
        handleFeedbackModel(false)
      }}>
          Back
        </button>
      </div>
    </div>
  );
}
