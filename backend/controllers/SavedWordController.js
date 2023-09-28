import SavedWordModel from "../models/SavedWordModel.js";

const getSavedWord = (req, res) => {
  SavedWordModel.find()
    .then((word) => res.json(word))
    .catch((err) => res.json(err));
};

const deleteSavedWord = (req, res) => {
  SavedWordModel.findByIdAndDelete(req.params.id)
    .then((word) => res.json(word))
    .catch((err) => res.json(err));
};

// const clearAllData = (req, res) => {
//     HistoryModel.deleteMany({})
//       .then(() => res.json({ message: "All data cleared successfully" }))
//       .catch(err => res.status(500).json({ error: err.message }));
// };

const createSavedWord = async (req, res) => {
  try {
    // Extract data from the request body
    const { inputLanguage, outputLanguage, textToTranslate, translatedText } =
      req.body;

    // Create a new translation document and save it to the database
    const translation = new SavedWordModel({
      inputLanguage,
      outputLanguage,
      textToTranslate,
      translatedText,
      message: "Add Note Here",
    });

    const savedTranslation = await translation.save();
    res.json(savedTranslation);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while storing the translation." });
  }
};

const deleteWord = async (req, res) => {
  const { textToTranslate } = req.query; // Get textToTranslate from query parameters

  try {
    // Find data based on textToTranslate
    const deletedData = await SavedWordModel.deleteMany({
      textToTranslate: { $regex: new RegExp(textToTranslate, "i") },
    });

    if (deletedData.deletedCount > 0) {
      console.log("Existing data deleted successfully");
      res.status(200).json({ message: "Data deleted successfully" });
    } else {
      console.log("Data with textToTranslate not found");
      res.status(404).json({ message: "Data not found" });
    }
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getSavedWordExist = async (req, res) => {
  const { textToTranslate } = req.body;

  try {
    const word = await SavedWordModel.findOne({
      textToTranslate: { $regex: new RegExp(`^${textToTranslate}$`, "i") },
    });

    if (word) {
      // Word exists in the database
      res.json({ exists: true });
    } else {
      // Word does not exist in the database
      res.json({ exists: false });
    }
  } catch (err) {
    console.error("Error checking data:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateMessage = async (req, res) => {
  try {
    // Extract data from the request body
    const { message } = req.body;

    // Check if an 'id' parameter and 'message' are provided
    if (!message) {
      return res.status(400).json({ error: "Missing 'message' parameter." });
    }

    // Find the translation record by ID and update the 'message' field
    const updatedTranslation = await SavedWordModel.findByIdAndUpdate(
      req.params.id,
      { message },
      { new: true } // This option returns the updated document
    );

    if (!updatedTranslation) {
      return res.status(404).json({ error: "Translation not found." });
    }

    res.json(updatedTranslation);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the message." });
  }
};

export default {
  createSavedWord,
  getSavedWord,
  deleteSavedWord,
  deleteWord,
  getSavedWordExist,
  updateMessage,
};
