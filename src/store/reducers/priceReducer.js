import * as actionTypes from "../actions/actionTypes";
// import { useAuth } from "../../contexts/AuthContext";
// import data from "../../data.json"
const initialState = {
    price: 0,
    details:"TEST",
    cart:[],
    dataSource:[],
    mainDataSource:[],
    wishlist: [],
    cartId:[],
    wishlistId:[],
    userId:"",
    currentUser:null,
    order:[],
    fetchedOrder:[],
    responseId:"",
    learning:[],
    purchasedCourseId:[],
    toastState:false,
    formatState:true,
    docName:[],
    totalNoOfPurchasedCourses:0,
    sortedArray:[],
    TrendingCourses:[]
  };
  const assignData = (state,action) =>{
    return{
      ...state,
      currentUser:action.currentUser,
      dataSource:action.data,
      mainDataSource:action.data
      // dataSource:[...state.dataSource,action.data],

      // mainDataSource:[...state.dataSource,action.data],
    }
  }
  const setUserId = (state,action) => {
    // console.log("action.id",action.id)
    return{
      ...state,
      userId:action.id,
    }
  }
  const orderedData = (state,action) =>{
    return{
      ...state,
      order:action.data,
      toastState:true
      // mainDataSource:action.data,
    }
  }
  const addDetails = (state,action) =>{
      // console.log("cart",action.cart)
      return {
          ...state,
        //   price:state.price.concat(+action.price),
        cartId:state.cartId.concat([action.cart.courseId]),
          cart:state.cart.concat([action.cart]),  
      }
  }
  const calculateCartPrice = (state) => {
      // console.log("cart price reducer")
      // console.log("cart",state.cart);
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
      // console.log("reset")
      return{
          ...state,
          cart:[]
      }
  } 
  const removeFromCart = (state,action) => {
      // console.log("remove from cart")
      // console.log("action index",action.index)
      // console.log(typeof(action.index))

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
      // console.log("item moved to wishlist")
      // console.log("wishlist array",state.wishlist)
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
      // console.log("removefromwishlist")
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
      // console.log("item moved to cart")
      return{
        ...state,
        cart:state.cart.concat([state.wishlist[action.index]])
      }
  }
  const setResponseId = (state,action) => {
    return{
      ...state,
      responseId:action.id
    }
  }
  const setFetchedOrder = (state,action) => {
    return{
      ...state,
      fetchedOrder:action.data,
    }
  }
  const clearCart = (state,action) =>{
    return{
      ...state,
      cart:[],
      price:0,
      cartId:[]
    }
  }
  const addToLearningArray = (state,action) => {
    // console.log(action.purchasedCourse);
    // console.log("learning array",state.learning)

    return{
      ...state,
      learning:[...state.learning,action.purchasedCourse],
      totalNoOfPurchasedCourses:state.totalNoOfPurchasedCourses + (+[action.purchasedCourse.purchasedCourse.length])
    }
  }

  const purchasedCourseId = (state,action) => {
    // console.log("purchased courseid array",state.purchasedCourseId)
    return{
      ...state,
      purchasedCourseId:state.purchasedCourseId.concat([action.id])
    }
  }
  const setToast = (state,action) => {
    return{
      ...state,
      toastState:true
    }
  }
  const resetToast = (state,action) => {
    return{
      ...state,
      toastState:false
    }
  }
  const setEmpty = (state,action)=>{
    return{
      ...state,
      purchasedCourseId:[],
      learning:[],
      totalNoOfPurchasedCourses:0
    }
  }
  const setFormateState =  (state,action) => {
    return{
      ...state,
      formatState:false
    }
  }
  const assignWishListData = (state,action) => {
    return{
      ...state,
      wishlist:action.data,
      
    }
  }
  const assignCartData  = (state,action) => {
    return{
      ...state,
      cart:action.data
    }
  }
  // const setPurchasedCourses = (state,action) =>{
  //   console.log(action.newList);
  //   return{
  //     ...state,
  //     sortedArray:action.newList
  //   }
  // }
  const assignTrendingCourses = (state,action) =>{
    return{
      ...state,
      TrendingCourses:action.data
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
        case actionTypes.SET_USER_ID:return setUserId(state,action)
        case actionTypes.ORDERED_DATA:return orderedData(state,action)
        case actionTypes.CLEAR_CART: return clearCart(state,action);
        case actionTypes.SET_RESPONSE_ID: return setResponseId(state,action)
        case actionTypes.SET_FETCHED_ORDER: return setFetchedOrder(state,action)
        case actionTypes.ADD_TO_LEARNING_ARRAY:return addToLearningArray(state,action)
        case actionTypes.SET_EMPTY:return setEmpty(state,action)
        case actionTypes.PURCHASED_COURSE_ID:return purchasedCourseId(state,action)
        case actionTypes.SET_TOAST:return setToast(state,action)
        case actionTypes.ASSIGN_WISHLIST_DATA:return assignWishListData(state,action)
        case actionTypes.SET_FORTMAT_STATE:return setFormateState(state,action)
        case actionTypes.ASSIGN_CART_DATA:return assignCartData(state,action)
        case actionTypes.RESET_TOAST:return resetToast(state,action)
        case actionTypes.ASSIGN_TRENDING_COURSES: return assignTrendingCourses(state,action)
        // case actionTypes.SET_SORTED_LIST_TO_LEARNING_ARRAY:return setPurchasedCourses(state,action)
        default:
            return state
    }
  }

  
  export default reducer