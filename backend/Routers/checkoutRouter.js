import express from "express";
import checkoutController from "../controllers/checkoutController.js";

const checkoutRouter = express.Router();

checkoutRouter.post("/saveCheckout", checkoutController.createCheckout);
checkoutRouter.get("/get", checkoutController.getcheckout);



export default checkoutRouter;