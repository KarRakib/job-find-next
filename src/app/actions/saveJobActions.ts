'use server'

import mongoose from "mongoose"
import { JobModel } from "../models/Job";
import { revalidatePath } from "next/cache";

export const saveJobActions = async (formData: FormData) => {
    console.log('formenterr', formData);
    
    'use server'
    await mongoose.connect(process.env.MONGO_URL as string);
    const { id, ...jobData } = Object.fromEntries(formData);
    const jobDoc = (id) ? await JobModel.findByIdAndUpdate(id, jobData) :
        await JobModel.create(jobData);
    if ('orgId' in jobData) {
        revalidatePath('/jobs/' + jobData?.orgId)
    }
    return JSON.parse(JSON.stringify(jobData));
}

