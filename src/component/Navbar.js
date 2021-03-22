import React, { Component, useEffect } from "react";
import { Link,NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { useAuth } from "../contexts/AuthContext";
const Navbar = (props) => {
  const { currentUser} = useAuth()
  useEffect(() => {
    console.log(props.wishlist.length);
    return () => {
      
    }
  }, [])
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
                <a href="#">

              <input
                className="search"
                required
                name=""
                type="text"
                placeholder="Search Everything Here"
              />
              </a>
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
                <NavLink to="/web-development/all" exact activeStyle={{color:"orange"}}>Web Development Courses</NavLink>
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
            <div>
              <li >
                {/* <NavLink to="/My-learning" exact activeStyle={{color:"red"}}>My learning</NavLink> */}
                <NavLink to="/Wishlist" exact activeStyle={{color:"orange"}}><i className="fa fa-heart wishlistIcon" style={{fontSize:"36px"}} >
                {props.wishlist.length > 0 ? <div className="wishlistCounter">{props.wishlist.length}</div> : null }</i></NavLink>

              </li>
            </div>
          </li>

          <li>
            <div>
              <li >
                {/* <NavLink to="/My-learning" exact activeStyle={{color:"red"}}>My learning</NavLink> */}
                <NavLink to="/Checkout" exact activeStyle={{color:"orange"}}><i className="fa fa-shopping-cart cartIcon"  aria-hidden="true">
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
    userId:state.cartDetails.userId
  };
};
export default connect(mapStateToProps,null)(Navbar);
