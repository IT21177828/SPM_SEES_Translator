import express from "express";
import SavedWordController from "../controllers/SavedWordController.js";

const savedWordRouter = express.Router();

savedWordRouter.post("/saved", SavedWordController.createSavedWord);
savedWordRouter.get("/getSavedWord", SavedWordController.getSavedWord);
savedWordRouter.delete("/deleteSavedWord/:id", SavedWordController.deleteSavedWord);
//savedWordRouter.delete("/clearAllData", historyController.clearAllData);



export default savedWordRouter;