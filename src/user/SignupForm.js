import userContext from "../context/userContext";
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
    email: "",
    hobbies:"",
    interests:"",
    zipcode:"",
    friendRadius:"",
    image:""
  };

  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState(null);

  function handleChange(evt) {
    const { name, value, files } = evt.target;
    if (name === "image"){
      setFormData(oldData => ({...oldData, image: files[0] }))
    }else{
      setFormData(oldData => ({ ...oldData, [name]: value }));
    }

  }

  async function handleSignup(evt) {
    evt.preventDefault();
    const formDataObj = new FormData();

    // Object.keys(formData).forEach(key => {
    //   formDataObj.key(key, formData[key])
    // })

    // for (const key in formData){
    //   if( key !== "image"){
    //     formDataObj[key] = formData[key]
    //   }

    // }
    for (const key in formData){
      if( key === "image" && formData[key]){
        formDataObj[key] = formData[key]
      } else if (key !== "image") {
        formDataObj[key] = formData[key]
      }
    }

    try {
      console.log("RegFORMDATA", formData)
      console.log("FORMDATA TYPE IN SIGNUP", typeof formDataObj)
      await signup(formDataObj);
      setFormData(initialState);
      navigate("/");
    } catch (err) {
      setErrors(err);
    }
  }

  return (
    <div className="mx-auto mt-3" style={{ width: '400px' }}>
      <form onSubmit={handleSignup} encType="multipart/form-data" >
        <h1>Sign Up</h1>

        <div className="form-group">
          <label htmlFor="username" >Username</label>
          <input className="form-control"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required

          />
        </div>

        <div className="form-group">
          <label htmlFor="password" >Password</label>
          <input type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="firstName" >First Name</label>
          <input type="firstName"
            className="form-control"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName" >Last Name</label>
          <input type="lastName"
            className="form-control"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" >Email</label>
          <input type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="hobbies" >Hobbies</label>
          <textarea
            className="form-control"
            name="hobbies"
            value={formData.hobbies}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="interests" >Interests</label>
          <textarea
            className="form-control"
            name="interests"
            value={formData.interests}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="zipcode" >Zip Code</label>
          <input
            type="number"
            className="form-control"
            name="zipcode"
            value={formData.zipcode}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="friendRadius" >Friend Radius (miles)</label>
          <input
            type="text"
            className="form-control"
            name="friendRadius"
            value={formData.friendRadius}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image" >Proile Photo</label>
          <input
            type="file"
            className="form-control"
            name="image"
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