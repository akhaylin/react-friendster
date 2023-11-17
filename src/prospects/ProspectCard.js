import React, { useContext } from 'react';
import userContext from '../context/userContext';

/**
 *  Renders one card with info about a prospect
 *
 * Props:
 * -username, firstName, lastName, hobbies, interests, zipcode, photo
 *
 *  ProspectList -> ProspectCard
 */
function ProspectCard({
  username,
  firstName,
  lastName,
  hobbies,
  interests,
  zipcode,
  photo,
  handlePreference,
  hasMatched }) {
  const currusername = useContext(userContext)?.username;

  return (
    <div className="card mt-3" style={{width: '18rem'}} id={username}>
      <img src={photo} className="card-img-top" alt={`${firstName} ${lastName}`}/>
      <div className="card-body">
        <h5 className="card-title">{firstName} {lastName}</h5>
        <ul >
          <li><b>Hobbies:</b> {hobbies}</li>
          <li><b>interests:</b> {interests}</li>
          <li><b>Zip Code:</b> {zipcode}</li>
        </ul>

        {hasMatched
        ?(<p>Messaging available in v2...</p>)
        :(
          <>
            <button className='btn btn-success' onClick={() => handlePreference(currusername, username, true)}>Like</button>
            <button className='btn btn-danger'onClick={() => handlePreference(currusername, username, false)}>Dislike</button>
          </>
        )}
      </div>
    </div>
  );
}

export default ProspectCard;