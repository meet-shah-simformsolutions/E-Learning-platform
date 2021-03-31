import React, { useEffect, useState } from "react";
import * as actions from "../store/actions/index";
import { connect } from "react-redux";
import Modal from "../component/Modal/Modal";
import { WarningAlert } from "./Alert/WarningAlert";
import { useAuth } from "../contexts/AuthContext";
function Description(props) {
  const [alertState, setAlertState] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [displayStyle, setDisplayStyle] = useState("none");
  const [showModal, setShowModal] = useState(false);
  const [link, setLink] = useState(null);
  const [check, setCheck] = useState(false);
  const [title, setTitle] = useState(null);
  const [lockDisplay, setLockDisplay] = useState("block")
  const { currentUser } = useAuth();

  useEffect(() => {
    console.log();
    props.getTableContent(currentUser.uid);

    setTimeout(() => {
      console.log(props.paidCourseId);
    }, 2000);
    
  }, []);
  const handleClick = (e, course_price, data, id) => {
    console.log("button clicked");

     if(props.paidCourseId.includes(id)){
      setAlertState(true);
      setAlertMsg("Course Already Purchased, Please Check Your My-Learning tab");
    }
    else{
      if (props.price < 10000 ) {
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
  };
  const toggle = (id,courseId,dropDownId) => {
    if(props.paidCourseId.includes(courseId)){
      setLockDisplay("none")
    }
    let obj2 = document.getElementById(id);
    if (obj2.style.display === "block"){
      obj2.style.display = "none"
      document.getElementById(dropDownId).classList.remove("fa","fa-caret-up","dropDown")
      document.getElementById(dropDownId).classList.add("fa","fa-caret-down","dropDown")
      
    }
    else 
    {
      obj2.style.display = "block"
      document.getElementById(dropDownId).classList.remove("fa","fa-caret-down","dropDown")
      document.getElementById(dropDownId).classList.add("fa","fa-caret-up","dropDown")

    }
  };
  const data = props.location.state.data ? props.location.state.data : null;
  console.log(data);
  const setLinkAndModal = (blockLink, title, id) => {
    console.log(blockLink);
    if(props.paidCourseId.includes(id)){
      setLink(blockLink);
      setShowModal(true);
      setTitle(title);
    }
    else{
      setAlertState(true)
      setAlertMsg("Sorry you are not authorized")
      setTimeout(() => {
        setAlertState(false)
      }, 4000);
    }
  };
  const againSetTheModalState = () => {
    setShowModal(false);
  };
  return (
    <div className="description_container">
      {alertState ? <WarningAlert msg={alertMsg} /> : null}
      {showModal ? (
        <Modal
          url={link}
          title={title}
          resetModal={() => againSetTheModalState()}
        />
      ) : null}

      <div className="first-container">
        <div className="course_title">
          <div>
          {data.courseName}
          </div>
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
                return item.data.map((block, i) => (
                  <>
    
                    <div className="ContentTitle" onClick={() => toggle(i,data.courseId,i+"dropdown")}>
                      {block.title}
                      <div className="dropDown" >
                          <i 
                          className="fa fa-caret-down dropDown"
                          id={i+"dropdown"}></i>
                      </div>
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
                            onClick={() =>
                              setLinkAndModal(linkBlock.link, linkBlock.title,data.courseId)
                            }
                          >
                            <i className="fa fa-play-circle" style={{marginRight:"10px"}}>
                            </i>
                              <strong>{linkBlock.title}</strong>
                            <div className="lock" ><i class="fa fa-lock" aria-hidden="true" title="video is locked" style={{display:lockDisplay}}></i></div>
                          </div>
                        </>
                      ))}
                    </div>
                  </>
                ));
              }
            })}
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
    userId:state.cartDetails.userId,
    Authentication:state.cartDetails.Authentication,
    paidCourseId:state.cartDetails.paidCourseId
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addDetails: (data) => dispatch(actions.addDetails(data)),
    getCartPrice: () => dispatch(actions.calculateCartPrice()),
    addCartDataToServer: (data, id) =>
      dispatch(actions.addCartDataToServer(data, id)),
    getTableContent: (id) => dispatch(actions.getTableContent(id)),
    checkAuthentication:(uid)=> dispatch(actions.checkAuthentication(uid))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Description);
