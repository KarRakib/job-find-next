'use client';
import axios from 'axios';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const Page = ({ params }: { params: { email: string } }) => {
    const email = decodeURIComponent(params.email);
    console.log('email ====', email);

    const [filteredJobs, setFilteredJobs] = useState<any[]>([]);
    const [allJobs, setAllJobs] = useState<any[]>([]); // Assuming allJobs is an array
    const [filteredApplications, setFilteredApplications] = useState<any[]>([]);

    // Fetch jobs from API
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                // Use a root-relative path to call the API endpoint
                const res = await axios.get('/api/allJobs');
                setAllJobs(res.data.allJobs);
              

            } catch (error) {
                console.log('Fetching Error', error);
            }
        };

        fetchJobs();
    }, []);
    console.log('alljob jobs', allJobs);
    // Filter jobs based on favorites in localStorage
    useEffect(() => {
        const favoritesLocal = JSON.parse(localStorage.getItem('favorites')) || [];
        const idsToFind = favoritesLocal.map((item) => item.id);
        const jobs = allJobs?.filter((job) => idsToFind.includes(job._id.toString()));
        setFilteredJobs(jobs);
        const jobsAppliedToByEmail = allJobs.filter(job =>
            job.applicated.some((application:{apllication:{}}) => application.email === email)
          );
          setFilteredApplications(jobsAppliedToByEmail);
    }, [allJobs]);

    console.log('final jobs', filteredJobs);
    const hanldeDelete = (id: string) => {
        const favoritesLocal = JSON.parse(localStorage.getItem('favorites')) || [];
        const updatedFav = favoritesLocal.filter((item: { id: string }) => item.id !== id)
        localStorage.setItem('favorites', JSON.stringify(updatedFav))
        setFilteredJobs(updatedFav)
    }
   console.log('setapp', filteredApplications);
   
    return (
        <>
        <h3> My Allied Jobs </h3>
            <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">
                <table className="w-full table-fixed">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Title</th>
                            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Job Status</th>
                            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Contact</th>
                            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Uploaded Doc</th>
                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredApplications.map((apply) => (
                            <tr>
                                <td className="py-4 px-6 border-b border-gray-200">{apply.title}</td>
                                <td className="py-4 px-6 border-b border-gray-200 truncate">   {apply.remote}
                                    {' '}&middot;{' '}
                                    {apply.city}, {apply.country}
                                    {' '}&middot;{' '}
                                    {apply.type}-time </td>
                                <td className="py-4 px-6 border-b border-gray-200">{apply.contactEmail}</td>
                                <td className="py-4 px-6 border-b border-gray-200">
                                {
  apply.applicated
    .filter((item) => item.email === email)
    .map((filteredItem) => (
      <input
        key={filteredItem.cv} // You can use cv or a unique value as the key
        defaultValue={filteredItem.cv}
        type="text"
        className='border-gray-950'
      />
    ))
}

                                  </td>
                            </tr>

                        ))}

                    </tbody>
                </table>
            </div>

<h3> My Favorite Job</h3>
            <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">
                <table className="w-full table-fixed">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Title</th>
                            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Job Status</th>
                            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Contact</th>
                            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Action</th>
                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredJobs.map((love) => (
                            <tr>
                                <td className="py-4 px-6 border-b border-gray-200">{love.title}</td>
                                <td className="py-4 px-6 border-b border-gray-200 truncate">   {love.remote}
                                    {' '}&middot;{' '}
                                    {love.city}, {love.country}
                                    {' '}&middot;{' '}
                                    {love.type}-time </td>
                                <td className="py-4 px-6 border-b border-gray-200">{love.contactEmail}</td>
                                <td className="py-4 px-6 border-b border-gray-200">
                                    <button className="bg-green-500 text-white py-1 px-2 rounded-full text-xs"> <Link className="hover:underline" href={'/show/' + love._id}>Apply </Link></button> |

                                    <button onClick={() => hanldeDelete(love._id)} className="bg-red-500 text-white py-1 px-2 rounded-full text-xs">Delete</button>
                                </td>
                            </tr>

                        ))}

                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Page;