import React, { Component } from "react";

import { Link } from "react-router-dom";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import WishlistData from "./WishlistData";
import "./WishList.css";
import "../checkout/Checkout.css";
class WishList extends Component {
  
  render() {
    let wishlistData = null
    if(!this.props.wishlist.length < 1){
      wishlistData = (
        <div className="wishlistData">
          <WishlistData wishlistData={this.props.wishlist} />
        </div>
      )
    }
    else{
      wishlistData = (<div className="emptyWishlist"><div>Wishlist is Empty  :( </div></div>)
    }
    return (
      <div className="wishlist_container">
        <div className="wishListLanding">
          <h1>WishList</h1>
        </div>
        {wishlistData}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    price: state.cartDetails.price,
    cart: state.cartDetails.cart,
    wishlist: state.cartDetails.wishlist,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    remove: (index) => dispatch(actions.removeFromCart(index)),
    getCartPrice: () => dispatch(actions.calculateCartPrice()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(WishList);
