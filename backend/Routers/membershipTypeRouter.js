import express from "express";

import { createMembership,updateMembershipInfo, deleteMembership } from "../controllers/memberShipController.js";

const membershipTypeRouter = express.Router();

membershipTypeRouter.post("/", createMembership);
membershipTypeRouter.put("/update/:id", updateMembershipInfo);
membershipTypeRouter.delete("/delete/:id",deleteMembership);

export default membershipTypeRouter;
