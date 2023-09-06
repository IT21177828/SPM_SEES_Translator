import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './Routers/userRouter.js';
import badWordRouter from './Routers/badWordRouter.js';
import translateRouter from './Routers/translateRouter.js';
import feedbackRouter from './Routers/feedbackRouter.js';

dotenv.config();

const PORT = process.env.PORT || 5050;

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/users', userRouter);
app.use('/bad', badWordRouter);
app.use('/translate', translateRouter);
app.use('/feedback', feedbackRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
