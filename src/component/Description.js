import React from 'react';

function Description(props) {
    return (
        <div>
            <div className="des-container">
                <div className="title">
                    props.data.courseName
                </div>
                <div className="course_img">
                    props.data.courseImg
                </div>
                <div className="courseDes_price">
                <div className="courseDes">
                    props.data.courseDes
                </div>
                <div className="courseprice">
                    props.data.coursePrice
                </div>
                </div>
                <div className="course_author">
                    props.data.course_author
                </div>
            </div>
        </div>
    );
}

export default Description;