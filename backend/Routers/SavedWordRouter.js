import express from 'express';
import SavedWordController from '../controllers/SavedWordController.js';

const savedWordRouter = express.Router();

savedWordRouter.post('/saved', SavedWordController.createSavedWord);
savedWordRouter.get('/getSavedWord', SavedWordController.getSavedWord);
savedWordRouter.get('/existSavedWord', SavedWordController.getSavedWordExist);
savedWordRouter.delete('/deleteSavedWord/:id', SavedWordController.deleteSavedWord);
savedWordRouter.delete('/delete', SavedWordController.deleteWord);
savedWordRouter.put('/updateMessage/:id', SavedWordController.updateMessage);


export default savedWordRouter;
