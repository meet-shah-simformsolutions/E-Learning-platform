import React, { Component, useEffect } from "react";
import "./Checkout.css";
import data from "../../data.json";
import { Link } from "react-router-dom";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import LoadData from "./LoadData";
import axios from "../../axios-order";
import { SuccessAlert } from "../Alert/SuccessAlert";
class Checkout extends Component {
  state = {
    finalCart: { cart: null, userId: "",wishlist:[]},
  };

  componentDidMount() {
    // this.props.setData()
    console.log(this.props.dataSource);
    console.log(this.props.userId);
    console.log("toast", this.props.toast);
    console.log("toast State", this.props.toastState);
    console.log(this.props.wishlist);
    this.props.getCartPrice();
    this.props.resetToast();
    this.setState({
      finalCart: {
        cart: this.props.cart,
        userId: this.props.userId,
        wishlist:this.props.wishlist,
      },
    });

    setTimeout(() => {
      console.log(this.state.finalCart);
    }, 1000);
  }

  componentDidUpdate() {
    console.log(this.props.toastState);
    console.log("component updated", this.props.cart);
  }
  drop(e, props) {
    e.preventDefault();
    // this.props.cartItemRemoveUpdateServer(data,props.userId)
    console.log("e object", e);
    const courseId = e.dataTransfer.getData("text/plain");
    // const course = document.getElementById(courseId)
    console.log(courseId);
    // course.style.display =  "block"
    // e.target.appendChild(course)
    console.log(props);
    console.log(props.cart);
    this.props.remove(+courseId);
    this.props.getCartPrice();

  }
  dragOver(e) {
    e.preventDefault();
  }

  render() {
    const obj = this.props;
    let cartData = null;
    if (!this.props.cart.length < 1) {
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
            <h3 className="white">{this.props.cart.length} Courses in cart</h3>
            <div className="courseTotal ">Total:</div>
            <div className="coursePrice white">{this.props.price}/-</div>
            <div className="basePrice">Baseprice</div>
            <div className="offer">offer%off</div>
            <div className="checkout-btn">
              <button
                onClick={() =>
                  this.props.SubmitData(this.props.userId,this.state.finalCart,)
                }
              >
                Checkout
              </button>
              <Link to="/Dashboard"></Link>
            </div>
            <div
              id="bin"
              onDrop={(e) => this.drop(e, this.props)}
              onDragOver={this.dragOver}
              className="deleteIcon"
            >
              <i
                class="fa fa-trash"
                aria-hidden="true"
                style={{ fontSize: "38px" }}
              ></i>
            </div>
          </div>
        </div>
      );
    } else {
      cartData = (
        <div className="emptyCart">
          {this.props.toastState ? <SuccessAlert msg="Order Placed" /> : null}
          <div>Cart is Empty :(</div>
        </div>
      );
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
    id: state.cartDetails.id,
    dataSource: state.cartDetails.dataSource,
    userId: state.cartDetails.userId,
    toastState: state.cartDetails.toastState,
    wishlist:state.cartDetails.wishlist
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    remove: (index) => dispatch(actions.removeFromCart(index)),
    getCartPrice: () => dispatch(actions.calculateCartPrice()),
    setData: () => dispatch(actions.setData()),
    SubmitData: (id, cart) => dispatch(actions.SubmitData(id, cart)),
    setToast:()=>dispatch(actions.setToast()),
    // cartItemRemoveUpdateServer:(data,id)=>dispatch(actions.cartItemRemoveUpdateServer(data,id))
    resetToast:()=>dispatch(actions.resetToast())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
