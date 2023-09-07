import HistoryModel from "../models/historymodel.js";


// const createHistory = (req, res) => {
//     const history = new HistoryModel(req.body); 
//     history
//         .save()
//         .then(savedHistory => res.json(savedHistory))
//         .catch(err => res.json(err))
// };

const getHistory = (req, res) => {
    HistoryModel.find()
        .then(history => res.json(history))
        .catch(err => res.json(err))
};

const deleteHistory = (req, res) => {
    HistoryModel.findByIdAndDelete(req.params.id)
        .then(history => res.json(history))
        .catch(err => res.json(err))
};

const clearAllData = (req, res) => {
    HistoryModel.deleteMany({})
      .then(() => res.json({ message: "All data cleared successfully" }))
      .catch(err => res.status(500).json({ error: err.message }));
};

const createHistory = (async (req, res) => {
    try {
      // Extract data from the request body
      const { inputLanguage, outputLanguage, textToTranslate, translatedText } = req.body;
  
      // Create a new translation document and save it to the database
      const translation = new HistoryModel({
        inputLanguage,
        outputLanguage,
        textToTranslate,
        translatedText,
      });
  
      const savedTranslation = await translation.save();
      res.json(savedTranslation);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while storing the translation.' });
    }
  });

export default { createHistory, getHistory, deleteHistory, clearAllData };