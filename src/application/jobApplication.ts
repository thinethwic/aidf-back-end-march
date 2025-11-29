import { NextFunction,Request, Response } from "express";
import jobApplication from "../infastrutures/schemas/jobApplication";
import { generateRating } from "./rating";


export const createJobApplication = async (req:Request,res:Response,next:NextFunction) => {
    
    try {
        const JobApplication = req.body;
        console.log(JobApplication);
        const createJobApplication = await jobApplication.create(JobApplication);
        generateRating(createJobApplication._id)
        return res.status(201) .send(); 
    } catch (error) {
        next(error); 
        console.log(error);
        return res.status(500) .send();
    }
}

export const getJobApplication = async (req: Request, res:Response, next:NextFunction) => {
    try {
        const {jobid} = req.query;
       
        if(jobid){
          const jobApplications = await jobApplication.find({job:jobid})
          return res.status(200).json(jobApplications);
        }
    
        const jobApplications = await jobApplication.find().populate("job").exec();
        return res.status(200).json(jobApplications);
     
      } catch (error) {
        next(error);
        console.log(error);
        return res.status(500) .send();
      }
};

export const getJobApplicationById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const JobApplication = await jobApplication.findById(id).populate("job");
    if (JobApplication === null) {
      return res.status(404).send();
    }
    return res.status(200).json(JobApplication);
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
};