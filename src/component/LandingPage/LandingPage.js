import React, { useEffect } from "react";
import "./LandingPage.css";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
function LandingPage(props) {
  useEffect(() => {
    props.getTrendingCourses();
  }, []);
  return (
    <div className="wrapper">
      <div className="LandingPage">
        <div>
          <img src="../img/landingImg.jpg" alt="langingimg" className="landingPageImg"/>
        </div>
        <div className="trendingCourse">sdasd</div>
        <div className="topCategories white">
          <h2>Top categories</h2>

          <div className="landing-category">
            {props.TrendingCourses.map((data) => (  
              <div>
                  <Link to={'Courses/'+ data.category}>
                <div>
                  <img
                    src={data.img}
                    alt="img"
                    className="categoryImg"
                  />
                </div>
                <div className="categoryName">{data.category}</div>
                </Link>
              </div>
            ))}
            
          </div>
        </div>
        <div className="footer">
          <div>aasdasda dasda</div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    TrendingCourses: state.cartDetails.TrendingCourses,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getTrendingCourses: () => dispatch(actions.getTrendingCourses()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
