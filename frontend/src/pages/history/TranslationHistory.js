// TranslationHistory.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import deletelogo from '../../assets/delete.svg';
const TranslationHistory = ({ isOpen, onClose }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    console.log("Fetching translation history...");
    fetch('http://localhost:5050/history/getHistory')
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setHistory(data);
      })
      .catch((error) => console.error(error));
  }, []);
  
  const handleDelete = (id) => {
    axios
      .delete('http://localhost:5050/history/deleteHistory/' + id)
      .then(res => {
        console.log(res);
        // Remove the deleted item from the local state
        setHistory(prevHistory => prevHistory.filter(item => item._id !== id));
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
        <h2 className="text-x1">Translation History</h2>
        <button className="text-white hover:underline" onClick={onClose}>
          X
        </button>
      </div>
      <ul className="list-none p-2 m-2">
        {history.map((item) => (
          <li key={item._id} className="translate-history-item">
            <div className="bg-gray-400 text-white p-2 flex justify-between items-center">
        <h2 className="text-x1">{item.inputLanguage} <span>&rarr;</span> {item.outputLanguage}</h2>
        <img
              className='h-5 w-5'
              src={deletelogo}
              alt='Delete'
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

export default TranslationHistory;
