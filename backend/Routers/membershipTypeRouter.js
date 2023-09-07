import express from "express";

import { createMembership,updateMembershipInfo } from "../controllers/memberShipController.js";

const membershipTypeRouter = express.Router();

membershipTypeRouter.post("/", createMembership);
membershipTypeRouter.put("/update/:id", updateMembershipInfo);

export default membershipTypeRouter;
