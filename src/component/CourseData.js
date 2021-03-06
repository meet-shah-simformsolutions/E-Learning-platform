import React, { useEffect, useState } from "react";
import "../css/course-container.css";
import { Redirect } from "react-router-dom";
import * as actions from "../store/actions/index";
import { connect } from "react-redux";
import { WarningAlert } from "./Alert/WarningAlert";
import { useAuth } from "../contexts/AuthContext";
const CourseData = (props) => {
  const [searchText, setSearchText] = useState("");
  const [mainDataSource, setMaindataSource] = useState([]); /*do not change*/
  const [dataSource, setDataSource] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [filtertBy, setFiltertBy] = useState("");
  const [offSet, setOffSet] = useState(7);
  const [status, setStatus] = useState("Loading....");
  const [price, setPrice] = useState([]);
  const [newComp, setNewComp] = useState(false);
  const [redirectData, setRedirectData] = useState(null);
  const [alertState, setAlertState] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [noOfResult, setNoOfResult] = useState();
  const [finalPrice, setFinalPrice] = useState(0);
  const { currentUser } = useAuth();
  const [categorisedData,setCategorisedData] = useState([])
  // const [start, setStart] = useState(0);
  // const [end, setEnd] = useState(9);

  useEffect(() => {
    props.setData(currentUser);
    props.setUserId(currentUser.uid);
    props.getWishlistData(currentUser.uid)
      props.getCartData(currentUser.uid)
    // console.log(props.dataSource);
    props.getPurchasedCourses(props.userId);
    // props.getTableContent(props.userId);
    console.log("redirect Data",redirectData);
    console.log("link param",props.match.params.value);
    // filterName(props.match.params.value)
    window.addEventListener("scroll", handleScroll);
    setTimeout(() => {
      
      console.log("paid CourseID",props.paidCourseId);
    }, 3000);
    if(props.match.params.value !== "all"){
      console.log("called");
        
        getCategorisedData(props.match.params.value)
      }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // console.log("main fetched data",props.dataSource.flat(Infinity));
    setDataSource(props.dataSource);
    setMaindataSource(props.mainDataSource)
    
  }, [props.dataSource]);
  const getCategorisedData = (data) => {
    setCategorisedData([])
    setSearchText(data)
      props.dataSource.map((item)=>{
        let lowerItem = item.category.toLowerCase()
        let lowerData = data.toLowerCase() 
        if(lowerItem === lowerData){
          console.log(item);
          setCategorisedData(categorisedData => [...categorisedData, item])
        }
      })
      console.log(categorisedData);
      return setDataSource(categorisedData)
  }
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
      // console.log("start", start);
      // console.log("end", end);
      // setStatus("");
      // setStart(start+end)
      // setEnd(end+8)
      // props.setData(currentUser, start, end);
      return setOffSet((prev) => prev + 7);
    }
  };
  useEffect(() => {
    // console.log("wishlistId", props.wishlistId);
  }, [props.wishlistId]);
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
    setSortBy("")
    setFiltertBy("")
    setCategorisedData([])
    console.log(value);
    if (value < 1) {
      setSearchText("");
      setNoOfResult(0);
      return setDataSource(mainDataSource);
    } else {
      console.log(value);
      setSearchText(value.toLowerCase());
      let filteredData = mainDataSource.filter((x) => {
        let lowerString_coursename = x.courseName.toLowerCase();
        let lowerString_category = x.category.toLowerCase();

        return (
          lowerString_coursename.includes(searchText) ||
          lowerString_category.includes(searchText)
        );
      });
      setNoOfResult(filteredData.length);
      // console.log(filteredData.length);
      // console.log(filteredData);
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
  const addToWishlistDirectly = (index, id, data) => {
    console.log(props.cartId);
    if(props.paidCourseId.includes(id)){
      setAlertState(true);
      setAlertMsg("Course Already Purchased, Please Check Your My-Learning tab");
    }
    else{

      if (props.cartId.includes(id)) {
        setAlertState(true);
        setAlertMsg("Course Already Added in Cart");
      } else if (props.purchasedCourseId.includes(id)) {
        setAlertState(true);
        setAlertMsg(
          "Course Already Purchased, Please Check Your My-Learning tab"
        );
      } else {
        if (props.wishlistId.includes(id)) {
          setAlertState(true);
          setAlertMsg("Course Already Added in Wishlist");
        } else {
          setAlertState(false);
          props.moveToWishlist(index);
          props.addToWishlistDirectly(id);
          props.addWishListDataToServer(data, props.userId);
        }
    }

    }
    return true;
  };
  const filterStack = (value) => {
    setNoOfResult(0);
    setSearchText("")
    let filterStack_data = mainDataSource.filter((x) => {
      return x.category === value;
    });

    if (filterStack_data.length < 0) {
      setDataSource(mainDataSource);
    } else {
      setSortBy("");
      setFiltertBy(value);
      return setDataSource(filterStack_data);
    }
  };

  const handleClick = (e, course_price, index, data, id) => {
    console.log("button clicked");
    console.log(id);
    console.log(props.paidCourseId);
    console.log(props.paidCourseId.includes(id));
    if(props.paidCourseId.includes(id)){
      setAlertState(true);
      setAlertMsg("Course Already Purchased, Please Check Your My-Learning tab");
    }
    else{
      if (props.price < 10000 ) {
        // setPrice([...price, course_price]);
        // let sum = price.reduce((a, b) => {
        //   return a + b;
        // }, 0);
        // setFinalPrice(sum);
       
        if (props.cartId.includes(id)) {
          setAlertState(true);
          setAlertMsg("Course Already Added in Cart");
        } else if (props.purchasedCourseId.includes(id)) {
          setAlertState(true);
          setAlertMsg(
            "Course Already Purchased, Please Check Your My-Learning tab"
          );
        } else {
          setAlertState(false);
          props.addDetails(data);
          props.getCartPrice();
          props.addCartDataToServer(data, props.userId);
        }
      } else if (props.price > 10000 && props.cartId.includes(id)) {
        setAlertState(true);
        setAlertMsg("Limit Reached and Course Already Added in Cart");
      } else {
        setAlertState(true);
        setAlertMsg("Limit Reached");
      }
    }
    
    setTimeout(() => {
      setAlertState(false);
    }, 4000);
    console.log(price);
    console.log(index);
    console.log(dataSource[index].courseDesc);
    // setDataSource(dataSource.slice(index,1))
    // price.reduce(sum)
  };
  const getCourseDesc = (e, data) => {
    e.preventDefault();
    console.log(e);
    console.log(data);
    setRedirectData(data);
    return true;
  };
  const LoadData = (props) => {
    // console.log("in load data");
    // console.log(props.data.length);
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
            <img
              alt="course-img"
              src={data.courseImg}
              value={data.courseId}
              onClick={(e) => {
                getCourseDesc(e, data);
              }}
            />
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
            <div className="buttonWrapper">
              <button
                className="price_btn"
                onClick={(e) =>
                  handleClick(e, data.price, i, data, data.courseId)
                }
              >
                Add to Cart
              </button>
              <div className="wishlistIconContainer">
                <i
                  className="fa fa-heart wishlistIcon"
                  title="wishlist"
                  onClick={() => addToWishlistDirectly(i, data.courseId, data)}
                ></i>
              </div>
            </div>
          </div>
        </div>
      ))
      // }</InfiniteScroll>
    );
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
    setNoOfResult(0);
    setSearchText("")
    let sorted_Course = [];
    if (value === "recent") {
    } else if (value === "asce") {
      sorted_Course = [...getSorted_list()];
      console.log(sorted_Course);
      setSortBy("Title A to Z");
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
      setSortBy("Title Z to A");

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
      setSortBy("Price: Low to High");

      console.log(sorted_Course);
    } else if (value === "price_h_l") {
      sorted_Course = [...getSorted_list()];
      sorted_Course.sort((a, b) => b.price - a.price);
      console.log(sorted_Course);
      setDataSource(sorted_Course);
      setSortBy("Price: High to Low");
    }
    return console.log("sorting done");
  };
  const resetData = () => {
    setSearchText("");
    setSortBy("");
    setFiltertBy("");
    setOffSet(9);
    setPrice([]);
    setFinalPrice(0);
    props.reset();
    setStatus("Loading...");
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
  let CourseList = null;
  if (dataSource.length > 0) {

    CourseList = (
      <LoadData
        data={categorisedData.length>1 ? categorisedData : dataSource.slice(0, offSet)}
        // data={dataSource}
      />
    );
  } else {
    CourseList = <div className="white">Loading..............</div>;
  }
  return (
    <div className="main_Container">
      {alertState ? <WarningAlert msg={alertMsg} /> : null}
      {redirectData ? (
        <Redirect
          to={{
            pathname: `/Course_Description/${redirectData.courseId}`,
            state: { data: redirectData },
          }}
        />
      ) : null}
      <div className="container">
        {/* {props.price} */}
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
          {noOfResult ? (
            <>
              <div className="searchResult">
                {noOfResult}
                <small>Results for </small> <q>{searchText}</q>
              </div>
            </>
          ) : null}
          <div className="reset" onClick={props.reset}>
            <img
              alt="reset_filter"
              src="../img/refresh.png"
              title="Reset Filters"
            />
          </div>

          <div style={{ backgroundColor: "transparent" }}>
            <input
              autoFocus
              className="search_course"
              value={searchText}
              required
              name=""
              type="search"
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
              <button className="price_btn">Add to Cart</butto  n>
            </div>
          </div>
        ))} */}
        {/* {categorisedData ? } */}
        {CourseList}
        {/* <div style={{color:"white"}}>
        {status}
        </div> */}

        {/* {LoadData(data)} */}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    price: state.cartDetails.price,
    mainDataSource: state.cartDetails.mainDataSource,
    dataSource: state.cartDetails.dataSource,
    cartId: state.cartDetails.cartId,
    wishlistId: state.cartDetails.wishlistId,
    userId: state.cartDetails.userId,
    currentUser: state.cartDetails.currentUser,
    purchasedCourseId: state.cartDetails.purchasedCourseId,
    wishlist: state.cartDetails.wishlist,
    cart: state.cartDetails.cart,
    paidCourseId:state.cartDetails.paidCourseId
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addDetails: (data) => dispatch(actions.addDetails(data)),
    reset: () => dispatch(actions.resetData()),
    getCartPrice: () => dispatch(actions.calculateCartPrice()),
   getWishlistData:(id)=> dispatch(actions.getWishlistData(id)),
   getCartData:(id)=>dispatch(actions.getCartData(id)),
    moveToWishlist: (i) => dispatch(actions.moveToWishlist(i)),
    addToWishlistDirectly: (id) => dispatch(actions.addToWishlistDirectly(id)),
    setData: (currentUser, start, end) =>
      dispatch(actions.setData(currentUser, start, end)),
    getPurchasedCourses: (id) => dispatch(actions.getPurchasedCourses(id)),
    setUserId: (id) => dispatch(actions.setUserId(id)),
    storeWishlistData: (data, id) =>
      dispatch(actions.storeWishlistData(data, id)),
    addWishListDataToServer: (data, id) =>
      dispatch(actions.addWishListDataToServer(data, id)),
    addCartDataToServer: (data, id) =>
      dispatch(actions.addCartDataToServer(data, id)),
    getTableContent: (id) => dispatch(actions.getTableContent(id)),

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CourseData);
