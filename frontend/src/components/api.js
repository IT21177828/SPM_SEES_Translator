// api.js
import axios from "axios";

export const checkWordExistence = async (textToTranslate) => {
  try {
    const response = await axios.get(
      `http://localhost:5050/savedWord/existSavedWord?textToTranslate=${textToTranslate}`
    );
    return response.data.exists;
  } catch (error) {
    console.error("Error checking data:", error);
    return false;
  }
};