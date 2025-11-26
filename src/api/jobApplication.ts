import express from "express";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import { createJobApplication, getJobApplication, getJobApplicationById } from "../application/jobApplication";
import AuthorizationMiddleware from "./middelware/authorization-middleware";

const jobApplicationRouter = express.Router();

jobApplicationRouter.route("/") .get(ClerkExpressRequireAuth({}), AuthorizationMiddleware,getJobApplication) .post(createJobApplication)
jobApplicationRouter.route("/:id") .get(getJobApplicationById)
    .get(ClerkExpressRequireAuth({}), AuthorizationMiddleware, getJobApplicationById);

export default jobApplicationRouter; 