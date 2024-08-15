import { JobModel } from "@/app/models/Job";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

export const GET = async(req:NextRequest)=>{
    await mongoose.connect(process.env.MONGO_URL as string);
    const allJobs = await JobModel.find({})
    return Response.json({allJobs},{status:200}) 
}