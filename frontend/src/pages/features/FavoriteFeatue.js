// TranslationHistory.js
import React, { useState, useEffect } from "react";
import axios from "axios";

import { checkWordExistence } from "../../components/api";
const FavoriteFeatue = (userId) => {
  const [savedWords, setSavedWords] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [editingItemId, setEditingItemId] = useState(null); // Track which item is being edited
  const [isWordSaved, setIsWordSaved] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredWords, setFilteredWords] = useState([]);
  const user = userId.userId;
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
        getDetails();
      })
      .catch((err) => {
        console.error("Error updating message:", err);
        // You can display an error message to the user here if needed
      });
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };


  async function getDetails() {
    const id = { user };

    try {
      console.log(id);
      const posts = await axios
        .get("http://localhost:5050/savedWord/getSavedWord", {
          params: id,
        })

        .then((response) => {
          setSavedWords(response.data.response);
          console.log(response);
        })
        .catch((err) => {
          console.log(err.response?.data?.message);
        });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const refreshInterval = 1000; // 10 seconds in milliseconds

    const fetchData = async () => {
      try {
        await getDetails();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Fetch data immediately when the component mounts

    const intervalId = setInterval(fetchData, refreshInterval); // Set up the interval

    return () => clearInterval(intervalId); // Clean up the interval when the component unmounts
  }, []);


  const handleDelete = (textToTranslate) => {
    // Show a confirmation dialog
    const confirmation = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (confirmation) {
      // User clicked "OK," proceed with the deletion
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
    } else {
      // User clicked "Cancel," do nothing
      console.log("Deletion canceled.");
    }
  };

  return (
    <div>
      <h2 className="px-5 text-lg font-medium text-white dark:text-white">
        Favourite
      </h2>

      <input
        type="text"
        placeholder="Search"
        className="w-80 ml-4 p-2 rounded-md border border-gray-300 mx-auto"
        value={searchQuery}
        onChange={handleSearch}
      />
      <ul className="list-none p-2 m-2">
        {(searchQuery ? filteredWords : savedWords).map((item) => (
          <div key={item._id}>
            <li className="translate-history-item">
              <div className="p-2 flex justify-between items-center mb-5 ">
                <div className="text-x1 bg-blue-600 text-black p-1 rounded dark:text-white">
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

              <div className="original-text text-black opacity-50 dark:text-white">
                <strong>Original Text:</strong> {item.textToTranslate}
              </div>
              <div className="translated-text text-black opacity-50 dark:text-white mb-2">
                <strong>Translated Text:</strong> {item.translatedText}
              </div>
            </li>
            <div className="p-4 shadow rounded-lg bg-blue border border-white">
              {isEditing && editingItemId === item._id ? (
                <>
                  <textarea
                    className="w-full min-h-[100px] border border-gray-300 p-2 rounded dark:text-white"
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
                    <span className="text-black opacity-50 dark:text-white">
                      Note:
                    </span>
                    <br />
                    <div className="dark:text-white">{item.message}</div>
                  </div>
                  <div className="relative">
                    <button
                      className="mt-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-600 flex  absolute bottom-5 right-0 mt-2"
                      onClick={() => handleEditClick(item._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 13.293a1 1 0 011.414 0L12 4.414 9.414 2 2 9.414l2.293 2.293zM3 10.586l8-8L18.586 8 10 16H3v-5.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </>
              )}

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
