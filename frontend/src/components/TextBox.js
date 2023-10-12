import SelectDropDown from './SelectDropDown';
import PropTypes from 'prop-types'; // Import PropTypes
import axios from 'axios';  
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
  userId,

}) => {
  const handleClick = () => {
    setTextToTranslate(''); // Clear the input text
    setTranslatedText(''); // Clear the translated text
  };
  
  //Store Saved Word
  const storeSavedWord = async (dataToSave) => {
    try {
      // Check if the data already exists in the database
      const existingDataResponse = await axios.get('http://localhost:5050/savedWord/existSavedWord/', {
  params: { textToTranslate: dataToSave.textToTranslate }, // Provide the parameter correctly
});

      if (existingDataResponse.data.exists) {
        // Data exists, so delete it
        await axios.delete('http://localhost:5050/savedWord/delete/', {
          params: { textToTranslate: dataToSave.textToTranslate }, // Send the data to delete as parameters
        });
        console.log('Existing data deleted successfully');
      } else {

        // If the word is not saved, save it to the database
        await axios.post("http://localhost:5050/savedWord/saved", dataToSave);
        console.log(dataToSave);
        setIsWordSaved(true); // Toggle the state to filled

      }
    } catch (error) {
      console.error('Error storing or deleting data:', error);
    }
  };
  
  


  return (
    <div className={style}>
      <SelectDropDown
        style={style}
        setShowModal={setShowModal}
        selectedLanguage={selectedLanguage}
      />
      <textarea
        disabled={style === 'output'}
        className={style}
        placeholder={style === 'input' ? 'Enter text' : 'Translation'}
        onChange={(e) => setTextToTranslate(e.target.value)}
        value={style === 'input' ? textToTranslate : translatedText}
      />
      {style === 'input' && (
        <div className="delete" onClick={handleClick}>
          ˟
        </div>
      )}

      {style === "output" && translatedText && (
        <div
          className="saved relative bottom-8 left-60 cursor-pointer"
          onClick={() => {
            const dataToSave = {
              name: userId,
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
  userId: PropTypes.string.isRequired,
};

export default TextBox;
