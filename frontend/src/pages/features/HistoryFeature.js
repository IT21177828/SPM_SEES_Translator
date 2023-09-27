// TranslationHistory.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import deletelogo from "../../assets/delete.svg";
const HistoryFeature = ({ isOpen, onClose }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5050/history/getHistory")
      .then((response) => response.json())
      .then((data) => {
        setHistory(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:5050/history/deleteHistory/" + id)
      .then((res) => {
        // Remove the deleted item from the local state
        setHistory((prevHistory) =>
          prevHistory.filter((item) => item._id !== id)
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2 className="px-5 text-lg font-medium text-black dark:text-white">
        Translation History
      </h2>

      <div className="mt-8 space-y-4">
        <div>
          <ul className="list-none p-2 m-2">
            {history.map((item) => (
              <li key={item._id} className="translate-history-item pt-1">
                <div className="bg-blue-400 text-white p-2 flex justify-between items-center mb-2 rounded">
                  <h2 className="text-x1 opacity-70">
                    {item.inputLanguage} <span>&rarr;</span>{" "}
                    {item.outputLanguage}
                  </h2>
                  <img
                    className="h-5 w-5 filter invert opacity-80"
                    src={deletelogo}
                    alt="Delete"
                    onClick={(e) => handleDelete(item._id)}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <div className="original-text text-black opacity-50">
                  <strong>Original Text:</strong> {item.textToTranslate}
                </div>
                <div className="translated-text text-black opacity-50">
                  <strong>Translated Text:</strong> {item.translatedText}
                </div>
                <hr className="my-2 border-blue-500 mt-7 opacity-30" />{" "}
                {/* Separator line */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HistoryFeature;
