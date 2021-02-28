import React, { Component } from 'react';
import "../css/Navbar_style.css"
import "../css/course-container.css"
const LoadMoredata = (props) => {
    // constructor(props){
        
    // }
    
         (
            <div>
          <div className="course-container">
            <div className="course_data">
                <img alt="course-img" src={props.data.courseImg} />
              <div className="courseName">{props.data.courseName}</div>
              <div className="price_data">
                <img alt="price" className="price_tag" src="../img/price.png" />
                &nbsp;
                <div className="price">{props.data.price}/-</div>
              </div>
              <button className="price_btn">Add to Cart</button>
            </div>
          </div>
        
            </div>)}
            
 export default LoadMoredata;