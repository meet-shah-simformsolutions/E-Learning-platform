import * as actionTypes from "../actions/actionTypes";
import data from "../../data.json"
const initialState = {
    price: [],
    details:"TEST",
    cart:[],
    dataSource:data,
    mainDataSource:data
  };
  const addDetails = (state,action) =>{
      console.log("cart",action.cart)
      return {
          ...state,
          price:state.price.concat(+action.price),
          cart:state.cart.concat([action.cart])
      }
  }
  const resetData = (state,action) => {
      console.log("reset")
      return{
          ...state,
          cart:[]
      }
  } 
  const removeFromCart = (state,action) => {
      console.log("removefromcart")
      return{

      }
  }
  const reducer = (state = initialState, action) =>{
    switch(action.type){
        case actionTypes.ADD_TO_CART: return addDetails(state,action)
        case actionTypes.RESET_DATA: return  resetData(state,action)
        case actionTypes.REMOVE_FROM_CART: return removeFromCart(state,action)
        default:
            return state
    }
  }
  export default reducer