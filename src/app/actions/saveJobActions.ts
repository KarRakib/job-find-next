'use server'

import mongoose from "mongoose"

export const saveJobActions = async( formData:FormData) => {
  'use server'
  await mongoose.connect(process.env.MONGO_URL as string);
  const {id,...jobData} = Object.fromEntries(formData);
  const jobDoc = (id) ? await Jo
}

export default saveJobActions