import React, { useContext, useState }from "react";
import { Route, Routes, Navigate } from 'react-router-dom';
import HomePage from "../HomePage";
import ProspectPage from "../prospects/ProspectPage";
import LoginForm from "../user/LoginForm"
import SignupForm from "../user/SignupForm"
import userContext from "../context/userContext";

/**
 * Registers routes
 *
 * App => RouteList -> Routes -> {Route, Route....}
 *
 */
function RouteList({signup, login, update}) {
  const username = useContext(userContext)?.username;

  const routesLoggedIn =
   (
      <>
        {/* <Route element={<MatchesPage />} path="/matches" /> */}
        <Route element={<ProspectPage />} path="/prospects" />
      </>
    )

  const routesLoggedOut =
   (
      <>
        <Route element={<SignupForm signup={signup}/>} path="/signup" />
        <Route element={<LoginForm login={login}/>} path="/login" />
      </>
    )

  return (
    <Routes>
      {username ? routesLoggedIn : routesLoggedOut};
      <Route element={<HomePage />} path="/" />
      <Route element={<Navigate to="/"/>} path="*"/>
    </Routes>
  )
}

export default RouteList;