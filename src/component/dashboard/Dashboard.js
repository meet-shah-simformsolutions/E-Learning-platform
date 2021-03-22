import React, { useState,useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import "./dashboard.css"
import { SuccessAlert } from "../Alert/SuccessAlert";
function Dashboard(props) {
  const { currentUser, logout } = useAuth();
  const [alertCss, setAlertCss] = useState("danger");
  const [error, setError] = useState();
  const history = useHistory();

  useEffect(() => {
    if(currentUser){
      props.setUserId(currentUser.uid)
      if(props.formatState){
        props.setFormat(currentUser.uid)
      }
      console.log(props.toastState);
      props.setFormateState()
      props.getWishlistData(currentUser.uid)
      props.getCartData(currentUser.uid)
      setTimeout(() => {
        props.setToast()
      }, 1000);
      setTimeout(() => {
    window.sessionStorage.setItem("user", "set");
      }, 5000);
      
    }
  }, [])
  setTimeout(() => {
    console.log("current uSer",currentUser)
    console.log(props.formatState)

  }, 1000);
  async function handleLogout() {
    setError("");
    try {
      await logout();
    window.sessionStorage.setItem("user", "");

      history.push("/Login");
    } catch {
      setError("Failed to Logout");
    }
  }
  let currentUser_email = currentUser ? `Welcome ${currentUser.email}` : null
  return (
    <div className="dashboard_container">
      <div className="main_dashboard">
      
      {window.sessionStorage.getItem("user") ?  null : <SuccessAlert msg={currentUser_email} />}
      <div>
      {error && <div className={alertCss}>{error}</div>}
      Profile:
      </div>
      <div className="success">Welcome {currentUser?.email} </div>
      <div className="update-btn">
        <Link to="/Update-profile">Update Profile</Link>
      </div>
      <button onClick={handleLogout} className="logout-btn ">
        Logout
      </button>
      </div>
    </div>
  );
}
const mapStateToProps = state =>{
  return{
      details:state.cartDetails.price,
    userId:state.cartDetails.userId,
    currentUser:state.cartDetails.currentUser,
    toastState: state.cartDetails.toastState,
    formatState:state.cartDetails.formatState,
  }
}
const mapDispatchToProps = dispatch =>{
  return{
    change:(e)=> dispatch(actions.addDetails(e.target.value)),
    setData:(res)=>dispatch(actions.setData(res)),
   setUserId:(id)=>dispatch(actions.setUserId(id)),
   getWishlistData:(id)=> dispatch(actions.getWishlistData(id)),
   setFormat:(id)=>dispatch(actions.setFormat(id)),
   setFormateState:()=>dispatch(actions.setFormateState()),
    setToast:()=>dispatch(actions.setToast()),
    getCartData:(id)=>dispatch(actions.getCartData(id)),
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);

