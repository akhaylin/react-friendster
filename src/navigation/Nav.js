import React, { useContext } from "react";
import { Link } from "react-router-dom";
import userContext from "../context/userContext";

/**
 * Renders Nav bar Links depending on if user is logged in
 *
 * App -> Nav -> {Link,...}
 */
function Nav({ logout }) {
  const username = useContext(userContext)?.username;

  /**Returns JSX for nav bar links if a user is logged in */
  function navUserLoggedIn() {
    return (
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
        <li className="nav-item nav-link">
          <Link className="nav-link" aria-current="page" to={`/matches`}><b style={{fontFamily:'monospace, monaco'}}>Matches</b></Link>
        </li>
        <li className="nav-item nav-link">
          <Link className="nav-link" aria-current="page" to={`/prospects`}><b style={{fontFamily:'monospace, monaco'}}>Start Matching</b></Link>
        </li>
        <li className="nav-item nav-link">
          <Link onClick={logout} className="nav-link" aria-current="page" to={`/`}><b style={{fontFamily:'monospace, monaco'}}>Logout: {username}</b></Link>
        </li>
      </ul>
    );
  }

  /**Returns JSX for nav bar links if a user is not logged in */
  function navUserLoggedOut() {
    return (
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
        <li className="nav-item nav-link">
          <Link className="nav-link" aria-current="page" to={`/login`}><b style={{fontFamily:'monospace, monaco'}}>Login</b></Link>
        </li>
        <li className="nav-item nav-link">
          <Link className="nav-link" aria-current="page" to={`/signup`}><b style={{fontFamily:'monospace, monaco'}}>Sign Up</b></Link>
        </li>
      </ul>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg border border-dark rounded-bottom" style={{backgroundColor: "#F5F5F5"}}>
      <div className="container-fluid">
        <Link className="navbar-brand" to={`/`}><b style={{fontFamily:'monospace, monaco'}}>Friendster.</b></Link>
        <div id="navbarSupportedContent">
          {username ? navUserLoggedIn() : navUserLoggedOut()}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
