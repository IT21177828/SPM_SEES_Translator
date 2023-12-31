const SelectDropDown = ({ style, setShowModal, selectedLanguage }) => {
  return (
    <div onClick={() => setShowModal(style)} className="select-drop-down ">
      <input
        value={selectedLanguage}
        onChange={(e) => selectedLanguage(e.target.value)}
      />
      <div className="down-arrow relative right-4">
        <svg
          focusable="false"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M7 10l5 5 5-5z"></path>
        </svg>
      </div>
    </div>
  );
};

export default SelectDropDown;
