


import JobRow from "./JobRow";

export default function AllJobs() {
    const jobs = [{}]
    
  return (
    <div className="bg-slate-200 py-6 rounded-3xl">
      <div className="container">
        <h2 className="font-bold mb-4">{ 'Recent jobs'}</h2>

        <div className="flex flex-col gap-4">
          {!jobs?.length && (
            <div>No jobs found</div>
          )}
          {jobs && jobs.map(job => (
            <JobRow  />
          ))}
        </div>

      </div>
    </div>
  );
}