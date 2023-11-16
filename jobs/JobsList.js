import React from 'react';
import JobCard from './JobCard'
/**
 * Renders list of jobs
 *
 * Props: jobs - [job, ...] where job is object containing info about a job
 *
 * {CompanyDetails,JobsPage} => JobsList => JobCard
 */
function JobsList({jobs}) {

  return(
    <div className='JobsList flex-column'>
      {jobs.map(job => (
        <JobCard
          key={job.id}
          title={job.title}
          companyHandle={job.companyHandle}
          salary={job.salary}
          equity={job.equity}
        />
      ))}
    </div>
  )
}

export default JobsList;