// TranslationHistory.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import starlogo from '../../assets/star.svg';
const TranslationSaved = ({ isOpen, onClose }) => {
    const [savedWords, setSavedWords] = useState([]);

  const fetchData = () => {
    axios
      .get('http://localhost:5050/savedWord/getSavedWord')
      .then((response) => {
        setSavedWords(response.data);
      })
      .catch((error) => {
        console.error('Error fetching saved words:', error);
      });
  };

  
  useEffect(() => {
    fetchData(); 
    const intervalId = setInterval(() => {
      fetchData();
    }, 2000);

    
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleDelete = (id) => {
    axios
      .delete('http://localhost:5050/savedWord/deleteSavedWord/' + id)
      .then(res => {
        console.log(res);
        // Remove the deleted item from the local state
        setSavedWords(prevHistory => prevHistory.filter(item => item._id !== id));
      })
      .catch(err => console.log(err));
  };
  
  return (
    <div
      className={`${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } w-1/4 h-full fixed top-0 bg-white overflow-y-auto shadow-lg transition-transform duration-300 ease-in-out transform`}
    >
      <div className="bg-gray-800 text-white p-2 flex justify-between items-center">
        <h2 className="text-x1">Favourite</h2>
        <button className="text-white hover:underline" onClick={onClose}>
          X
        </button>
      </div>
      <ul className="list-none p-2 m-2">
        {savedWords.map((item) => (
          <li key={item._id} className="translate-history-item">
            <div className="bg-gray-400 text-white p-2 flex justify-between items-center">
        <h2 className="text-x1">{item.inputLanguage} <span>&rarr;</span> {item.outputLanguage}</h2>
        <img
              className='h-5 w-5'
              src={starlogo}
              alt='star'
              onClick={(e) => handleDelete(item._id)}
              style={{ cursor: 'pointer' }}
            />
      </div>
            <div className="original-text">
              <strong>Original Text:</strong> {item.textToTranslate}
            </div>
            <div className="translated-text">
              <strong>Translated Text:</strong> {item.translatedText}
            </div>
            
            

            <hr className="my-2 border-gray-300" /> {/* Separator line */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TranslationSaved;
