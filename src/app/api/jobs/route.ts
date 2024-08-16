
import { JobModel } from "@/app/models/Job";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  await mongoose.connect(process.env.MONGO_URL as string);
  const job = await JobModel.findById({
    _id: id,
  });
  return Response.json(job);
}

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  await mongoose.connect(process.env.MONGO_URL as string);
  await JobModel.deleteOne({
    _id: id,
  });
  return Response.json(true);
}
export async function PUT(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');

  // Parse the request body as JSON
  const { email, cv } = await req.json();

  if (!id || !email || !cv) {
    return NextResponse.json({ success: false, message: 'Missing required field' })
  }
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    const result = await JobModel.updateOne({
      _id: id
    },
      { $push: { applicated: { email, cv } } }
    );
    if (result.modifiedCount === 0) {
      return NextResponse.json({ success: false, message: 'job not found or cv' })
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating job application:', error);
    return NextResponse.json({ success: false, message: 'Failed to update job application' }, { status: 500 });
  }
}