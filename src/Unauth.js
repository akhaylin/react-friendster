import React, { useContext } from 'react';
import userContext from './context/userContext';

/**
 * Unauthorized renders text to show user if user is on page they dont have access to
 * RouteList -> Unauthorized
 */
function Unauthorized() {
  const username = useContext(userContext)?.username;

  return (
    <div>
      <h1 className='text-white'>Only logged {username ? "out" : "in"} users can access this page!</h1>
    </div>
  );
}

export default Unauthorized;