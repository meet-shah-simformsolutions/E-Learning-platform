import React, { Component } from "react";
import { Link,NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { useAuth } from "../contexts/AuthContext";
const Navbar = (props) => {
  const { currentUser} = useAuth()

  return (
    <>
      <div className="nav">
        <ul>
          <li className="logo">
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
          </li>

          <li>
            <div>
              <input
                className="search"
                required
                name=""
                type="text"
                placeholder="Search Everything Here"
              />
            </div>
          </li>
          <li>
            <div>
              <li>
                <NavLink to="/" exact activeStyle={{color:"black"}}>Home</NavLink>
              </li>
            </div>
          </li>
          <li>
            <div>
              <li>
                <NavLink to="/web-development" exact activeStyle={{color:"black"}}>Web Development Courses</NavLink>
              </li>
            </div>
          </li>
          <li>
            <div>
              <li>
                <NavLink to="/Workshop" exact activeStyle={{color:"black"}}>Workshop Registration</NavLink>
              </li>
            </div>
          </li>
          <li>
            <div>
              <li>
                {/* <NavLink to="/My-learning" exact activeStyle={{color:"red"}}>My learning</NavLink> */}
                {!currentUser ? (<NavLink to="/Signup" exact activeStyle={{color:"black"}}>Signup</NavLink>): (<NavLink to="/Dashboard" exact activeStyle={{color:"black"}}>Dashboard</NavLink>)}

              </li>
            </div>
          </li>
          <li>
            <div>
              <li>
                {/* <NavLink to="/My-learning" exact activeStyle={{color:"red"}}>My learning</NavLink> */}
                {currentUser ? ((<NavLink to="/My-Learning" exact activeStyle={{color:"black"}}>My Learning</NavLink>)):(<NavLink to="/Login" exact activeStyle={{color:"black"}}>Login</NavLink>)}

              </li>
            </div>
          </li>
          <li>
            <div>
              <li>
                {/* <NavLink to="/My-learning" exact activeStyle={{color:"red"}}>My learning</NavLink> */}
                <NavLink to="/Wishlist" exact activeStyle={{color:"black"}}><i className="fa fa-heart wishlistIcon" style={{fontSize:"36px"}} >
                {props.wishlist.length > 0 ? <div className="wishlistCounter">{props.wishlist.length}</div> : null }</i></NavLink>

              </li>
            </div>
          </li><li>
            <div>
              <li>
                {/* <NavLink to="/My-learning" exact activeStyle={{color:"red"}}>My learning</NavLink> */}
                <NavLink to="/Checkout" exact activeStyle={{color:"black"}}><i className="fa fa-shopping-cart cartIcon"  aria-hidden="true">
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
