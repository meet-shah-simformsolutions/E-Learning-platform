import React from "react";

function Description(props) {
  console.log(props.location.state);
  const data = props.location.state.data;
  return (
    <div className="description_container">
      <div className="first-container">
        <div className="course_title">
          {data.courseName}
          <br />
          <div className="course_description">{data.courseDesc}.....</div>
          <div className="category">{data.category}</div>
        {/* <div className="courseContent">
        <div className="subContent">
        </div>
        </div> */}
        
        </div>

        <div className="sidebar-container">
          <img src={data.courseImg} alt="img" />
          <div className="actionButtons">
            <div className="price_data" value={data.courseId}>
              <img
                alt="price"
                className="price_tag"
                src="../img/price.png"
                value={data.courseId}
              />
              &nbsp;
              <div className="price" value={data.courseId}>
                {data.price}/-
              </div>
            </div>

            <div className="buttonWrapper">
              <button className="price_btn">Add to Cart</button>
              <br />
            </div>
          </div>
          <div className="courseInfo">
            <strong>CourseInfo:</strong>
            <div className="level">
              <div>
                <strong>Level</strong>
              </div>
              <div>Basic</div>
            </div>
            <hr className="horizontalLine" />
            <div className="TotalHours">
              <div>
                <strong>Duration</strong>
              </div>
              <div>15 Hours</div>
            </div>
            <hr className="horizontalLine" />
            <div className="TotalRegStudent">
              <div>
                <strong>
                  Total Regisered
                  <br />
                  Students
                </strong>
              </div>
              <div>{data.reg_student}</div>
            </div>
            <hr className="horizontalLine" />
          </div>
        </div>
      </div>
      {/* <div className="courseDes_price">
        <div className="courseDes">{data.courseDesc}</div>
        <div className="courseprice">{data.price}</div>
      </div>
      <div className="course_author">{data.author}</div> */}
    </div>
  );
}

export default Description;
