import React, { useEffect, useState } from "react";
import Navbar from "./Navbar"
import data from "../data.json";
import "../css/course-container.css"
const CourseData = (props) => {
  const [searchText, setSearchText] = useState("");
  const [mainDataSource, setMaindataSource] = useState(data); /*do not change*/
  const [dataSource, setDataSource] = useState(data);
  const [sortBy,setSortBy] = useState("")
  const [filtertBy,setFiltertBy] = useState("")
  const [offSet,setOffSet] = useState(8)
  const [status,setStatus] =useState("Loading....")
  const [price,setPrice] = useState([])
  const [finalPrice,setFinalPrice] = useState(0)
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = (event) => {
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    const scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;
      // console.log(event.currentTarget)
      // console.log("stop",scrollTop)
      // console.log("sheight",scrollHeight)
      // console.log("clientheight",window.innerHeight)

    if (scrollTop + window.innerHeight + 10 >= scrollHeight) {
      // console.log("inside")
      setStatus("")
      return setOffSet(prev => prev + 7)
    }
  };
  // console.log(searchText);
  // useEffect((data) => {}, []);
  // useEffect((searchText)=>{
  //     let filteredData = data.filter((x)=>{
  //         return x.courseName.includes(searchText)
  //     })
  //     return filteredData;

  // },[searchText])

  // useEffect(
  //   (data) => {
  //     data.forEach((data) => {
  //       setcourseId((courseId) => courseId.concat(data.courseId));
  //       setcourseName((courseName) => courseName.concat(data.courseName));
  //       setcourseDesc((courseDesc) => courseDesc.concat(data.courseDesc));
  //       setpreReq((preReq) => preReq.concat(data.preReq));
  //       setauthor((author) => author.concat(data.author));
  //       setcategory((category) => category.concat(data.category));
  //       setstatus((status) => status.concat(data.status));
  //       setreg_student((reg_student) => reg_student.concat(data.reg_student));
  //       setcourseImg((courseImg) => courseImg.concat(data.courseImg));
  //       setjoiningDate((joiningDate) => joiningDate.concat(data.joiningDate));
  //       setcoursePrice((coursePrice) => coursePrice.concat(data.price));
  //     });
  //     console.log(
  //       courseId,
  //       courseName,
  //       courseDesc,
  //       preReq,
  //       author,
  //       category,
  //       status,
  //       reg_student,
  //       courseImg,
  //       joiningDate,
  //       coursePrice
  //     );
  //   },
  //   [
  //     author,
  //     category,
  //     courseDesc,
  //     courseId,
  //     courseImg,
  //     courseName,
  //     coursePrice,
  //     joiningDate,
  //     preReq,
  //     reg_student,
  //     status,
  //   ]
  // );

  const filterName = (value) => {
    if (value < 1) {
      setSearchText("");
      return setDataSource(mainDataSource);
    } else {
      setSearchText(value.toLowerCase());
      let filteredData = mainDataSource.filter((x) => {
        let lowerString_coursename = x.courseName.toLowerCase();
        let lowerString_category = x.category.toLowerCase();

        return (
          lowerString_coursename.includes(searchText) ||
          lowerString_category.includes(searchText)
        );
      });

      console.log(filteredData.length);
      console.log(filteredData);
      return setDataSource(filteredData);
    }
  };
  const courseDescription = (e, coursename, courseid) => {
    // e.preventDefault()
    window.open(`http://localhost:3000/desc/${coursename}`, "_blank");
    console.log(e);
    console.log(courseid);

    console.log("value", e.target.value);

    return console.log(e.target);
  };

  
 const filterStack = (value) => {
    let filterStack_data = mainDataSource.filter((x) => {
      return x.category === value;
    });

    if (filterStack_data.length < 0) {
      setDataSource(mainDataSource);
    } else {
      setSortBy("")
      setFiltertBy(value)
      return setDataSource(filterStack_data);
    }
  };
  
  const handleClick =(e,course_price,index) =>{
    console.log(e)
    console.log(course_price)
    console.log(price)
    if(finalPrice < 50000){
      setPrice([...price,course_price])
      let sum = price.reduce((a, b) =>{
        return a + b;
      }, 0);
    setFinalPrice(sum)
    }
    else{
      alert("Limit Reached")
    }
    console.log(price)
    console.log(index)
    console.log(dataSource[index].courseDesc)
    // setDataSource(dataSource.slice(index,1))
    // price.reduce(sum)
    

  }
  const LoadData = (props) => {
    // console.log("in load data");
    // console.log(props.data);
    console.log(props.data.length)
    return (    
    // <InfiniteScroll 
    // dataLength={props.data.length}
    // hasMore={true}
    // loader={<h4>Loading...</h4>}
    // endMessage={
    //   <p style={{ textAlign: 'center' }}>
    //     <b>Yay! You have seen it all</b>
    //   </p>
    // }
    // >
    // {
      
    props.data.map((data, i) => (
      <div
        className="course-container"
        // onClick={(e) => {
        //   courseDescription(e, data.courseName, data.courseId);
        // }}
      >
        <div className="course_data" value={data.courseId}>
          <img alt="course-img" src={data.courseImg} value={data.courseId} />
          <div className="courseName" value={data.courseId}>
            {data.courseName}
          </div>
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
          <button className="price_btn" onClick={(e)=>handleClick(e,data.price,i)} >
            Add to Cart
          </button>
        </div>
      </div>
      
    ))
      // }</InfiniteScroll>
    )
  };              
  const getSorted_list = () => {
    let sorted_Course = [];
    dataSource.forEach((data) => {
      sorted_Course.push({
        courseId: data.courseId,
        courseName: data.courseName,
        courseDesc: data.courseDesc,
        preReq: data.preReq,
        author: data.author,
        category: data.category,
        status: data.status,
        reg_student: data.reg_student,
        courseImg: data.courseImg,
        joiningDate: data.joiningDate,
        price: data.price,
      });
    });
    return sorted_Course;
  };
  const sortCourse = (value) => {
    let sorted_Course = [];
    if (value === "recent") {
    } else if (value === "asce") {
      sorted_Course = [...getSorted_list()];
      console.log(sorted_Course);
      setSortBy("Title A to Z")
      sorted_Course.sort((a, b) => {
        if (a.courseName.toLowerCase() < b.courseName.toLowerCase()) return -1;

        console.log(a, b);
        if (a.courseName.toLowerCase() > b.courseName.toLowerCase()) return 1;

        return 0;
      });
      console.log(sorted_Course);
      setDataSource(sorted_Course);
    } else if (value === "desc") {
      sorted_Course = [...getSorted_list()];
      console.log(sorted_Course);
      setSortBy("Title Z to A")

      sorted_Course.sort((a, b) => {
        if (a.courseName.toLowerCase() > b.courseName.toLowerCase()) return -1;

        console.log(a, b);
        if (a.courseName.toLowerCase() < b.courseName.toLowerCase()) return 1;

        return 0;
      });
      console.log(sorted_Course);
      setDataSource(sorted_Course);
    } else if (value === "price_l_h") {
      sorted_Course = [...getSorted_list()];
      sorted_Course.sort((a, b) => a.price - b.price);
      setDataSource(sorted_Course);
      setSortBy("Price: Low to High")

      console.log(sorted_Course);
    } else if (value === "price_h_l") {
      sorted_Course = [...getSorted_list()];
      sorted_Course.sort((a, b) => b.price - a.price);
      console.log(sorted_Course);
      setDataSource(sorted_Course);
      setSortBy("Price: High to Low")

    }
    return console.log("sorting done");
  };
  const resetData = () => {
    setSearchText("");
    setSortBy("")
    setFiltertBy("")
    setOffSet(8)
    setPrice([])
    setFinalPrice(0)

    setStatus("Loading...")
    return setDataSource(mainDataSource);
  };
  // const checkAndUpdate = (e,value) =>{
  //   if(e.keyCode===8){
  //     if(value<1){
  //       setDataSource(mainDataSource)
  //     }
  //     alert("backspace")

  //   } else{
  //     filterName(value)
  //   }
  // }
  // const handleScroll = (event) =>{
  //   const {scrollTop, clientHeight, scrollHeight,} = event.currentTarget;
  //   console.log("stop",scrollTop)
  //   console.log("client",clientHeight)
  //   console.log("sheight",scrollHeight)

  // }
  return (
    <div>
      <div className="container">
        <div className="nav-container">
          <div className="sort">
            <div className="dropdown">
              Sort by :{sortBy}
              <div
                className="dropdown-content"
                onClick={(e) => {
                  sortCourse(e.target.value);
                }}
              >
                <button value="recent">Recently Enrolled</button>
                <button value="asce">Title: A to Z</button>
                <button value="desc">Title: Z to A</button>
                <button value="price_l_h">Price: Low to High</button>
                <button value="price_h_l">Price: Hight to Low</button>
              </div>
            </div>
          </div>
          <div className="filter">
            <div className="dropdown">
              Filter by: {filtertBy}
              <div
                className="dropdown-content"
                onClick={(e) => {
                  filterStack(e.target.value);
                }}
              >
                <button value="frontend">Frontend</button>
                <button value="backend">Backend</button>
                <button value="fullstack">Fullstack</button>
              </div>
            </div>
          </div>
          
          <div className="filter">
              Total Price: {finalPrice}
          </div>
          <div
            className="reset"
            onClick={() => {
              resetData();
            }}
          >
            <img
              alt="reset_filter"
              src="../img/refresh.png"
              title="Reset Filters"
            />
          </div>
          <div>
            <input
              className="search_course"
              value={searchText}
              required
              name=""
              type="text"
              placeholder="Search Course Here"
              onChange={(e) => filterName(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="course-list" onScroll={handleScroll}>
        {/* {data.map((data, i) => (
          <div className="course-container">
            <div className="course_data">
                <img alt="course-img" src={data.courseImg} />
              <div className="courseName">{data.courseName}</div>
              <div className="price_data">
                <img alt="price" className="price_tag" src="../img/price.png" />
                &nbsp;
                <div className="price">{data.price}/-</div>
              </div>
              <button className="price_btn">Add to Cart</button>
            </div>
          </div>
        ))} */}
        <LoadData data={dataSource.slice(0,offSet)} />
        {/* <div style={{color:"white"}}>
        {status}
        </div> */}

        {/* {LoadData(data)} */}
      </div>
    </div>
  );
};

export default CourseData;