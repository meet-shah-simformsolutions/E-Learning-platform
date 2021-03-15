import React, { useState,useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";

function Dashboard(props) {
  const { currentUser, logout } = useAuth();
  const [alertCss, setAlertCss] = useState("danger");
  const [error, setError] = useState();
  const history = useHistory();

  useEffect(() => {
    if(currentUser){
      props.setUserId(currentUser.uid)
      props.getWishlistData(currentUser.uid)
    }
  }, [])
  setTimeout(() => {
    console.log(props.userId)
  }, 1000);
  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push("/Login");
    } catch {
      setError("Failed to Logout");
    }
  }
  return (
    <div className="dashboard_container">
      {error && <div className={alertCss}>{error}</div>}
      Profile:
      <div className="success">Welcome {currentUser?.email} </div>
      <div className="update-btn">
        <Link to="/Update-profile">Update Profile</Link>
      </div>
      <button onClick={handleLogout} className="logout-btn ">
        Logout
      </button>
    </div>
  );
}
const mapStateToProps = state =>{
  return{
      details:state.cartDetails.price,
    userId:state.cartDetails.userId,
    currentUser:state.cartDetails.currentUser
  }
}
const mapDispatchToProps = dispatch =>{
  return{
    change:(e)=> dispatch(actions.addDetails(e.target.value)),
    setData:(res)=>dispatch(actions.setData(res)),
   setUserId:(id)=>dispatch(actions.setUserId(id)),
   getWishlistData:(id)=> dispatch(actions.getWishlistData(id))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);

