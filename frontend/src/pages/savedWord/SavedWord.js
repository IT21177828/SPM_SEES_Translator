import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import deletelogo from '../../assets/delete.svg';
const SavedWords = () => {
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
      
        setSavedWords(prevHistory => prevHistory.filter(item => item._id !== id));
      })
      .catch(err => console.log(err));
  };
  return (
    <div className='table flex items-center justify-between w-80 mx-auto mt-4' style={{ width: '600px' }}>
    <div style={{ height: '600px', overflowY: 'auto' }}>
    <table className='w-full text-left table-collapse'>
    <tbody>
        {savedWords.map((saved, index) => (
          <tr key={index}>
            <td className='h-10'>{new Date(saved.createdAt).toLocaleString()}</td>
            <td className='h-10'>{saved.textToTranslate}</td>
            <td className='h-10 ' style={{ color: 'grey' }}>{saved.translatedText}</td>
            <td className='h-10'>{saved.inputLanguage} <span>&rarr;</span> {saved.outputLanguage}</td>
            <td className='h-10 w-5'>
            <img
              src={deletelogo}
              alt='Delete'
              onClick={(e) => handleDelete(saved._id)}
              style={{ cursor: 'pointer' }}
            />
            </td>
          </tr>
        ))}
      </tbody>
        </table>
    </div>
  </div>
  );
};

export default SavedWords;
