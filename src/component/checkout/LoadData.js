import React from "react";
import { Link } from "react-router-dom";
import * as actions from "../../store/actions/index";

import { connect } from "react-redux";

function LoadData(props) {
  async function removeItemAndUpdateCart(i) {
    console.log("index", i);
    await props.remove(i);
    props.getCartPrice();
  }
  async function moveToWishlistAndUpdateCart(i) {
    await props.moveToWishlist(i);
    props.remove(i);
    props.getCartPrice();
  }
  const dragStart = e => {
    const target = e.target
    e.dataTransfer.setData("text/plain", target.id)
    // setTimeout(()=>{
    //   target.style.display= "none"
    // },0)
  }
  const dragOver = e =>{
    e.stopPropagation()
  }
  return props.cart.map((data, i) => {
    return (
      <div>
        <div className="listOfSelectedCourse" draggable="true" onDragStart={dragStart} onDragOver={dragOver} id={data.courseId}>
          <div className="courseLogo">
            <img src={data.courseImg} alt="courseLogo" />
          </div>
          <div className="courseDetails">
            <div className="courseTitle">{data.courseName}</div>
            <div className="courseDesc">{data.courseDesc}</div>
          </div>
          <div className="actions">
            <div>
              {" "}
              <div onClick={() => removeItemAndUpdateCart(i)} className="remove"> remove</div>
            </div>
            <div>
              <div onClick={() => moveToWishlistAndUpdateCart(i)} className="wishlist">
                Move to Wishlist
              </div>
            </div>
          </div>
          <div className="coursePricetag">{data.price}/-</div>
        </div>
      </div>
    );
  });
}
const mapStateToProps = (state) => {
  return {
    price: state.cartDetails.price,
    cart: state.cartDetails.cart,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    remove: (index) => dispatch(actions.removeFromCart(index)),
    getCartPrice: () => dispatch(actions.calculateCartPrice()),
    moveToWishlist: (i) => dispatch(actions.moveToWishlist(i)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoadData);
