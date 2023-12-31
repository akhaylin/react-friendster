import { BrowserRouter, Navigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import './App.css';
import Nav from './navigation/Nav';
import RouteList from './navigation/RouteList';
import userContext from './context/userContext';
import FriendsterApi from './api';
import { jwtDecode } from 'jwt-decode';
import Loading from './Loading';

/**Renders App
 * App -> {Nav, RouteList}
 */
function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoading, setIsloading] = useState(true)


  useEffect(function () {
    async function fetchUserInfo() {
      if (token) {
        localStorage.setItem("token", token)
        FriendsterApi.token = token;
        const userInfo = jwtDecode(token);
        try {
          let user = await FriendsterApi.getUserInfo(userInfo.username);
          setUser(user);
        } catch (err) {
          console.error(err);
        }
      } else {
        localStorage.clear();
        setUser(null);
      }
      setIsloading(false);
    }

    fetchUserInfo();

  }, [token]);

  /**Function to be called in signup form to call API and register user */
  async function signup(formData) {
    console.log("IN SIGNUP IN APP", formData)
    let res = await FriendsterApi.signup(formData);
    setToken(res.token);
  }

  /**Function to be called in login form to call API and login the user*/
  async function login(formData) {
    console.log("IN LOGIN FUNC APP", token, formData)
    let res = await FriendsterApi.login(formData);
    console.log("IN login after db call", res.token)
    setToken(res.token);
  }


  /**Function to logout a user, resets user state to null */
  function logout() {
    setToken(null);
  }

  if (isLoading) return <Loading />

  return (
    <userContext.Provider value={user}>
      <BrowserRouter>
        <Nav logout={logout} />
        <div className='App container'>
          <div className='row'>
            <div className='col-9 mx-auto'>
              <RouteList signup={signup} login={login} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
