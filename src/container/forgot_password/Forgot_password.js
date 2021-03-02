import React, { useRef, useState } from "react";

import {  useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
function Forgot_Password (props){
  const [alertCss, setAlertCss] = useState("danger");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg,setMsg] = useState('')
  const emailRef = useRef();
  const history = useHistory();
  const {resetPassword} = useAuth()
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMsg('Check your inbox for further instructions')
      setAlertCss("success")
      setTimeout(()=>{
        history.push("/Login")
      },1000)
    
    } catch {
      setError("Failed to reset Password");
    }
    setLoading(false);
  }
    return (
      <div>
        <div className="Signup">
          <div className="title">
            <h2>
              <strong>Forgot Password</strong>
            </h2>
            <hr className="line" />
          </div>
          {msg &&  <div className={alertCss}>{msg}</div>}
          {error && <div className={alertCss}>{error}</div>}
          <div className="form-details">
          <form>
            <div className="container">
              <label className="container-label">
                <img src="../img/email_1.png" alt="first name" />
              </label>
              <input
              ref={emailRef}
                required
                type="email"
                className="container-input"
                placeholder="Enter Email"
              />
            </div>
            <div className="container">
            <button disabled={loading} className="reset-btn" onClick={handleSubmit} >
                Reset
              </button>
              
            </div>
            </form>
          </div>
        </div>
      </div>
    );
  
}

export default Forgot_Password;
