import React, { useEffect, useState } from 'react';
import ProspectList from "./ProspectList";
import Loading from '../Loading';
import FriendsterApi from '../api';
import Alert from '../Alert';


/**
 *  Renders ProspectPage
 *
 *  State:
 * - prospects: array like [ {prospect1}, {prospect2}, ... ]
 *
 *  RouteList => ProspectPage => ProspectList
 */
function ProspectPage() {
    const [prospects, setProspects] = useState(null);
    const [errors, setErrors] = useState(null);
    const [isLoading, setIsloading] = useState(true)

  useEffect(function getProspects() {
      setIsloading(false)
      fetchProspects();
  },[]);

  /**Fetch list of Prospects from API and set the result as state */
  async function fetchProspects() {
    try{
      const prospects = await FriendsterApi.getWithinRadius();
      setProspects(prospects);
      setErrors(null)
    }catch (err) {
      setErrors(err)
    }
  }

  async function handlePreference(username, targetUsername, isLiked) {
    try{
      await FriendsterApi.likeOrDislike({username, targetUsername, isLiked})
      const updatedProspects = prospects.filter(user => user.username !== targetUsername)
      setProspects(updatedProspects)
    }catch(err){
      setErrors(err)
    }
  }

  const noProspectsHtml = <div><h2 className='text-white'>No prospective friends found!</h2></div>

  if(isLoading) return <p>Loading...</p>

  return(
    <div>
      {prospects
      ? <ProspectList prospects={prospects} handlePreference = {handlePreference}/>
      :noProspectsHtml}
      {errors && (<Alert alerts={errors} color={"danger"}/>)}
    </div>
  )
}

export default ProspectPage;