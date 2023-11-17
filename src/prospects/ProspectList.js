import React, { useContext }from 'react';
import ProspectCard from './ProspectCard'
import userContext from '../context/userContext';
/**
 * Renders list of prospects
 *
 * Props:
 * - prospects: array like [ {prospect1}, {prospect2}, ... ]
 *
 * ProspectPage => ProspectList => ProspectCard
 */
function ProspectList({ prospects, handlePreference}) {
  const friendRadius = useContext(userContext)?.friendRadius;
  return(
    <div className='JobsList flex-column mt-3'>
      <h2>Potential friends within {friendRadius} miles:</h2>
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
          handlePreference={handlePreference}
          hasMatched={false}
        />
      ))}
    </div>
  )
}

export default ProspectList;