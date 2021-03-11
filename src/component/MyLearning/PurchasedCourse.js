import React,{useEffect} from "react";
import { Link } from "react-router-dom";
import * as actions from "../../store/actions/index";

import { connect } from "react-redux";
function PurchasedCourse(props) {
  useEffect(() => {
    console.log(this.props)
    
  }, [])
  
  return props.fetchedOrder.map((data, i) => {
    console.log("data",data)
    return (
      <div>
        <div className="listOfSelectedCourse">
          <div className=" courseLogo myLearning-courseLogo">
            <img src={data.courseImg} alt="courseLogo" />
          </div>
          <div className="courseDetails">
            <div className="courseTitle">{data.courseName}</div>
            <div className="courseDesc">{data.courseDesc}</div>
          </div>
          <div className="coursePricetag">{data.price}/-</div>
        </div>
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
