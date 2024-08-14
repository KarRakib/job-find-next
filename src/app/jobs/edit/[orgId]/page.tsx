import JobForm from "@/app/components/JobForm";
import { JobModel } from "@/app/models/Job";
import { getUser } from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";
import mongoose from "mongoose";

type PageProps ={
    params:{
      orgId: string
    }
}

const page = async(pageProps:PageProps) => {
    const jobId = pageProps.params.orgId;
   await mongoose.connect(process.env.MONGO_URL as string)
   const jobDoc = await JobModel.findById(jobId);
    if (!jobDoc) {
      return 'Not Found'
    }
    const {user} = await getUser();
    const workos = new WorkOS(process.env.WORKOS_API_KEY);
    if (!user) {
      return ' You need To Login Please'
    }
    const oms = await workos.userManagement.listOrganizationMemberships({
      userId:user.id,
      organizationId: jobDoc.orgId,
    })
    console.log('oms =====',oms.data);
    if (oms.data.length === 0) {
      return 'no access'
    }
  return (
    <div>
      <JobForm orgId={jobDoc.orgId} jobDoc={jobDoc}/>
    </div>
  )
}

export default page