import React, { useRef, useState } from "react";

import { NavLink, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function Login(props) {
  const [alertCss, setAlertCss] = useState("danger");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const history = useHistory();
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/Dashboard");
    } catch {
      setError("Failed to Login");
    }
    setLoading(false);
  }
  return (
    <div className="Signup">
      <div className="title">
        <h2>
          <strong>Log In to your E-Learning Account</strong>
        </h2>
        <hr className="line" />
      </div>
      {error && <div className={alertCss}>{error}</div>}
      <div className="form-details">
        <form onSubmit={handleSubmit}>
          <div className="container">
            <label className="container-label">
              <img src="../img/email_1.png" alt="email" />
            </label>
            <input
              ref={emailRef}
              name="email"
              required
              type="email"
              className="container-input"
              placeholder="Enter Email"
            />
          </div>
          <div className="container">
            <label className="container-label">
              <img src="../img/password_1.png" alt="password" />
            </label>
            <input
              ref={passwordRef}
              name="password"
              required
              autoComplete="true"
              type="password"
              className="container-input"
              placeholder="Enter Password"
            />
          </div>

          <div className="container">
            <button disabled={loading} className="signup-btn">
              LogIn
            </button>
          </div>
          <div className="container">
            <p>
              {" "}
              <strong>
                <NavLink to="/Forgot_Password" className="forgot_password">
                  Forgot Password?
                </NavLink>
              </strong>
            </p>
          </div>
          <div className="container">
            <p>
              Don't have an account?{" "}
              <strong>
                <NavLink to="/Signup">SignUp</NavLink>
              </strong>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
