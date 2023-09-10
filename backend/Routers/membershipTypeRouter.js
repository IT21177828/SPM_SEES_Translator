import express from "express";

import { createMembership,updateMembershipInfo, deleteMembership, viewMembership } from "../controllers/memberShipController.js";

const membershipTypeRouter = express.Router();

membershipTypeRouter.post("/", createMembership);
membershipTypeRouter.put("/update/:id", updateMembershipInfo);
membershipTypeRouter.delete("/delete/:id",deleteMembership);
membershipTypeRouter.get("/view",viewMembership);

export default membershipTypeRouter;
