import * as actionTypes from "../actions/actionTypes";
import data from "../../data.json"
const initialState = {
    price: 0,
    details:"TEST",
    cart:[],
    dataSource:[],
    mainDataSource:data,
    wishlist: [],
    cartId:[],
    wishlistId:[],

  };
  const assignData = (state,action) =>{
    return{
      ...state,
      dataSource:action.data,
      // mainDataSource:action.data,
    }
  }
  const addDetails = (state,action) =>{
      console.log("cart",action.cart)
      return {
          ...state,
        //   price:state.price.concat(+action.price),
        cartId:state.cartId.concat([action.cart.courseId]),
          cart:state.cart.concat([action.cart]),  
      }
  }
  const calculateCartPrice = (state) => {
      console.log("cart price reducer")
        let totalPrice = 0
        state.cart.map((data) => {
            totalPrice  = totalPrice + data.price
        })
      return{
          ...state,
          price:totalPrice
       
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
      console.log("remove from cart")
      console.log("action index",action.index)
      console.log(typeof(action.index))

        const removeEle = (a,index) =>{
            let newArray = [...a]
            newArray.splice(index,1)
            return newArray
        }
      return{
        ...state,
        cart:removeEle(state.cart,action.index),
        cartId:removeEle(state.cartId,action.index)
        // calculateCartPrice(state,cart)
      }
  }
  const moveToWishlist = (state,action) =>{
      console.log("item moved to wishlist")
      console.log("wishlist array",state.wishlist)
      return{
            ...state,
          wishlist:state.wishlist.concat([state.mainDataSource[action.index]]),
        
      }
  }
  const addToWishlistDirectly = (state,action)=>{
    return{
      ...state,
      wishlistId:state.wishlistId.concat([action.wishlistId])
    }
  }
  const removeFromWishList = (state,action) =>{
      console.log("removefromwishlist")
      const removeSlected =(wishlist,index) =>{
        const newArray = [...wishlist]
        newArray.splice(index,1)
        return newArray
      }
      return{
        ...state,
        wishlist:removeSlected(state.wishlist,action.index)
      }
  }
  const moveToCart = (state,action) => {
      console.log("item moved to cart")
      return{
        ...state,
        cart:state.cart.concat([state.wishlist[action.index]])
      }
  }
  const reducer = (state = initialState, action) =>{
    switch(action.type){
        case actionTypes.ADD_TO_CART: return addDetails(state,action)
        case actionTypes.RESET_DATA: return  resetData(state,action)
        case actionTypes.REMOVE_FROM_CART: return removeFromCart(state,action)
        case actionTypes.CALCULATE_CART_PRICE: return calculateCartPrice(state)
        case actionTypes.MOVE_TO_WISHLIST: return moveToWishlist(state,action)
        case actionTypes.REMOVE_FROM_WISHLIST: return removeFromWishList(state,action)
        case actionTypes.MOVE_TO_CART_FROM_WISHLIST:return moveToCart(state,action)
        case actionTypes.ADD_TO_WISHLIST_DIRECTLY:return addToWishlistDirectly(state,action)
        case actionTypes.ASSIGN_DATA:return assignData(state,action)
        default:
            return state
    }
  }

  
  export default reducer