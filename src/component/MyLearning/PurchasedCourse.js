import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import * as actions from "../../store/actions/index";

import { connect } from "react-redux";
function PurchasedCourse(props) {
  useEffect(() => {
    console.log("inside purchased orders", props.fetchedOrder);
  }, []);

  return props.fetchedOrder.map((data, i) => {
    // console.log(props.fetchedOrder.reverse())
    // console.log(props.fetchedOrder)
    // console.log(props.fetchedOrder);

    return (
      <div>
        <fieldset>
          <legend>
            {data.docName ? (
              <code>
                <div>
                  {data.docName.slice(0, 16)}
                  {data.docName.slice(16)}
                </div>
              </code>
            ) : (
              "No Data Found"
            )}
          </legend>
          {data.purchasedCourse.map((data, j) => {
            let path = `/Course_Description/${data.courseId}`
            return (
              <Link
                to={{
                  pathname: path,
                  state: {data:data},
                }}
              >
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
              </Link>
            );
          })}
        </fieldset>
      </div>
    );
  });
}
const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(PurchasedCourse);
