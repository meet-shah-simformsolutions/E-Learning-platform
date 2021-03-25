import React, { Component, useRef, useState } from "react";

import { NavLink, Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
function UpdateProfile(props) {
  console.log("component rendered")
  
  const [alertCss, setAlertCss] = useState("danger");
  const [error,setError] = useState("")
  const [loading,setLoading] = useState(false)
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const history = useHistory()
  const [msg,setMsg] = useState('')
  
   function handleSubmit (e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }
    const promises = []
    setLoading(true)
    setError('')
    if(emailRef.current.value !== currentUser.email){
        promises.push(updateEmail(emailRef.current.value))
        setAlertCss("success")
        setMsg("Details Updated")
    }
    if(passwordRef.current.value){
        promises.push(updatePassword(passwordRef.current.value))
        setAlertCss("success")
        setMsg("Details Updated")

    }
    Promise.all(promises).then(()=>{
      console.log(Promise)
      setTimeout(()=>{
        history.push("/Login")
      },1000)
    
    }).catch(error => {
        setError("Failed to update details")
    }).finally(()=>{
        setLoading(false)
    })
    
  }
console.log("rendered")
return (
  <div className="Signup">
    <div className="title">
      <h2>
        <strong className="white">Update-Profile</strong>
      </h2>
      <hr className="line" />
    </div>
    {msg &&  <div className={alertCss}>{msg}</div>}
    {error && <div className={alertCss}>{error}</div>}
    <div className="form-details">
      <form  onSubmit={handleSubmit}> 

        <div className="container">
          <label className="container-label">
            <img src="../img/email_1.png" alt="email" />
          </label>
          <input
            ref={emailRef}
            name="email"
            required
            type="email"
            defaultValue={currentUser.email}
            className="container-input"
          />
        </div>
        <div className="container">
          <label className="container-label">
            <img src="../img/password_1.png" alt="password" />
          </label>
          <input
            ref={passwordRef}
            name="password"
            
            autoComplete="true"
            type="password"
            className="container-input"
            placeholder="Leave blank to keep the same"
          />
        </div>
        {/* testing */}
        <div className="container">
          <label className="container-label">
            <img src="../img/password_1.png" alt="confirm password" />
          </label>
          <input
            ref={passwordConfirmRef}
            name="confirm_password"
            
            autoComplete="true"
            type="password"
            className="container-input"
            placeholder="Leave blank to keep the same"
          />
        </div>
        {/* testing */}

        <div className="container">
          <button disabled={loading} className="signup-btn">
            Update
          </button>
        </div>
        <div className="container">
          <p>
            
            <strong className="white">
              <NavLink to="/">Cancel</NavLink>
            </strong>
          </p>
        </div>
      </form>
    </div>
  </div>
);
}
export default UpdateProfile;
