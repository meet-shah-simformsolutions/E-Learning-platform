import React, { useEffect, useState } from "react";
import * as actions from "../store/actions/index";
import { connect } from "react-redux";
import Modal from "../component/Modal/Modal";
import { WarningAlert } from "./Alert/WarningAlert";
function Description(props) {
  const [alertState, setAlertState] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [displayStyle, setDisplayStyle] = useState("none");
  const [showModal, setShowModal] = useState(false);
  const [link, setLink] = useState(null)
  console.log(props.location.state);
  useEffect(() => {
    props.getTableContent();
  }, []);
  const handleClick = (e, course_price, data, id) => {
    console.log("button clicked");
    if (props.price < 10000) {
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
    setTimeout(() => {
      setAlertState(false);
    }, 4000);
    // setDataSource(dataSource.slice(index,1))
    // price.reduce(sum)
  };
  const toggle  = (id) => {
    let obj   = document.getElementById(id);
    if (obj.style.display === "block") obj.style.display = "none";
    else obj.style.display = "block";
  }
  const data = props.location.state.data;
  const setLinkAndModal = (blockLink) => {
      console.log(blockLink);
      setLink(blockLink)
      setShowModal(true)
  }
  return (
    <div className="description_container">
      {alertState ? <WarningAlert msg={alertMsg} /> : null}

      <div className="first-container">
        <div className="course_title">
          {data.courseName}
          <br />
          <div className="course_description">{data.courseDesc}.....</div>
          <div className="category">{data.category}</div>
        </div>
        <div className="CourseContent">
          <div>
            <h6>Table of Contents</h6>
          </div>
          <div className="tableOfContent">
            {props.TableContent.map((item) => {
              if (item.courseId === data.courseId) {
                return item.data.map((block,i) => (
                  <>
                    <div
                      className="ContentTitle"
                      onClick={()=>toggle(i)}
                      >
                      {block.title}
                    </div>

                    <div
                      className="ContentDescription"
                      style={{ display: displayStyle }}
                      id={i}
                      >
                      {block.description.map((linkBlock) => (
                        <>
                          <div
                            className="ContentDescriptionLink"
                            onClick={() => setLinkAndModal(linkBlock.link)}
                            >
                            <i className="fa fa-play-circle">  
                              {linkBlock.title}
                            </i>
                          </div>
                          {showModal ? (
                            <Modal url={link} title={linkBlock.title} />
                          ) : null}
                        </>
                      ))}
                    </div>
                  </>
                ));
              }
            })}
            {/* <div
              className="ContentTitle"
              onClick={() => setDisplayStyle("block")}
            >
              Index
            </div> */}
          </div>
        </div>
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
            <button
              className="price_btn"
              onClick={(e) => handleClick(e, data.price, data, data.courseId)}
            >
              Add to Cart
            </button>
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
      {/* <div className="courseDes_price">
        <div className="courseDes">{data.courseDesc}</div>
        <div className="courseprice">{data.price}</div>
      </div>
      <div className="course_author">{data.author}</div> */}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    price: state.cartDetails.price,
    cartId: state.cartDetails.cartId,
    wishlistId: state.cartDetails.wishlistId,
    purchasedCourseId: state.cartDetails.purchasedCourseId,
    wishlist: state.cartDetails.wishlist,
    cart: state.cartDetails.cart,
    TableContent: state.cartDetails.TableContent,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addDetails: (data) => dispatch(actions.addDetails(data)),
    getCartPrice: () => dispatch(actions.calculateCartPrice()),
    addCartDataToServer: (data, id) =>
      dispatch(actions.addCartDataToServer(data, id)),
    getTableContent: () => dispatch(actions.getTableContent()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Description);
