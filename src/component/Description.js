import React from "react";

function Description(props) {
  console.log(props.location.state);
  const data = props.location.state.data;
  return (
    <div className="description_container">
      <div className="first-container">
        <div className="course_title">{data.courseName}<br/>
        <div className="course_description">
            {data.courseDesc}.....
        </div>
        <div className="category">
            {data.category}
        </div>
        </div>
        <div className="course_img">
          <img src={data.courseImg} />
        </div>
      </div>
      <div className="courseDes_price">
        <div className="courseDes">{data.courseDesc}</div>
        <div className="courseprice">{data.price}</div>
      </div>
      <div className="course_author">{data.author}</div>
    </div>
  );
}

export default Description;
