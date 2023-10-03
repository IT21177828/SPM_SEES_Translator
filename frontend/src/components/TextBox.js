import SelectDropDown from "./SelectDropDown";
import PropTypes from "prop-types"; // Import PropTypes
import axios from "axios";
import { useEffect, useState } from "react";
import { checkWordExistence } from "./api";
const TextBox = ({
  style,
  setShowModal,
  selectedLanguage,
  setTextToTranslate,
  textToTranslate,
  translatedText,
  setTranslatedText,
  outputLanguage,
  inputLanguage,
}) => {
  const handleClick = () => {
    setTextToTranslate(""); // Clear the input text
    setTranslatedText(""); // Clear the translated text
  };

  // Store or Remove Saved Word
  const toggleSavedWord = async (dataToSave) => {
    try {
      if (isWordSaved) {
        // If the word is saved, remove it from the database
        await axios.delete(
          `http://localhost:5050/savedWord/delete?textToTranslate=${textToTranslate}`
        );
        setIsWordSaved(false); // Toggle the state to unfilled
      } else {
        // If the word is not saved, save it to the database
        await axios.post("http://localhost:5050/savedWord/saved", dataToSave);
        setIsWordSaved(true); // Toggle the state to filled
      }
    } catch (error) {
      console.error("Error storing or deleting data:", error);
    }
  };

  const [isWordSaved, setIsWordSaved] = useState(false);

  useEffect(() => {
    // Call the function to check word existence
    if (style === "input" && textToTranslate) {
      checkWordExistence(textToTranslate).then((exists) => {
        setIsWordSaved(exists);
      });
    } else {
      // Reset isWordSaved to false when textToTranslate is empty
      setIsWordSaved(false);
    }
  }, [style, textToTranslate]); // Include textToTranslate as a dependency

  return (
    <div className={style}>
      <SelectDropDown
        style={style}
        setShowModal={setShowModal}
        selectedLanguage={selectedLanguage}
      />
      <textarea
        disabled={style === "output"}
        className={style}
        placeholder={style === "input" ? "Enter text" : "Translation"}
        onChange={(e) => setTextToTranslate(e.target.value)}
        value={style === "input" ? textToTranslate : translatedText}
      />
      {style === "input" && (
        <div className="delete" onClick={handleClick}>
          ˟
        </div>
      )}
      {style === "output" && translatedText && (
        <div
          className="saved relative bottom-32 left-60 cursor-pointer"
          onClick={() => {
            const dataToSave = {
              textToTranslate,
              outputLanguage,
              inputLanguage,
              translatedText,
            };
            toggleSavedWord(dataToSave);
          }}
        >
          {isWordSaved ? (
            <span role="img" aria-label="Filled Star">
              ⭐️
            </span>
          ) : (
            <span role="img" aria-label="Empty Star">
              ☆
            </span>
          )}
        </div>
      )}
    </div>
  );
};

// PropTypes to specify the expected prop types
TextBox.propTypes = {
  style: PropTypes.string.isRequired,
  setShowModal: PropTypes.func.isRequired,
  selectedLanguage: PropTypes.string.isRequired,
  setTextToTranslate: PropTypes.func.isRequired,
  textToTranslate: PropTypes.string.isRequired,
  translatedText: PropTypes.string.isRequired,
  setTranslatedText: PropTypes.func.isRequired,
  outputLanguage: PropTypes.string.isRequired,
  inputLanguage: PropTypes.string.isRequired,
};

export default TextBox;
