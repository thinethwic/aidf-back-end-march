import "dotenv/config";
import express from "express";
import jobRouter from "./api/jobs";
import { connectDB } from "./infastrutures/db";
import jobApplicationRouter from "./api/jobApplication";
import GlobalErrorHaddelingMiddelware from "./api/middleware/global-error-handler";
import cors from "cors"; 

const app = express();
app.use(express.json());
app.use(cors());

connectDB(); 

app.use("/jobs", jobRouter);
app.use("/jobApplication", jobApplicationRouter);

app.use(GlobalErrorHaddelingMiddelware);

const PORT = process.env.PORT || 8000; 
app.listen(PORT, () => console.log("Server is listening on port 8000."));
