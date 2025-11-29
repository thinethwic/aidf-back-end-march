import express from "express";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import { createJobApplication, getJobApplicationById,getJobApplication } from "../application/jobApplication";
import AuthorizationMiddleware from "./middleware/authorization-middleware";

const jobApplicationRouter = express.Router();

jobApplicationRouter.route("/") .post(createJobApplication).get(ClerkExpressRequireAuth({}), AuthorizationMiddleware,getJobApplication)
jobApplicationRouter.route("/:id").get(ClerkExpressRequireAuth({}), AuthorizationMiddleware,getJobApplicationById);

export default jobApplicationRouter; 