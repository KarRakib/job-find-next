
import Hero from "./components/Hero";
import AllJobs from "./components/AllJobs";
import { getUser } from "@workos-inc/authkit-nextjs";
import mongoose from "mongoose";
import { addOrgAndUserData, JobModel } from "./models/Job";


export default async function Home() {
  const {user} = await getUser();
  await mongoose.connect(process.env.MONGO_URL as string);
  const latestJobs = await addOrgAndUserData(
    await JobModel.find({},{},{limit:5,sort:'-createdAt'}),
    user,
  );
  console.log('home', user);
  
  return (
    <>
    <Hero/>
    <AllJobs user={user} header={''} jobs={latestJobs} />
    </>
  );
}
