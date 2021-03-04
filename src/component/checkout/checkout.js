import React,{useEffect}  from "react";
import "./Checkout.css";
import data from "../../data.json";
import { Link } from "react-router-dom";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";

function Checkout(props) {
  const LoadData = (props) => {

    return props.cart.map((data, i) => {
      return (
        <div>
          <div className="listOfSelectedCourse">
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
              <a> remove</a>
              </div>
              <div>
                <Link to="/Dashboard">Move to Wishlist</Link>
              </div>
            </div>
            <div className="coursePricetag">{data.price}/-</div>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="main_cart">
      <div className="cartLanding">
        <h1>Shopping Cart</h1>
      </div>
      {data ? (
        <div className="checkout-container">
         
          <div className="selectedCourses">
            <LoadData data={data} cart={props.cart}/>
          </div>
          <div className="price-Container">
          <h3>{props.cart.length} Courses in cart</h3>
            <div className="courseTotal">Total:</div>
            <div className="coursePrice">{props.price }/-</div>
            <div className="basePrice">Baseprice</div>
            <div className="offer">offer%off</div>
            <div className="checkout-btn">
              <button>Checkout</button>
              <Link to="/Dashboard"></Link>
            </div>
          </div>
        </div>
      ) : (
        "Cart is Empty"
      )}
    </div>
  );
}

const mapStateToProps = state =>{
  return{
    price:state.cartDetails.price,
    cart:state.cartDetails.cart
  }
}
const mapDispatchToProps = dispatch => {
  return{
    remove:()=> dispatch(actions.removeFromCart())
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Checkout);
