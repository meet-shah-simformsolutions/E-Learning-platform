import React, { useEffect, useState } from "react";
import './App.css';
import "./css/form_style.css"
import "./css/course-container.css"
import "./css/Navbar_style.css"
import "./css/desc_style.css"
// import Form from "./component/form"
import Navbar from "./component/Navbar"
import CourseData from './component/CourseData';
import Description from "./component/Description"
// import Frontend from "./component/Frontend"
// import {BrowserRouter as Router,NavLink, Redirect, Prompt, Link} from 'react-router-dom';
import Route from 'react-router-dom/Route';
// import { Link } from 'react-router-dom';
import Registration from "./component/Registration"
import Signup from './container/signup/signup';
import Login from "./container/login/Login";
// import Recaptcha from "react-recaptcha"
import Forgot_password from './container/forgot_password/Forgot_password';
import Dashboard from './component/dashboard/Dashboard';
import PrivateRoutes from './container/PrivateRoutes';
import UpdateProfile from './component/Update_Profile/UpdateProfile';
import {  useAuth } from "./contexts/AuthContext";
import WorkshopList from './component/Workshop/WorkshopList';
import Checkout from './component/checkout/checkout';
import WishList from './component/wishlist/WishList';
import MyLearning from './component/MyLearning/MyLearning';
import LandingPage from './component/LandingPage/LandingPage';
import NewsFeed from "./component/NewsFeed/NewsFeed"
// import * as actions from "../store/actions/index";
import { connect } from "react-redux";
import Admin from "./component/Admin/Admin";
function App(props) {
  const [notifyDisplay, setNotifyDisplay] = useState(false)
  return (
    <div className="App" >
      <Navbar/>
      <Route path="/Admin" exact component={Admin}/>

      <PrivateRoutes exact path="/" component={Dashboard} msg="Please login to view dashboard"/>
      <PrivateRoutes exact path="/Update-profile" component={UpdateProfile}/>
      <Route path="/Home" exact component={LandingPage}/>
      <Route path="/Courses/:value" exact component={CourseData}/>
      <Route path="/Registration" exact component={Registration}/>
      <Route path="/Workshop" exact component={WorkshopList}/>
      <Route path="/Signup" exact component={Signup}/>
      <Route path="/Login" exact component={Login}/>
      <Route path="/Forgot_Password" exact component={Forgot_password}/>
      <Route path="/Course_Description/:value"  component={Description}/>
      <Route path="/Dashboard"  component={Dashboard}/>
      <Route path="/NewsFeed" exact component={NewsFeed}/>
      
      <PrivateRoutes path="/Notification"  exact component={Notification} msg="Please login to Notification"/>
      <PrivateRoutes path="/Checkout"  component={Checkout} msg="Please login to view cart"/>
      <PrivateRoutes path="/Wishlist"  component={WishList} msg="Please login to view wishlist"/>
      <PrivateRoutes path="/My-Learning"  component={MyLearning} msg="Please login to view Learning"/>



      
      {/* <Route path="/all/frontend" exact component={Frontend}/> */}

       {/* <CourseData/> */}
       {/* <Form/> */}
      {/* <Description /> */}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
