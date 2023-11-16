import './HomePage.css';
import userContext from './context/userContext';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

/**
 * Renders Homepage
 *
 *  RouteList => HomePage
 */
function HomePage() {

  const firstName = useContext(userContext)?.firstName;

  const toDisplay = firstName
    ? <p> Welcome back, {firstName}</p>
    : (
      <>
        <Link to={'/login'}>
          <button className="btn btn-primary">Login</button>
        </Link>

        <Link to={'/signup'}>
          <button className="btn btn-primary mt-2">Signup</button>
        </Link>
      </>
    );

  return (
    <div className='HomePage-container '>
      <h1 className='shadow-sm'>Friendster</h1>
      <p>Loner? Look no further.</p>
      {toDisplay}
    </div>

  );
}

export default HomePage;