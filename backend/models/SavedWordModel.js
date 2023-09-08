import mongoose from "../db/conn.js";
const savedWord = new mongoose.Schema({
   
    
  inputLanguage: String,
  outputLanguage: String,
  textToTranslate: String,
  translatedText: String,
  createdAt: { type: Date, default: Date.now },
    
}
)


const SavedWordModel = mongoose.model('SavedWord', savedWord)
export default SavedWordModel;