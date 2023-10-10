import HistoryModel from "../models/historymodel.js";

// const createHistory = (req, res) => {
//     const history = new HistoryModel(req.body);
//     history
//         .save()
//         .then(savedHistory => res.json(savedHistory))
//         .catch(err => res.json(err))
// };

// const getHistory = (req, res) => {
//   HistoryModel.find()
//     .then((history) => res.json(history))
//     .catch((err) => res.json(err));
// };

const deleteHistory = (req, res) => {
  HistoryModel.findByIdAndDelete(req.params.id)
    .then((history) => res.json(history))
    .catch((err) => res.json(err));
};

const clearAllData = (req, res) => {
  HistoryModel.deleteMany({})
    .then(() => res.json({ message: "All data cleared successfully" }))
    .catch((err) => res.status(500).json({ error: err.message }));
};

async function createHistory(req, res) {
  try {
    const name = req.body.name; // Extract 'name' from req.body directly
    const { inputLanguage, outputLanguage, textToTranslate, translatedText } =
      req.body; // Extract other properties

    // Create a new translation document and save it to the database
    const translation = new HistoryModel({
      userID: name,
      inputLanguage,
      outputLanguage,
      textToTranslate,
      translatedText,
    });

    const savedTranslation = await translation.save();
    res.json(savedTranslation);
  } catch (error) {
    console.error("Error in createHistory:", error);
    res
      .status(500)
      .json({ error: "An error occurred while storing the translation." });
  }
}
const getHistory = async (req, res) => {
  try {
    // Extract the user ID from the query parameters
    const id = req.query.user;

    if (!id) {
      return res.status(400).json({
        message: "User ID not provided.",
      });
    }

    // Find history records for the specified user
    const historyRecords = await HistoryModel.find({ userID: id }).sort({
      createdAt: -1,
    });

    res.json({
      response: historyRecords,
    });
  } catch (error) {
    console.error("Error in getHistory:", error);
    res.status(500).json({
      error: "An error occurred while fetching the user's history.",
    });
  }
};

export default { createHistory, getHistory, deleteHistory, clearAllData };
