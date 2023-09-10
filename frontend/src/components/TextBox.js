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
        // Data doesn't exist, insert it
        await axios.post('http://localhost:5050/savedWord/saved', dataToSave);
        console.log('New data saved successfully');   
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
      {style === 'output' && (
  <div
    className="saved relative bottom-32 left-60 cursor-pointer"
    onClick={() => {
      const dataToSave = {
        textToTranslate,
        outputLanguage,
        inputLanguage,
        translatedText,
      };
      storeSavedWord(dataToSave);
    }}
  >
    ⭐️
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
