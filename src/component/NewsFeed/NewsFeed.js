import React, { useEffect, useState } from "react";
import "./NewsFeed.css";
import axios from "axios";
import { Redirect } from "react-router";
function NewsFeed(props) {
  console.log("render");
  const [news, setNews] = useState(null);
  const [currentFilter,setCurrentFilter] = useState("Trending")
  const categoryList = ["business","entertainment","general","health","science","sports","technology"]
  useEffect(() => {
    trendingNews();
  }, []);
//   const techNews = () => {
//     console.log("tech news");

//     setNews(null);
//     let main_url =
//       "https://newsapi.org/v2/sources?category=technology&country=us&apiKey=2a27986ea0a24fb997dffa1fd17c5731";
//     axios
//       .get(main_url)
//       .then((res) => {
//         console.log(res.data.sources);
//         setNews(res.data.sources);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
  const trendingNews = () => {
    console.log("trending news");
    setNews(null);
    let main_url =
      "https://newsapi.org/v2/top-headlines?country=in&apiKey=2a27986ea0a24fb997dffa1fd17c5731";
    axios
      .get(main_url)
      .then((res) => {
        console.log(res.data.articles);
        setNews(res.data.articles);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const filterNews  = (data) => {
      setNews(null)
      let url = null
    if(categoryList.includes(data)){
        setCurrentFilter(data)
        url = `https://newsapi.org/v2/sources?category=${data}&country=us&apiKey=2a27986ea0a24fb997dffa1fd17c5731`
        axios.get(url)
        .then((res) => {
        console.log(res.data.sources);
        setNews(res.data.sources);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    else{
        trendingNews()
    }
  }
  const RedirectPage = (url) => {
    window.location.replace(url);
  };
  let newsData = null
 newsData = (
      <>
    {news?.map((data) => {
        return (
          <div className="listOfNews">
            {data.urlToImage ? (
              <div className=" newsLogo">
                <img src={data.urlToImage} alt="newsLogo" />
              </div>
            ) : null}

            <div className="newsDetails">
              <div className="newsTitle">
                {data.title ? data.title : data.name}
              </div>
              <div className="newsDesc">{data.description}</div>
              <hr />
              {data.publishedAt ? (
                <div className="publitionDateTime">
                  <strong>PublishedAt:</strong><br/>
                  {data.publishedAt}
                </div>
              ) : null}
              <button
                onClick={() => RedirectPage(data.url)}
                className="readMore-btn"
              >
                Read More
              </button>
            </div>
          </div>
        );
      })}
      
          
      </>
  )

  return (
    <div className="newsContainer">
      <div className="newsfeed-Title">
        <h1>NewsFeed<div className="currentFilter">({currentFilter})</div></h1>
      </div>

      <div className="filterNews">
          {categoryList.map((data,i)=>{
              return(
        <div className="newsCategory" onClick={() => filterNews(data)} name={data}>
          {data}
        </div> 
              )
         })
          }
      </div>
      {news ? newsData : (<div className="white">Loading....</div>)}
    </div>
  );
}

export default NewsFeed;

// <div className="newsCategory" onClick={() => trendingNews()} >
//           Trending News        
//           </div>