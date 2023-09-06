import React, { useEffect, useState } from 'react';
import TextBox from '../components/TextBox';
import Arrows from '../components/Arrows';
import Button from '../components/Button';
import FeedbackModal from '../components/FeedbackModal'; // Updated import
import axios from 'axios';

export default function Translate() {
  const [showModal, setShowModal] = useState(false);
  const [languages, setLanguages] = useState(null);
  const [inputLanguage, setInputLanguage] = useState('English');
  const [outputLanguage, setOutputLanguage] = useState('Sinhala');
  const [textToTranslate, setTextToTranslate] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [feedback, setFeedback] = useState({ englishWord: '', sinhalaWord: '', feedbackText: '' }); // Updated state

  const getLanguages = async () => {
    try {
      const response = await axios.get('http://localhost:5050/translate/languages');
      setLanguages(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getLanguages();
  }, []);

  const translate = async () => {
    try {
      const data = { textToTranslate, outputLanguage, inputLanguage };
      const response = await axios.get('http://localhost:5050/translate/translation', {
        params: data,
      });
      setTranslatedText(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = () => {
    setInputLanguage(outputLanguage);
    setOutputLanguage(inputLanguage);
    setTextToTranslate(translatedText);
    setTranslatedText('');
  };

  // Handle opening the feedback modal
  const handleFeedbackModalOpen = () => {
    setFeedback({ ...feedback, englishWord: textToTranslate, sinhalaWord: translatedText });
    setShowModal('feedback');
  };

  // Handle feedback submission
  const handleFeedbackSubmit = async () => {
    try {
      // Send the feedback data to the backend
      await axios.post('http://localhost:5050/feedback', feedback);
      // Clear the feedback form
      setFeedback({ englishWord: '', sinhalaWord: '', feedbackText: '' });
      setShowModal(false); // Close the feedback modal
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="app">
      {!showModal && (
        <>
          <TextBox
            style="input"
            setShowModal={setShowModal}
            selectedLanguage={inputLanguage}
            setTextToTranslate={setTextToTranslate}
            textToTranslate={textToTranslate}
            translatedText={translatedText}
            setTranslatedText={setTranslatedText}
          />
          <div className="arrow-container" onClick={handleClick}>
            <Arrows />
          </div>
          <TextBox
            style="output"
            setShowModal={setShowModal}
            selectedLanguage={outputLanguage}
            translatedText={translatedText}
          />
          <div className="button-container" onClick={translate}>
            <Button />
          </div>
          {/* Add a feedback button */}
          <button className="feedback-button" onClick={handleFeedbackModalOpen}>
            Provide Feedback
          </button>
        </>
      )}
      {showModal && (
        <FeedbackModal
          feedback={feedback}
          setFeedback={setFeedback}
          handleFeedbackSubmit={handleFeedbackSubmit}
        />
      )}
    </div>
  );
}
