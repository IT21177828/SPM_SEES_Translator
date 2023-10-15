import mongoose from "../db/conn.js";
const history = new mongoose.Schema({
  userID: String,
  inputLanguage: String,
  outputLanguage: String,
  textToTranslate: String,
  translatedText: String,
  createdAt: { type: Date, default: Date.now },
});

const HistoryModel = mongoose.model("Hisotry", history);
export default HistoryModel;
