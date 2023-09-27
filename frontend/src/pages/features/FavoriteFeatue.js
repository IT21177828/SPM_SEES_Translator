// TranslationHistory.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import starlogo from "../../assets/star.svg";
const FavoriteFeatue = ({ isOpen, onClose }) => {
  const [savedWords, setSavedWords] = useState([]);

  const fetchData = () => {
    axios
      .get("http://localhost:5050/savedWord/getSavedWord")
      .then((response) => {
        setSavedWords(response.data);
      })
      .catch((error) => {
        console.error("Error fetching saved words:", error);
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
      .delete("http://localhost:5050/savedWord/deleteSavedWord/" + id)
      .then((res) => {
        console.log(res);
        // Remove the deleted item from the local state
        setSavedWords((prevHistory) =>
          prevHistory.filter((item) => item._id !== id)
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2 className="px-5 text-lg font-medium text-black dark:text-white">
        Favourite
      </h2>

      <ul className="list-none p-2 m-2">
        {savedWords.map((item) => (
          <li key={item._id} className="translate-history-item">
            <div className="bg-blue-400 text-white p-2 flex justify-between items-center mb-5 ">
              <h2 className="text-x1">
                {item.inputLanguage} <span>&rarr;</span> {item.outputLanguage}
              </h2>
              {/* <img
                className="h-5 w-5"
                src={starlogo}
                alt="star"
                onClick={(e) => handleDelete(item._id)}
                style={{ cursor: "pointer" }}
              /> */}
              <div onClick={(e) => handleDelete(item._id)}>
                <span
                  role="img"
                  aria-label="Filled Star"
                  style={{ cursor: "pointer" }}
                >
                  ⭐️
                </span>
              </div>
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
  );
};

export default FavoriteFeatue;
