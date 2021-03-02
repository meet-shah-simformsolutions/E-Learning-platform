import React, { Component } from "react";
import { Link,NavLink } from "react-router-dom";
const Navbar = () => {

  return (
    <>
      <div className="nav">
        <ul>
          <li className="logo">
            <div>
              <li>
            <NavLink to="/" exact activeStyle={{color:"red"}}>

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
                <NavLink to="/" exact activeStyle={{color:"red"}}>Home</NavLink>
              </li>
            </div>
          </li>
          <li>
            <div>
              <li>
                <NavLink to="/web-development" exact activeStyle={{color:"red"}}>Web Development Courses</NavLink>
              </li>
            </div>
          </li>
          <li>
            <div>
              <li>
                <NavLink to="/Registration" exact activeStyle={{color:"red"}}>Registration</NavLink>
              </li>
            </div>
          </li>
          <li>
            <div>
              <li>
                {/* <NavLink to="/My-learning" exact activeStyle={{color:"red"}}>My learning</NavLink> */}
                <NavLink to="/Signup" exact activeStyle={{color:"red"}}>Signup</NavLink>

              </li>
            </div>
          </li>
          <li>
            <div>
              <li>
                {/* <NavLink to="/My-learning" exact activeStyle={{color:"red"}}>My learning</NavLink> */}
                <NavLink to="/Login" exact activeStyle={{color:"red"}}>Login</NavLink>

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

export default Navbar;
