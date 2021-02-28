import React, { Component } from "react";
import { NavLink } from "react-router-dom";
class Login extends Component {
  render() {
    return (
      <div>
        <div className="Login">
          <div className="title">
            <h2>
              <strong>Log In to your E-Learning Account</strong>
            </h2>
            <hr className="line" />
          </div>
          <div className="form-details">
            <form>
              <div className="container">
                <label className="container-label">
                  <img src="../img/email_1.png" alt="first name" />
                </label>
                <input
                  required
                  type="email"
                  className="container-input"
                  placeholder="Enter Email"
                />
              </div>
              <div className="container">
                <label className="container-label">
                  <img src="../img/password_1.png" alt="first name" />
                </label>
                <input
                  required
                  type="password"
                  className="container-input"
                  placeholder="Enter Password"
                />
              </div>
              <div className="container">
                <button className="login-btn">LogIn</button>
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
      </div>
    );
  }
}

export default Login;
