import React,{useEffect} from "react";
import { Link } from "react-router-dom";
import * as actions from "../../store/actions/index";

import { connect } from "react-redux";
function PurchasedCourse(props) {
  useEffect(() => {
    // console.log("inside comp")
    
  }, [])
  
  return props.fetchedOrder.map((data, i) => {
    console.log("data",data)
    return (
      <div>
        <fieldset>
      <legend>
        {data.docName}
      </legend>
     
        {data.purchasedCourse.map((data)=>{
          console.log(data.courseImg);
          return(

        <div className="listOfPurchasedCourse">
          <div className=" courseLogo myLearning-courseLogo">
            <img src={data.courseImg} alt="courseLogo" />
          </div>
          <div className="courseDetails">
            <div className="courseTitle">{data.courseName}</div>
            <div className="courseDesc">{data.courseDesc}</div>
          </div>
          <div className="coursePricetag">{data.price}/-</div>
        </div>
          )
        })}
        </fieldset>
        </div>
    );
  });
}
const mapStateToProps = (state) => {
  return {

  };
};
const mapDispatchToProps = (dispatch) => {
  return {
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PurchasedCourse);
