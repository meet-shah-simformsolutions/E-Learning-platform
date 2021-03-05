import React, { Component, useEffect } from "react";
import "./Checkout.css";
import data from "../../data.json";
import { Link } from "react-router-dom";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import LoadData from "./LoadData";
class Checkout extends Component {
  componentDidMount() {
    console.log(this.props.id)
    this.props.getCartPrice();
  }
  
  render() {
    let cartData = null
  if(!this.props.cart.length < 1){
    cartData = (
      <div className="checkout-container">
            <div className="selectedCourses">
              <LoadData
                cart={this.props.cart}
                remove={this.props.remove}
                getCartPrice={this.props.getCartPrice}
                moveToWishlist={this.props.moveToWishlist}
              />
            </div>
            <div className="price-Container">
              <h3>{this.props.cart.length} Courses in cart</h3>
              <div className="courseTotal">Total:</div>
              <div className="coursePrice">{this.props.price}/-</div>
              <div className="basePrice">Baseprice</div>
              <div className="offer">offer%off</div>
              <div className="checkout-btn">
                <button>Checkout</button>
                <Link to="/Dashboard"></Link>
              </div>
            </div>
          </div>
    )
  }
  else{
    cartData = ( <div className="emptyCart"><div >Cart is Empty  :( </div></div>)
  }
    return (
      <div className="main_cart">
        <div className="cartLanding">
          <h1>Shopping Cart</h1>
        </div>
        
          {cartData}

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    price: state.cartDetails.price,
    cart: state.cartDetails.cart,
    id:state.cartDetails.id
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    remove: (index) => dispatch(actions.removeFromCart(index)),
    getCartPrice: () => dispatch(actions.calculateCartPrice()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
