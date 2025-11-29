import { Types } from "mongoose";
import OpenAI from "openai";
import jobApplication from "../infastrutures/schemas/jobApplication";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateRating(jobApplicationId: Types.ObjectId) {
  const JobApplication = await jobApplication.findById(
    jobApplicationId
  ).populate<{ job: { title: string; answers: string[] } }>("job");

  const content = `Role:${
    JobApplication?.job.title
  }, User Description: ${JobApplication?.answers.join(". ")}`;

  const completion = await client.chat.completions.create({
    messages: [{ role: "user", content }],
    model: "ft:gpt-3.5-turbo-0125:unimind-ai:fullstacktutorial:CfN48BWT",
  });

  const strResponse = completion.choices[0].message.content;
  console.log(strResponse);
  if (!strResponse) {
    return;
  }

  const response = JSON.parse(strResponse);

  if (!response.rate) {
    return;
  }

  await jobApplication.findOneAndUpdate(
    { _id: jobApplicationId },
    { rating: response.rate }
  );
}
