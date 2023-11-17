import React, { useEffect, useState }from 'react';
import ProspectCard from '../prospects/ProspectCard'
import userContext from '../context/userContext';
import FriendsterApi from '../api';
import Alert from '../Alert';

/**
 * Renders list of prospects
 *
 * Props:
 * - prospects: array like [ {prospect1}, {prospect2}, ... ]
 *
 * ProspectPage => ProspectList => ProspectCard
 */
function MatchList() {
  const [matches, setMatches] = useState([])
  const [isLoading, setIsloading] = useState(true)
  const [errors, setErrors] = useState(null)

  useEffect(function getProspects() {
    fetchMatches();
    setIsloading(false)
  },[]);

  /**Fetch list of Prospects from API and set the result as state */
  async function fetchMatches() {
    try{
      const matches = await FriendsterApi.getMatches();
      console.log(matches)
      setMatches(matches);
      setErrors(null)
    }catch (err) {
      setErrors(err)
    }
  }
  console.log("IN MATCHLIST", matches)

  if(isLoading) return <p>Loading...</p>

  return(
    <div className='JobsList flex-column mt-3'>
      <h2>You have {matches.length} matches!</h2>
      {matches.map(match => (
        <ProspectCard
          key={match.username}
          username={match.username}
          firstName={match.firstName}
          lastName={match.lastName}
          hobbies={match.hobbies}
          interests={match.interests}
          zipcode={match.zipcode}
          photo={match.photo}
          hasMatched={true}
        />
      ))}
    </div>
  )
}

export default MatchList;