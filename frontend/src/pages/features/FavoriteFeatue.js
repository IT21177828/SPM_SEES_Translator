import React, { useState, useEffect } from "react";
import axios from "axios";
import { checkWordExistence } from "../../components/api";
const FavoriteFeatue = ({ isOpen, onClose }) => {
  const [savedWords, setSavedWords] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [editingItemId, setEditingItemId] = useState(null); // Track which item is being edited
  const [isWordSaved, setIsWordSaved] = useState(false);
  const handleEditClick = (id) => {
    setIsEditing(true);
    setEditingItemId(id);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    axios
      .put(`http://localhost:5050/savedWord/updateMessage/${editingItemId}`, {
        message,
      })
      .then((result) => {
        console.log(result);
        console.log(message);
        fetchData();
      })
      .catch((err) => {
        console.error("Error updating message:", err);
        // You can display an error message to the user here if needed
      });
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

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

  const handleDelete = (textToTranslate) => {
    axios
      .delete(
        `http://localhost:5050/savedWord/delete?textToTranslate=${textToTranslate}`
      )
      .then((res) => {
        console.log(res);
        // Remove the deleted item from the local state

        checkWordExistence(textToTranslate).then((exists) => {
          setIsWordSaved(exists);
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2 className="px-5 text-lg font-medium text-black dark:text-white">
        Favorite
      </h2>

      <ul className="list-none p-2 m-2">
        {savedWords.map((item) => (
          <div key={item._id}>
            <li className="translate-history-item">
              <div className="p-2 flex justify-between items-center mb-5 ">
                <div className="text-x1 bg-blue-400 text-white p-1 rounded">
                  {item.inputLanguage} <span>&rarr;</span> {item.outputLanguage}
                </div>
                <div onClick={() => handleDelete(item.textToTranslate)}>
                  <span
                    role="img"
                    aria-label="Filled Star"
                    style={{ cursor: "pointer", color: "orange" }}
                  >
                    ★
                  </span>
                </div>
              </div>

              <div className="original-text text-black opacity-50">
                <strong>Original Text:</strong> {item.textToTranslate}
              </div>
              <div className="translated-text text-black opacity-50">
                <strong>Translated Text:</strong> {item.translatedText}
              </div>
            </li>
            <div className="bg-white p-4 shadow rounded-lg">
              {isEditing && editingItemId === item._id ? (
                <>
                  <textarea
                    className="w-full min-h-[100px] border border-gray-300 p-2 rounded"
                    value={message}
                    onChange={handleChange}
                  />
                  <button
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={handleSaveClick}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <div className="whitespace-pre-wrap break-words">
                    <span className="text-black opacity-50">Note:</span>
                    <br />
                    {item.message}
                  </div>
                  <button
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => handleEditClick(item._id)}
                  >
                    Edit
                  </button>
                </>
              )}
            </div>
            <hr className="my-2 border-blue-500 mt-7 opacity-30" />{" "}
            {/* Separator line */}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteFeatue;
