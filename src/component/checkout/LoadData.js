import React from "react";
import { Link } from "react-router-dom";
import * as actions from "../../store/actions/index";

import { connect } from "react-redux";

function LoadData(props) {
  async function removeItemAndUpdateCart(i,data) {
    console.log("index", i);
    await props.cartItemRemoveUpdateServer(data,props.userId)
    await props.remove(i);
    props.getCartPrice();
  }
  async function moveToWishlistAndUpdateCart(i,data) {
    await props.addWishListDataToServer(data,props.userId)
    await props.cartItemRemoveUpdateServer(data,props.userId)
    props.moveToWishlist(i);
    props.remove(i);
    props.getCartPrice();
  }
  const dragStart = e => {
    console.log("e target value",e.target)
    
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
              <div onClick={() => removeItemAndUpdateCart(i,data)} className="remove"> remove</div>
            </div>
            <div>
              <div onClick={() => moveToWishlistAndUpdateCart(i,data)} className="wishlist">
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
    userId:state.cartDetails.userId
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    remove: (index) => dispatch(actions.removeFromCart(index)),
    getCartPrice: () => dispatch(actions.calculateCartPrice()),
    moveToWishlist: (i) => dispatch(actions.moveToWishlist(i)),
    addWishListDataToServer:(data,id)=> dispatch(actions.addWishListDataToServer(data,id)),
    cartItemRemoveUpdateServer:(data,id)=>dispatch(actions.cartItemRemoveUpdateServer(data,id))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoadData);
