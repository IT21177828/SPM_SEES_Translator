import React from 'react';

export default function FeedbackModal({ feedback, setFeedback, handleFeedbackSubmit }) {
  const { englishWord, sinhalaWord, feedbackText } = feedback;

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
        onChange={(e) => setFeedback({ ...feedback, feedbackText: e.target.value })}
      />
      <div className="feedback-buttons">
        <button className="submit-button" onClick={handleFeedbackSubmit}>
          Submit
        </button>
        <button className="back-button" onClick={() => setFeedback({ englishWord: '', sinhalaWord: '', feedbackText: '' })}>
          Back
        </button>
      </div>
    </div>
  );
}
