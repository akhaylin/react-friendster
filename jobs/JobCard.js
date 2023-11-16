import React from 'react';
import { addCommasToIntegerPart } from '../helpers';

/**
 *  Renders one card with info about a job
 *
 * Props: job - object containing all info about job
 *
 *  JobsList -> JobCard
 */
function JobCard({ title, companyHandle, salary, equity }) {

  if (companyHandle) {

    companyHandle = companyHandle
      .split("-")
      .map(name => name.charAt(0).toUpperCase() + name.slice(1))
      .join("-");

  }

  return (
    <div className="card w-75 mb-3" >
      <div className="card-body">
        <p><strong>{title}</strong> <br /> {companyHandle}</p>
        <p className="card-text">
          Salary:{addCommasToIntegerPart(salary)}  <br /> Equity: {equity}
        </p>
      </div>
    </div>
  );
}

export default JobCard;