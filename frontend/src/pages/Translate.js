import React, { useEffect, useState } from 'react';
import TextBox from '../components/TextBox';
import Arrows from '../components/Arrows';
import Button from '../components/Button';
import FeedbackModal from '../components/FeedbackModal'; // Updated import
import Modal from '../components/Modal'; // Updated import
import TranslationHistory from './history/TranslationHistory'; // Updated import
import TranslationSaved from './savedWord/TranslationSaved'; // Updated import
import axios from 'axios';

export default function Translate() {
  
  const [showModal, setShowModal] = useState(false)
  const [showDropdownModal, setShowDropdownModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showSavedModal, setShowSavedModal] = useState(false);
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
        
        const name = "Suppa";
      
        const content = {name, textToTranslate}
        await axios.post('http://localhost:5050/bad/word', {
          params: content
        })
        
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
    setShowFeedbackModal(true);
  };

 
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
    <div className=''>
    <header className="bg-blue-500 p-4 flex justify-between items-center md:px-8">
      <div className="flex items-center">
        <img
          src="user-icon.png" // Replace with your user icon URL
          alt="User Icon"
          className="w-8 h-8 rounded-full mr-2"
        />
        <span className="text-white font-semibold text-lg">
          John Doe {/* Replace with the user's name */}
        </span>
      </div>
      <button className="bg-white text-blue-500 py-2 px-4 rounded-lg hover:bg-blue-100 ">
        Sign In
      </button>
    </header>

    <div>

    </div>
    <div className="app">
      {!showDropdownModal && (
        <>
          <TextBox
            style="input"
            setShowModal={setShowDropdownModal}
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
            setShowModal={setShowDropdownModal}
            selectedLanguage={outputLanguage}
            translatedText={translatedText}
          />
          <div className="button-container" onClick={translate}>
            <Button />
          </div>
          {/* Add a feedback button */}
          <button className="feedback-button  " onClick={handleFeedbackModalOpen}>
            Provide Feedback
          </button>
          {/* Add a History button */}
          <div className="relative h-full">
  <button
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded h-10 absolute bottom-0 right-10  mr-1"
    onClick={() => setShowHistoryModal(true)}
  >
    History
  </button>
  
</div>
<div className="relative h-full">
  <button
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded h-10 absolute bottom-0 right-10  mr-16"
    onClick={() => setShowSavedModal(true)}
  >
    Favourite
  </button>
  
</div>

        </>
      )}
      {showDropdownModal && (
        <Modal
          showModal={showDropdownModal}
          setShowModal={setShowDropdownModal}
          languages={languages}
          chosenLanguage={inputLanguage}
          setChosenInLanguage={setInputLanguage}
          setChosenOutLanguage={setOutputLanguage}
        />
      )}
      {showFeedbackModal && (
        <FeedbackModal
          handleFeedbackModel = {setShowFeedbackModal}
          feedback={feedback}
          setFeedback={setFeedback}
          handleFeedbackSubmit={handleFeedbackSubmit}
        />
      )}
      {showHistoryModal && (
  <div className="history-modal ">
    <TranslationHistory isOpen={showHistoryModal} onClose={() => setShowHistoryModal(false)} />
  </div>
)}
{showSavedModal&& (
  <div className="favourite-modal ">
    <TranslationSaved isOpen={showSavedModal} onClose={() => setShowSavedModal(false)} />
  </div>
)}

    </div>

    </div>
  );
}