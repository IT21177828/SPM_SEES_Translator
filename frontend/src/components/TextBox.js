import SelectDropDown from './SelectDropDown';
import PropTypes from 'prop-types'; // Import PropTypes

const TextBox = ({
  style,
  setShowModal,
  selectedLanguage,
  setTextToTranslate,
  textToTranslate,
  translatedText,
  setTranslatedText,
}) => {
  const handleClick = () => {
    setTextToTranslate(''); // Clear the input text
    setTranslatedText(''); // Clear the translated text
  };

  return (
    <div className={style}>
      <SelectDropDown
        style={style}
        setShowModal={setShowModal}
        selectedLanguage={selectedLanguage}
      />
      <textarea
        disabled={style == 'output'}
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
};

export default TextBox;
