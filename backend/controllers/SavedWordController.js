import SavedWordModel from "../models/SavedWordModel.js";


const getSavedWord = (req, res) => {
    SavedWordModel.find()
        .then(word => res.json(word))
        .catch(err => res.json(err))
};

const deleteSavedWord = (req, res) => {
    SavedWordModel.findByIdAndDelete(req.params.id)
        .then(word => res.json(word))
        .catch(err => res.json(err))
};

// const clearAllData = (req, res) => {
//     HistoryModel.deleteMany({})
//       .then(() => res.json({ message: "All data cleared successfully" }))
//       .catch(err => res.status(500).json({ error: err.message }));
// };

const createSavedWord = (async (req, res) => {
    try {
      // Extract data from the request body
      const { inputLanguage, outputLanguage, textToTranslate, translatedText } = req.body;
  
      // Create a new translation document and save it to the database
      const savedword = new SavedWordModel({
        inputLanguage,
        outputLanguage,
        textToTranslate,
        translatedText,
      });
  
      const savedTranslation = await savedword.save();
      res.json(savedTranslation);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while storing the translation.' });
    }
  });

export default { createSavedWord, getSavedWord, deleteSavedWord};