import React, { Component, useEffect, useState } from "react";
import { Link,NavLink } from "react-router-dom";
import * as actions from "../store/actions/index"
import { connect } from "react-redux";
import { useAuth } from "../contexts/AuthContext";
import Notification from "./Notification/Notification";
import color from "../color.jsx"
const Navbar = (props) => {
  const [newcolor,setNewColor] = useState("black")
  const { currentUser} = useAuth()
  useEffect(() => {
    console.log(props.wishlist.length);
    console.log("notifi.",props.notificationState);
    console.log(props.notificationItems.length);
    // autoChangeColor()
    return () => {
      
    }
  }, [])
const autoChangeColor  = () => {
  const r = document.querySelector(':root');
  setInterval(() => {
    const value = Math.floor(100000 + Math.random() * 900000)
    const newValue = `#${value}`
    console.log(newValue);
    r.style.setProperty('--black', newValue )
  }, 1000);
}
  const changeColor = () =>{
    let colorName = prompt("Enter Color Name",newcolor)
    console.log(color);
    console.log(colorName);
    console.log(color.includes(colorName))
    // if(color.includes(colorName)){
      setNewColor(colorName)
      const r = document.querySelector(':root');
      r.style.setProperty('--black', colorName)
      // myFunction_get()
      // function myFunction_get() {
      //   const rs = getComputedStyle(r);
      //   // alert("The value of --whitesmoke is: " + rs.getPropertyValue('--whitesmoke'));
      // }
      // function myFunction_set() {
      //   r.style.setProperty('--blue', 'lightblue');
      // }
      // let today = new Date();
      // let hour = today.getHours();
      // if(hour>=6 && hour<12){
      //   r.style.setProperty('--black', 'white');
      // }
      // if(hour>=12){
      //   r.style.setProperty('--black', colorName);
      // }
      // if(hour>=18 && hour<6){
      //   r.style.setProperty('--black', 'black');
      // }
    // }
    // else{
    //   alert("Enter Valid Color Name")
    // }
    
  }
  const handleMouseClicked = () => {
    console.log("nav called");
    props.showNotification()
  }
  // const handleMouseLeave = () => {
  //   props.showNotification()
    
  // }
  return (
    <>
      <div className="nav">

        <ul>
          {/* <li className="logo">
            <div>
              <li>
            <NavLink to="/" exact activeStyle={{color:"blue"}}>

              <img
                src="../img/simform-logo.png"
                alt="img"
                className="main_logo"
              />
              </NavLink>
              </li>
            </div>
          </li> */}
          <li onClick={()=>changeColor()}>
                    <i class="fas fa-palette" aria-hidden="true" title="change Color" style={{fontSize:"32px"}}>
                </i>  
          </li>
          <li>
            <div>
              <li>
                <NavLink to="/Home" exact activeStyle={{color:"black"}}> 
                <img
                // src="../img/simform-logo.png"
                src="../img/test-1-logo.png"
                alt="img"
                className="main_logo"
              />
              </NavLink>
              </li>
            </div>
          </li>

          <li>
            <div>
              <li>
              <input
                className="search"
                required
                name=""
                type="text"
                placeholder="Search Everything Here"
              />
              </li>
            </div>
          </li>

          <li>
            <div>
              <li className="bottom-line">
                <NavLink to="/Home" exact activeStyle={{color:"orange"}}>Home</NavLink>
              </li>
            </div>
          </li>

          <li>
            <div>
              <li className="bottom-line">
                <NavLink to="/Courses/all" exact activeStyle={{color:"orange"}}>Courses</NavLink>
              </li>
            </div>
          </li>

          <li>
            <div>
              <li className="bottom-line">
                <NavLink to="/Workshop" exact activeStyle={{color:"orange"}}>Workshop Registration</NavLink>
              </li>
            </div>
          </li>
          <li>
            <div>
              <li className="bottom-line">
                <NavLink to="/NewsFeed" exact activeStyle={{color:"orange"}}>News Feed</NavLink>
              </li>
            </div>
          </li>
          <li>
            <div>
              <li className="bottom-line">
                {/* <NavLink to="/My-learning" exact activeStyle={{color:"red"}}>My learning</NavLink> */}
                {!currentUser ? (<NavLink to="/Signup" exact activeStyle={{color:"orange"}}>Signup</NavLink>): (<NavLink to="/Dashboard" exact activeStyle={{color:"orange"}}>Dashboard</NavLink>)}

              </li>
            </div>
          </li>

          <li>
            <div>
              <li className="bottom-line">
                {/* <NavLink to="/My-learning" exact activeStyle={{color:"red"}}>My learning</NavLink> */}
                {currentUser ? ((<NavLink to="/My-Learning" exact activeStyle={{color:"orange"}}>My Learning</NavLink>)):(<NavLink to="/Login" exact activeStyle={{color:"orange"}}>Login</NavLink>)}

              </li>
            </div>
          </li>
         
          <li>
            <div onClick={()=>handleMouseClicked()}
                  // onMouseLeave={()=>handleMouseLeave()}
                 >
                    {props.notificationState ? (<Notification/>) : null}
              <li className="notification">
              {currentUser ? ( 
                // <NavLink to="" exact activeStyle={{color:"orange"}}>
                  <i class="fa fa-bell notificationIcon" aria-hidden="true" title="notification" style={{fontSize:"32px"}}>
                    {props.notificationItems.length > 0 ? <div className="notificationCounter">{props.notificationItems.length}</div> : null }
                </i>
              //</NavLink>
                ):null}

              </li>
            </div>
          </li>
          <li>
            <div>
              <li >
                {/* <NavLink to="/My-learning" exact activeStyle={{color:"red"}}>My learning</NavLink> */}
                <NavLink to="/Wishlist" exact activeStyle={{color:"orange"}}><i className="fa fa-heart wishlistIcon" style={{fontSize:"32px"}}  title="wishlist">
                {props.wishlist.length > 0 ? <div className="wishlistCounter">{props.wishlist.length}</div> : null }</i></NavLink>

              </li>
            </div>
          </li>

          <li>
            <div >
              <li >
                {/* <NavLink to="/My-learning" exact activeStyle={{color:"red"}}>My learning</NavLink> */}
                <NavLink to="/Checkout" exact activeStyle={{color:"orange"}}><i className="fa fa-shopping-cart cartIcon"  aria-hidden="true" title="cart" style={{fontSize:"32px"}}>
                  {props.cart.length > 0 ? <div className="cartCounter">{props.cart.length}</div> : null }</i></NavLink>

              </li>
            </div>
          </li>
          
          {/* <a href="https://github.com">
            <li>
              <div className="fav_logo">
                <img src="../img/fav.png" alt="fav" />
              </div>
            </li>
          </a> */}
        </ul>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cartDetails.cart,
    wishlist:state.cartDetails.wishlist,
    currentUser:state.cartDetails.currentUser,
    userId:state.cartDetails.userId,
    notificationState:state.cartDetails.notificationState,
    notificationItems:state.cartDetails.notificationItems
  };
};
const mapDispatchToProps = dispatch => {
return{
  showNotification:()=>dispatch(actions.showNotification())
}
}
export default connect(mapStateToProps,mapDispatchToProps)(Navbar);
