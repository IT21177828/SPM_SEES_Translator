import express from 'express';
import mongoose from '../db/conn.js';

// import {placeMembership} from '../controllers/memberShipController.js';
import { activateMembership,deactivateMemberShip } from '../controllers/placeMembershipPlanController.js';


const membershipRouter = express.Router();

membershipRouter.post('/',activateMembership);
membershipRouter.post('/deactivate/:id',deactivateMemberShip);

export default membershipRouter;