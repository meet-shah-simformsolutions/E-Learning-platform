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
function App() {

  return (
    <div className="App">
      <Navbar/>
      <PrivateRoutes exact path="/" component={Dashboard}/>
      <PrivateRoutes exact path="/Update-profile" component={UpdateProfile}/>

      <Route path="/web-development" exact component={CourseData}/>
      <Route path="/Registration" exact component={Registration}/>
      <Route path="/Workshop" exact component={WorkshopList}/>
      <Route path="/Signup" exact component={Signup}/>
      <Route path="/Login" exact component={Login}/>
      <Route path="/Forgot_Password" exact component={Forgot_password}/>
      <Route path="/Course_Description"  component={Description}/>
      <Route path="/Dashboard"  component={Dashboard}/>
      <PrivateRoutes path="/Checkout"  component={Checkout}/>



      
      {/* <Route path="/all/frontend" exact component={Frontend}/> */}

       {/* <CourseData/> */}
       {/* <Form/> */}
      {/* <Description /> */}
    </div>
  );
}

export default App;
