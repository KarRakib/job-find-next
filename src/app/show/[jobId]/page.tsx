'use client'
import AppliedPopUp from "@/app/components/AppliedPopUp";
import { getURL } from "next/dist/shared/lib/utils";

import Image from "next/image";
import { useEffect, useState } from "react";

type PageProps = {
  params: {
    jobId: string,
   
  },
  searchParams:{
    email: string
  }
}

export default  function SingleJobPage(props: PageProps) {
  const jobId = props.params.jobId;
  const email = props.searchParams.email
  const [jobDoc, setJobDoc] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  
  useEffect(() => {
    const fetchData = () => {
      try {
        fetch(('/api/jobs?id=' + jobId))
          .then(res => res.json())
          .then(data => setJobDoc(data)
          )

      } catch (error) {
        console.log('jobDoc Fetching', error);

      }
    }
    fetchData()
  }, [])
  const findEmail =jobDoc?.applicated?.filter(apply=> apply.email === email)
 
  
  

  // await mongoose.connect(process.env.MONGO_URL as string);
  // const jobDoc = await JobModel.findById(jobId);

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)
  

  return (
    <div className="container mt-8 my-6">
      <div className="sm:flex">
        <div className="grow">
          <h1 className="text-4xl mb-2">{jobDoc?.title}</h1>
          <div className="capitalize text-sm text-blue-800 mb-4">
            {jobDoc?.remote}
            {' '}&middot;{' '}
            {jobDoc?.city}, {jobDoc?.country}
            {' '}&middot;{' '}
            {jobDoc?.type}-time
          </div>
        </div>

        <div>
          <Image
            src={jobDoc?.jobIcon} alt={'job icon'}
            width={500} height={500}
            className="w-auto h-auto max-w-16 max-h-16"
          />
        </div>
      </div>
      <div className="whitespace-pre-line text-sm text-gray-600">
        {jobDoc?.description}
      </div>
      <div className="mt-4 bg-gray-200 p-8 rounded-lg">
        <h3 className="font-bold mb-2">Apply by contacting us</h3>
        <div className="flex gap-4">
          <Image
            src={jobDoc?.contactPhoto}
            alt={'contact person'}
            width={500} height={500}
            className="w-auto h-auto max-w-24 max-h-24"
          />
          <div className="flex content-center items-center">
            {jobDoc?.contactName}<br />
            Email: {jobDoc?.contactEmail}<br />
            Phone: {jobDoc?.contactPhone}
          </div>
        </div>

      </div>
      <div className="flex justify-center">
        {!findEmail?<button disabled  className="rounded-md py-1 px-2 cursor-pointer sm:py-2 sm:px-4 bg-blue-400 text-white">
          Applied
        </button> :<button onClick={openModal} className="rounded-md py-1 px-2 cursor-pointer sm:py-2 sm:px-4 bg-blue-600 text-white">
          Apply
        </button>}
        {isOpen && <AppliedPopUp email={email} jobId={jobId} isOpen={isOpen} onClose={closeModal} />}
      </div>
    </div>
  );
}