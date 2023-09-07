import React from 'react'
import { useEffect, useState } from 'react'
import TextBox from '../components/TextBox'
import Arrows from '../components/Arrows'
import Button from '../components/Button'
import Modal from '../components/Modal'
import axios from 'axios'

export default function Translate() {
    const [showModal, setShowModal] = useState(false)
    const [languages, setLanguages] = useState(null)
    const [inputLanguage, setInputLanguage] = useState('English')
    const [outputLanguage, setOutputLanguage] = useState('Sinhala')
    const [textToTranslate, setTextToTranslate] = useState('')
    const [translatedText, setTranslatedText] = useState('')
  
  
    const getLanguages = async () => {
  
     const response = await axios.get('http://localhost:5050/translate/languages')
    setLanguages(response.data)
     
    }
  
  
  
    useEffect(() => {
      getLanguages()
    }, [])
  
    // const translate = async () => {
  
  
    //   const data = { textToTranslate, outputLanguage, inputLanguage }
    //   const response = await axios.get('http://localhost:5050/translate/translation', { 
    //     params: data 
      
    //   })
    //   setTranslatedText(response.data)
    
  
   
    // }
    const translate = async () => {
      const data = { textToTranslate, outputLanguage, inputLanguage , translatedText};
      try {
        const response = await axios.get('http://localhost:5050/translate/translation', {
          params: data,
        });
        
        
        setTranslatedText(response.data);
        // Store the translation data in the database here if needed
        const dataToStore = { ...data, translatedText: response.data };
        
        storeTranslationData(dataToStore);
      } catch (error) {
        console.error('Error translating:', error);
      }
    };
  
    const handleClick = () => {
      setInputLanguage(outputLanguage)
      setOutputLanguage(inputLanguage)
    }

    //save hisotry
    const storeTranslationData = async (data) => {
      try {
        // Send a POST request to your server to store the translation data in the database
        await axios.post('http://localhost:5050/history/save', data);
        console.log('Translation data stored successfully');
      } catch (error) {
        console.error('Error storing translation data:', error);
      }
    };
  
    return (
      <div className="app">
        {!showModal && (
          <>
            <TextBox
              styles="input"
              setShowModal={setShowModal}
              selectedLanguage={inputLanguage}
              setTextToTranslate={setTextToTranslate}
              textToTranslate={textToTranslate}
              setTranslatedText={setTranslatedText}
            />
            <div className="arrow-container" onClick={handleClick}>
              <Arrows />
            </div>
            <TextBox
              styles="output"
              setShowModal={setShowModal}
              selectedLanguage={outputLanguage}
              translatedText={translatedText}
            />
            <div className="button-container" onClick={translate}>
              <Button />
            </div>
          </>
        )}
        {showModal && (
          <Modal
            showModal={showModal}
            setShowModal={setShowModal}
            languages={languages}
            chosenLanguage={
              showModal === 'input' ? inputLanguage : outputLanguage
            }
            setChosenLanguage={
              showModal === 'input' ? setInputLanguage : setOutputLanguage
            }
          />
        )}
      </div>
    )
}
