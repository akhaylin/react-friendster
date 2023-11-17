import React from 'react';

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
  photo }) {

  return (
    <div className="card w-75 mb-3" >
      <div className="card-body">
        <img src={photo}/>
        <h3>{username}</h3>
        <ul>
          <li>{firstName} {lastName}</li>
          <li>{hobbies}</li>
          <li>{interests}</li>
          <li>{zipcode}</li>
        </ul>
      </div>
    </div>
  );
}

export default JobCard;