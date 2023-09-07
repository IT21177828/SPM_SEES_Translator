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
      const data = { textToTranslate, outputLanguage, inputLanguage , translatedText};
      try {
        const response = await axios.get('http://localhost:5050/translate/translation', {
          params: data,
        });
        
        
        setTranslatedText(response.data);
       
        const dataToStore = { ...data, translatedText: response.data };
        
        storeTranslationData(dataToStore);
      } catch (error) {
        console.error('Error translating:', error);
      }
    };
  //Save History
  const storeTranslationData = async (data) => {
      try {
        
        await axios.post('http://localhost:5050/history/save', data);
        console.log('Translation data stored successfully');
      } catch (error) {
        console.error('Error storing translation data:', error);
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

  // Translate.js

// ...

// Handle feedback submission
const handleFeedbackSubmit = async () => {
  try {
    // Send the feedback data to the backend
    const feedbackData = {
      englishWord: feedback.englishWord,
      sinhalaWord: feedback.sinhalaWord,
      feedbackText: feedback.feedbackText,
    };
    const response = await axios.post('http://localhost:5050/feedback/translation', feedbackData); // Update the URL as needed

    // Check if the submission was successful
    if (response.status === 201) {
      console.log('Feedback submitted successfully.');
      // Clear the feedback form
      setFeedback({ englishWord: '', sinhalaWord: '', feedbackText: '' });
      setShowModal(false); // Close the feedback modal
    } else {
      console.log('Feedback submission failed.');
    }
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