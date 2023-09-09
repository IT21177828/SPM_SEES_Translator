import express from 'express';
import mongoose from '../db/conn.js';

// import {placeMembership} from '../controllers/memberShipController.js';
import { activateMembership,deactivateMemberShip,reactivateMembership } from '../controllers/placeMembershipPlanController.js';
import userController from '../controllers/userController.js';

const membershipRouter = express.Router();

membershipRouter.post('/',userController.verify,activateMembership);
membershipRouter.post('/deactivate/:id',userController.verify ,deactivateMemberShip);
membershipRouter.post('/reactivate/:id', userController.verify,reactivateMembership);

export default membershipRouter;