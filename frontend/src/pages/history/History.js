import React, { useState , useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import historyLogo from '../../assets/history_logo.svg';
import timelogo from '../../assets/time.svg';
import binlogo from '../../assets/bin.svg';
import deletelogo from '../../assets/delete.svg';
import axios from 'axios';
const History = () => {

  const [showClearDataConfirmation, setShowClearDataConfirmation] = useState(false);


  // Get And Delete

  const [history , SetHistory] = useState ([])
  
    useEffect (() =>{
        axios.get('http://localhost:5050/history/getHistory')
        .then(result => SetHistory(result.data))
        .catch(err => console.log(err)) 
    },[])

    const handleDelete = (id) => {
      axios
        .delete('http://localhost:5050/history/deleteHistory/' + id)
        .then(res => {
          console.log(res);
          // Remove the deleted item from the local state
          SetHistory(prevHistory => prevHistory.filter(item => item._id !== id));
        })
        .catch(err => console.log(err));
    };
    

    // handleClick
  const [activeIndex, setActiveIndex] = useState(0);

  const handleDivClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const divs = [
    { text: 'Translator History', imgSrc: timelogo },
    { text: 'Clear Data', imgSrc: binlogo },
 
  ];

  const openClearDataConfirmation = () => {
    setShowClearDataConfirmation(true);
  };

  const closeClearDataConfirmation = () => {
    setShowClearDataConfirmation(false);
  };
  return (
    <div className='flex'>
    <div className=''>
    <div className='flex items-center '>
    <img src={historyLogo} alt='logo' className='w-10 m-4 ' />
        <h1 className="text-3xl font-bold text-blue-700"> History</h1>
    </div>
    {divs.map((div, index) => (
        <div
          key={index}
          className={`flex items-center w-80 rounded-tr-xl rounded-br-xl ${
            index === activeIndex ? 'bg-blue-200 text-blue-500' : ''
          }`}
          onClick={() => {
            if (index === 1) {
              openClearDataConfirmation();
            } else {
              handleDivClick(index);
            }
          }}
        >
          <img src={div.imgSrc} alt='logo' className={`w-6 m-4 ml-7 saturate-0 ${
              index === activeIndex ? 'text-blue-500 saturate-100' : 'text-red-500'
            }`}/>
          <h1 className='text-xl font-bold'>{div.text}</h1>
        </div>
      ))}
    </div>
    <div>
<div className='p-4 ml-30 mt-5 ' style={{ width: '800px' }}>
  <div className=' mx-auto ' style={{ width: '600px' }}>
    <input
      type='text'
      placeholder='Search'
      className='w-full h-10 p-2 rounded-xl border-2 border-blue-200 focus:outline-none focus:border-blue-500'
    />
  </div>
  <div className='flex items-center justify-between w-80 mx-auto mt-4' style={{ width: '600px' }}>
    <div style={{ height: '600px', overflowY: 'auto' }}>
    <table className='w-full text-left table-collapse'>
    <tbody>
        {history.map((historyItem, index) => (
          <tr key={index}>
            <td className='h-10'>{new Date(historyItem.createdAt).toLocaleString()}</td>
            <td className='h-10'>{historyItem.textToTranslate}</td>
            <td className='h-10 ' style={{ color: 'grey' }}>{historyItem.translatedText}</td>
            <td className='h-10'>{historyItem.inputLanguage} <span>&rarr;</span> {historyItem.outputLanguage}</td>
            <td className='h-10 w-5'>
            <img
              src={deletelogo}
              alt='Delete'
              onClick={(e) => handleDelete(historyItem._id)}
              style={{ cursor: 'pointer' }}
            />
            </td>
          </tr>
        ))}
      </tbody>
        </table>
    </div>
  </div>
</div>
    </div>
    {showClearDataConfirmation && (
        <ClearDataConfirmation
          onCancel={() => closeClearDataConfirmation()}
          onConfirm={() => {
            // Perform the clear data operation here
            // Once data is cleared, you can close the confirmation dialog
            closeClearDataConfirmation();
          }}
        />
      )}
    </div>
  )
}

export default History;


const ClearDataConfirmation = ({ onCancel, onConfirm }) => {
  const handleClearData = () => {
    
    axios
      .delete('http://localhost:5050/history/clearAllData')
      .then(res => {
        console.log(res);
        onConfirm(); 
      })
      .catch(err => {
        console.log(err);
        onCancel(); 
      });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg">
        <p className="text-lg">Are you sure you want to clear all data?</p>
        <div className="mt-4 flex justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mr-2"
            onClick={() => {
              onCancel();
            }}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => {
              handleClearData();
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
