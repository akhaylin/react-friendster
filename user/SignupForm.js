import userContext from "../src/context/userContext";
import { BrowserRouter, Navigate, useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import Alert from "../Alert";

/**
 *  Renders a signup form that allows a user to log in
 *
 *  Props: signup - a function from App that allows user to signup
 *
 *  State: formData - an object containing all form fields
 *         {username, password, firstName, lastName, email}
 *
 *  RouteList => SignupForm
 */
function SignupForm({ signup }) {

  const initialState = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: ""
  };

  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState(null);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(oldData => ({ ...oldData, [name]: value }));
  }

  async function handleSignup(evt) {
    evt.preventDefault();
    try {
      await signup(formData);
      setFormData(initialState);
      navigate("/");
    } catch (err) {
      setErrors(err);
    }
  }

  return (
    <div className="mx-auto mt-3" style={{ width: '400px' }}>
      <form onSubmit={handleSignup}>

        <div className="form-group">
          <label htmlFor="username" className="text-white">Username</label>
          <input className="form-control"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required

          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="text-white">Password</label>
          <input type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="firstName" className="text-white">First Name</label>
          <input type="firstName"
            className="form-control"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName" className="text-white">Last Name</label>
          <input type="lastName"
            className="form-control"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="text-white">Email</label>
          <input type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">Submit</button>

      </form>
      {errors && (<Alert alerts={errors} color={"danger"}/>)}
    </div>

  );
}

export default SignupForm;