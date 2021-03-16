import React, { Component, useRef, useState,useEffect } from "react";
import "./signup.css";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
function Signup(props) {
  console.log("component rendered")
  // const [isVerified, setisVerified] = useState(true);
  // const [name, setName] = useState();
  // const [email, setEmail] = useState();
  // const [password, setPassword] = useState();
  // const [confirmPassword, setConfirmPassword] = useState();
  const [alertCss, setAlertCss] = useState("danger");
  const [error,setError] = useState("")
  const [loading,setLoading] = useState(false)
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup, currentUser } = useAuth();
  const history = useHistory()

  useEffect(() => {
    if(currentUser){
      props.setUserId(props.userId)
    }
  }, [])
  async function handleSubmit (e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }
    try{
      setError("")
      setLoading(true)
      await signup(emailRef.current.value,passwordRef.current.value)
      history.push("/Dashboard")
    }catch{
    
      
      setError("Failed to create an Account")
    }
    setLoading(false)
  }

  


// const changeHandler = (event) => {
//   this.setState({
//     ...this.state,
//     [event.target.name]: event.target.value,
//   });
// };
// const clickHandler = (event) => {
//   event.preventDefault();
//   console.log("clicked");
//   console.log(this.state);
//   //   let url =
//   //   "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBpQR3y5e27axRcJHY9bjX8c2w5G-dpy_4"

//   let url =
//     "https://e-learning-2020-2021-default-rtdb.firebaseio.com/signupdata.json";
//   if (this.state.isVerified) {
//     axios
//       .post(url, this.state)
//       .then((res) => {
//         console.log(res);
//         alert("you signup");
//         <Redirect to="/Registration" />;
//         console.log("data posted");
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   } else {
//     alert("Please Verify yourself");
//   }
// };
console.log("rendered")
return (
  <div className="Signup">
    <div className="title">
      <h2>
        <strong>Sign Up and Start Learning!</strong>
      </h2>
      <hr className="line" />
    </div>
    {error && <div className={alertCss}>{error}</div>}
    <div className="form-details">
      <form onSubmit={handleSubmit}> 
        {/* <div className="container">
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
            </div> */}

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
        {/* testing */}
        <div className="container">
          <label className="container-label">
            <img src="../img/password_1.png" alt="confirm password" />
          </label>
          <input
            ref={passwordConfirmRef}
            name="confirm_password"
            required
            autoComplete="true"
            type="password"
            className="container-input"
            placeholder="Confirm Password"
          />
        </div>
        {/* testing */}

        <div className="container">
          <button  disabled={loading} className="signup-btn">
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
    </div>
  </div>
);
}
const mapStateToProps = (state) => {
  return {
    userId:state.cartDetails.userId
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
   setUserId:(id)=>dispatch(actions.setUserId(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
