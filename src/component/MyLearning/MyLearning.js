import React, { Component } from "react";

import { Link } from "react-router-dom";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import PurchasedCourse from "./PurchasedCourse";
import { useAuth } from "../../contexts/AuthContext";
import "./MyLearning.css"
class MyLearning extends Component {
  componentDidMount(){
    // this.props.getPurchasedCourses(this.props.responseId)
    this.props.getPurchasedCourses(this.props.userId)
    setTimeout(() => {
      // console.log("learning",this.props.learning.flat(Infinity))
    }, 1000);
  }
  render() {
    let purchasedItem = null
    if(this.props.learning.flat(Infinity).length >= 1){
      purchasedItem = (<div className="myLearningData">
          {/* <PurchasedCourse fetchedOrder={this.props.learning.flat(Infinity)} /> */}
          <PurchasedCourse fetchedOrder={this.props.learning.flat(Infinity)} />
        </div>)
    }
    else{
      purchasedItem = (
        <div className="emptyMyLearning"><div>MyLearning is Empty  :( </div></div>
      )
    }
    return (
      <div className="myLearning_container">
        <div className="myLearningLanding">
          <h1>Purchased Courses</h1>
          
        </div>
        <div>
        <p>
          Total
          {this.props.learning.flat(Infinity).length}
          Courses Purchased
          </p>
        </div>
        {purchasedItem}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    order:state.cartDetails.order,
    responseId:state.cartDetails.responseId,
    fetchedOrder:state.cartDetails.fetchedOrder,
    userId:state.cartDetails.userId,
    learning:state.cartDetails.learning
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getPurchasedCourses:(id)=> dispatch(actions.getPurchasedCourses(id)),
   setUserId:(id)=>dispatch(actions.setUserId(id))

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MyLearning);
