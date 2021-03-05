import React from "react";
import { Link } from "react-router-dom";
import * as actions from "../../store/actions/index";

import { connect } from "react-redux";
function WishlistData(props) {
  async function moveToCartAndUpdate(i) {
    console.log("index", i);
    await props.moveToCart(i);
    props.removeFromWishList(i);
    props.getCartPrice();
  }
  return props.cart.map((data, i) => {
    return (
      <div>
        <div className="listOfSelectedCourse">
          <div className=" courseLogo Wishlist-courseLogo">
            <img src={data.courseImg} alt="courseLogo" />
          </div>
          <div className="courseDetails">
            <div className="courseTitle">{data.courseName}</div>
            <div className="courseDesc">{data.courseDesc}</div>
          </div>
          <div className="actions">
            <div>
              {" "}
              <div
                onClick={() => props.removeFromWishList(i)}
                //  onClick= {()=> removeItemAndUpdateCart(i)}
              >
                {" "}
                remove
              </div>
            </div>
            <div>
              <Link to="/Wishlist" onClick={() => moveToCartAndUpdate(i)}>
                Move to Cart
              </Link>
            </div>
          </div>
          <div className="coursePricetag">{data.price}/-</div>
        </div>
      </div>
    );
  });
}
const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    remove: (index) => dispatch(actions.removeFromCart(index)),
    getCartPrice: () => dispatch(actions.calculateCartPrice()),
    moveToWishlist: (i) => dispatch(actions.moveToWishlist(i)),
    removeFromWishList: (i) => dispatch(actions.removeFromWishList(i)),
    moveToCart: (i) => dispatch(actions.moveToCart(i)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(WishlistData);
