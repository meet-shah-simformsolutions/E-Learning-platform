import React from 'react';
import "./NewsFeed.css";
function NewsFeed(props) {
    console.log("render");
    return (
        <div className="newsContainer">
            <div className="newsfeed-Title">
                <h1>
                    NewsFeed
                </h1>
            </div>
            <div className="filterNews">

            </div>
            <div className="listOfNews">
            <div className=" newsLogo">
                    <img  alt="newsLogo" />
            </div>
            <div className="newsDetails">
                    <div className="courseTitle">Title</div>
                    <div className="courseDesc">Desciption</div>
            </div>
            </div>

        </div>
    );
}

export default NewsFeed;
