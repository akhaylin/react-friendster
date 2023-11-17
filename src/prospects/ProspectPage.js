import React, { useEffect, useState } from 'react';
import ProspectList from "./ProspectList";
import Loading from '../Loading';
import FriendsterApi from '../api';

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

  useEffect(function getProspects() {
      fetchProspects();
  },[]);

  /**Fetch list of Prospects from API and set the result as state */
  async function fetchProspects() {
    const prospects = await FriendsterApi.getWithinRadius();

    setProspects(prospects);
  }

  if (prospects === null) return <Loading />;

  const noProspectsHtml = <div><h2 className='text-white'>No prospective friends found!</h2></div>

  return(
    <div>
      {prospects.length === 0
      ? noProspectsHtml
      :<ProspectList prospects={prospects}/>}
    </div>
  )
}

export default ProspectPage;