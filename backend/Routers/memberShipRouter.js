import express from 'express';
import mongoose from '../db/conn.js';

// import {placeMembership} from '../controllers/memberShipController.js';
import { activateMembership,deactivateMemberShip,reactivateMembership,getMembershipActivationDetails } from '../controllers/placeMembershipPlanController.js';
import userController from '../controllers/userController.js';

const membershipRouter = express.Router();

membershipRouter.post('/',activateMembership);
membershipRouter.post('/deactivate/:id',deactivateMemberShip);
membershipRouter.post('/reactivate/:id',reactivateMembership);
membershipRouter.post('/getMembershipDetails',getMembershipActivationDetails);

export default membershipRouter;