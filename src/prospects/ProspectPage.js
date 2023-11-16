import React, { useEffect } from 'react';
import { useState } from 'react';
import JoblyApi from "../api";
import JobsList from "./ProspectList";
import Loading from '../Loading';

/**
 *  Renders JobsPage
 *
 *  State: jobs - {jobs:[job, ...], isLoading: boolean}
 *         where job is an object containing info about one job
 *
 *  RouteList => JobsPage => {SearchBar/JobsList}
 */
function JobsPage() {
    const [jobs,setJobs] = useState(null);

  useEffect(function getJobs() {
      fetchJobs();
  },[]);

  /**Fetch all Jobs from API and set the result as state */
  async function fetchJobs(title) {
    const jobs = await JoblyApi.getJobs(title)

    setJobs(jobs);
  }

  if (jobs === null) return <Loading />;

  const noJobHtml = <div><h2 className='text-white'>No jobs found!</h2></div>

  return(
    <div>
      {jobs.length === 0
      ? noJobHtml
      :<JobsList jobs={jobs}/>}
    </div>
  )
}

export default JobsPage;