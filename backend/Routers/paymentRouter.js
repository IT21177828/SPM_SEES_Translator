import express from 'express';

import { makePayment } from '../controllers/paymentController.js';

const paymentRouter = express.Router();


paymentRouter.post("/", makePayment);

export default paymentRouter;