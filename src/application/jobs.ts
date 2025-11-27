import { NextFunction, Request } from "express";
import { Response } from "express";
import job from "../infastrutures/schemas/jobs";
import NotFoundError from "../domain/errors/not-found-error";
import ValidationError from "../domain/errors/validation-error";
import { z } from "zod";

export const GetAllJobs = async (req: Request,res: Response, next: NextFunction) =>{
    
  try {
    const jobs = await job.find();
    return res.status(200) .json(jobs);    
  } catch (error) {
    next(error);   
  }
  

  }
  

  export  const createJobs = async (req: Request,res: Response, next: NextFunction) =>{
    try {
      const jobs = z.object({title:z.string(), description:z.string(), location:z.string(),type:z.string(), questions:z.string().array()
        .optional()}).safeParse(req.body)  
      
      
      if (!jobs.success) {
        throw new ValidationError(jobs.error.message);
      }
      await job.create(jobs);
      return res.status(201).send(); 
    } catch (error) {
      next(error)
    }
   
  }
  
  export const getJobById = async ( req: Request,res: Response, next: NextFunction) =>{
    try {
      const jobs = await job.findById(req.params._id); 
  
    if (!jobs) {
       throw new NotFoundError("Job not found");
    }
    return res.json(jobs)
    } catch (error) {
      next(error);  
    }
    
  }
  
  export const deleteJob = async (req: Request,res: Response,next:NextFunction) =>{
    try {
      const Remove = await job.findByIdAndDelete(req.params._id); 
  
    if (!Remove) {
      throw new NotFoundError("Job not found")
    }
    return res.status(204) .send(); 
    } catch (error) {
      next(error); 
    }
    
  }
  
  export const updateJob = async (next: NextFunction, req: Request,res: Response) =>{
    try {
      const jobToUpdate = job.findById(req.params._id); 
  
    if (!jobToUpdate) {
      throw new NotFoundError("Job not found")
    }

    const Update = await job.findByIdAndUpdate(req.params._id, {title: req.body.title, type: req.body.type, location: req.body.location });
  
    return res.status(204) .send(); 
    } catch (error) {
      next(error);
    }
  }