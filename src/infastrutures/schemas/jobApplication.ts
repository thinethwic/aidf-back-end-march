import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema({

    UserId: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  answers: {
    type: [String],
    required: true,
  },
   job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  rating: { type: String },
    
}); 

const jobApplication = mongoose.model("jobApplication", jobApplicationSchema);

export default jobApplication;