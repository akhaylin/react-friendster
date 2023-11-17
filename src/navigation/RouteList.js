import React, { useContext, useState }from "react";
import { Route, Routes, Navigate } from 'react-router-dom';
import HomePage from "../HomePage";
import ProspectPage from "../prospects/ProspectPage";
import LoginForm from "../user/LoginForm"
import SignupForm from "../user/SignupForm"
import userContext from "../context/userContext";
import MatchList from "../matches/MatchesList";

/**
 * Registers routes
 *
 * App => RouteList -> Routes -> {Route, Route....}
 *
 */
function RouteList({signup, login, update}) {
  const username = useContext(userContext)?.username;
  console.log("USERNAME IN ROUTE LIST", username)

  const routesLoggedIn =
   (
      <>
        {/* <Route element={<MatchesPage />} path="/matches" /> */}
        <Route element={<ProspectPage />} path="/prospects" />
        <Route element={<MatchList />} path="/matches"/>
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