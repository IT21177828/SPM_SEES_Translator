import express from "express";
import translatorController from "../controllers/translatorController.js";

const translateRouter = express.Router();

translateRouter.get("/languages", translatorController.language);

translateRouter.get("/translation", translatorController.translate);


export default translateRouter;
