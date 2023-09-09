import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './Routers/userRouter.js';

import membershipRouter from "./Routers/memberShipRouter.js";
import membershipTypeRouter from "./Routers/membershipTypeRouter.js";
import badWordRouter from './Routers/badWordRouter.js';
import translateRouter from './Routers/translateRouter.js';
import feedbackRouter from './Routers/feedbackRouter.js';
import paymentRouter from './Routers/paymentRouter.js';
import Stripe from 'stripe';
import historyRouter from "./Routers/historyRouter.js";
import savedwordRouter from "./Routers/SavedWordRouter.js";

dotenv.config();

const PORT = process.env.PORT || 5050;
const app = express();
// const stripe = require('stripe')('YOUR_STRIPE_SECRET_KEY');

const stripeSecretKey = 'sk_test_51NoUoGABnypc8eR2cOxobGpjmZUSETzx8mdX3mJFm8YU8d4QEWErQNsP5rkjTl6Rw4qGHWa86kxMU4QsARtYjMJm00jfSQ6kN1';
const stripeInstance = new Stripe(stripeSecretKey);

// const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

// const storeItem = new Map([
//   [1, { priceInCents: 1000, name: "Learn React" }],
//   [2, { priceInCents: 2000, name: "wcwecwc" }],
// ]);



app.use(cors());
app.use(express.json());
app.use(express.static("public"))

// Routes
app.use("/membership", membershipRouter);
app.use("/membershipType", membershipTypeRouter);
app.use("/user", userRouter);
app.use('/bad', badWordRouter);
app.use('/translate', translateRouter);
app.use('/feedback', feedbackRouter);
app.use('/payment', paymentRouter);
app.use("/history", historyRouter);
app.use("/savedWord", savedwordRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
