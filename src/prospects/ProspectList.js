import React from 'react';
import ProspectCard from './ProspectCard'
/**
 * Renders list of prospects
 *
 * Props:
 * - prospects: array like [ {prospect1}, {prospect2}, ... ]
 *
 * ProspectPage => ProspectList => ProspectCard
 */
function ProspectList({ prospects }) {

  return(
    <div className='JobsList flex-column'>
      {prospects.map(prospect => (
        <ProspectCard
          key={prospect.username}
          username={prospect.username}
          firstName={prospect.firstName}
          lastName={prospect.lastName}
          hobbies={prospect.hobbies}
          interests={prospect.interests}
          zipcode={prospect.zipcode}
          photo={prospect.photo}
        />
      ))}
    </div>
  )
}

export default ProspectList;