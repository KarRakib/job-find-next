'use server'
import AllJobs from '@/app/components/AllJobs';
import { addOrgAndUserData, JobModel } from '@/app/models/Job';
import { getUser } from '@workos-inc/authkit-nextjs';
import { WorkOS } from '@workos-inc/node';
import mongoose from 'mongoose';
import React from 'react'

type PageProps ={
  params:{
    orgId:string;
  }
}
const CompanyJobsPage = async(props:PageProps) => {
    const workos = new WorkOS(process.env.WORKOS_API_KEY);
    const org = await workos.organizations.getOrganization(props.params.orgId);
    const {user} = await getUser();
    await mongoose.connect(process.env.MONGO_URL as string)
    let jobsDocs = JSON.parse(JSON.stringify(await JobModel.find({ orgId: org.id }).sort({ _id: -1 })));
    jobsDocs = await addOrgAndUserData(jobsDocs, user)
  return (
    <div>
      <div className="container">
        <h1 className="text-xl my-6">{org.name} Jobs</h1>
      </div>
      <AllJobs jobs={jobsDocs} header={"Jobs posted by "+org.name} />
    </div>
  )
}

export default CompanyJobsPage