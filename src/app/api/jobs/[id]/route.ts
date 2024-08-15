
import { JobModel } from "@/app/models/Job";
import mongoose from "mongoose";
import {NextRequest} from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  await mongoose.connect(process.env.MONGO_URL as string);
 const job =  await JobModel.findById({
    _id: id,
  });
  return Response.json(job);
}