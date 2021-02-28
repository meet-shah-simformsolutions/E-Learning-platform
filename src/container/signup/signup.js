import React, { Component, useRef } from "react";
import "./signup.css";
import { NavLink, Redirect } from "react-router-dom";
import axios from "axios";
class Signup extends Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.state = {
      isVerified: true,
      name: "",
      email: "",
      password: "",
    };
    const emailRef = React.createRef()
    const passwordRef = React.createRef()

  }
  
  changeHandler(event) {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    });
  }
  clickHandler(event) {
      event.preventDefault()
      console.log("clicked")
      console.log(this.state)
    //   let url = 
    //   "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBpQR3y5e27axRcJHY9bjX8c2w5G-dpy_4"

    let url = "https://e-learning-2020-2021-default-rtdb.firebaseio.com/signupdata.json"
    if (this.state.isVerified) {
      axios.post(url,this.state).then((res)=>{
        console.log(res)
        alert("you signup");
        <Redirect to="/web-development"/>
        console.log("data posted")
      }).catch((error)=>{
        console.log(error)

      })
    } else {
      alert("Please Verify yourself");
    }
  }

  render() {
    return (
      <div className="Signup">
        <div className="title">
          <h2>
            <strong>Sign Up and Start Learning!</strong>
          </h2>
          <hr className="line" />
        </div>
        <div className="form-details">
          <form>
            <div className="container">
              <label className="container-label">
                <img src="../img/fname_1.png" alt="first name" />
              </label>
              <input
                
                name="name"
                type="text"
                className="container-input"
                placeholder="Enter Your Name"
                value={this.state.name}
                onChange={this.changeHandler}
              />
            </div>
            <div className="container">
              <label className="container-label">
                <img src="../img/email_1.png" alt="first name" />
              </label>
              <input
              ref={this.emailRef}
                name="email"
                required
                value={this.state.email}
                type="email"
                className="container-input"
                placeholder="Enter Email"
                onChange={this.changeHandler}
              />
            </div>
            <div className="container">
              <label className="container-label">
                <img src="../img/password_1.png" alt="first name" />
              </label>
              <input
              ref={this.passwordRef}
                name="password"
                required
                autoComplete="true"
                value={this.state.password}
                type="password"
                className="container-input"
                placeholder="Enter Password"
                onChange={this.changeHandler}
              />
            </div>

            <div className="container">
              <button
                className="signup-btn"
                onClick={this.clickHandler}
              >
                SignUp
              </button>
            </div>
            <div className="container">
              <p>
                Already have an account?{" "}
                <strong>
                  <NavLink to="/Login">LogIn</NavLink>
                </strong>
              </p>
            </div>
          </form>
          {this.state.name}
          {this.state.email}
          {this.state.password}
        </div>
      </div>
    );
  }
}

export default Signup;
