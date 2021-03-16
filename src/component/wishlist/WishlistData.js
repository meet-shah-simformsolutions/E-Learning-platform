import React,{useEffect} from "react";
import { Link } from "react-router-dom";
import * as actions from "../../store/actions/index";

import { connect } from "react-redux";
function WishlistData(props) {
  async function moveToCartAndUpdate(data,i) {
    console.log("index", i);
    await props.moveToCart(i);
    props.addCartDataToServer(data,props.userId)
    removeFromWishListAndUpdateServer(data,i);
    props.getCartPrice();
  }
  async function removeFromWishListAndUpdateServer (data,index) {
    await props.removeFromWishList(index);
    props.wishlistRemoveUpdateServer(data,props.userId)
  }
  useEffect(() => {
    console.log("props wishlistData",props.wishlistData)
    
  }, [])
  return props.wishlistData.map((data, i) => {
    console.log(data)
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
                onClick={() => removeFromWishListAndUpdateServer(data,i)}
                //  onClick= {()=> removeItemAndUpdateCart(i)}
              >
                {" "}
                remove
              </div>
            </div>
            <div>
              <Link to="/Wishlist" onClick={() => moveToCartAndUpdate(data,i)}>
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
  return {
    userId:state.cartDetails.userId
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    remove: (index) => dispatch(actions.removeFromCart(index)),
    getCartPrice: () => dispatch(actions.calculateCartPrice()),
    moveToWishlist: (i) => dispatch(actions.moveToWishlist(i)),
    removeFromWishList: (i) => dispatch(actions.removeFromWishList(i)),
    moveToCart: (i) => dispatch(actions.moveToCart(i)),
    wishlistRemoveUpdateServer:(data,id)=>dispatch(actions.wishlistRemoveUpdateServer(data,id)),
    addCartDataToServer:(data,id)=>dispatch(actions.addCartDataToServer(data,id))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(WishlistData);
