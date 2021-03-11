
import * as actionTypes from "./actionTypes";
import axios from "../../axios-order";

export const purchaseBurger= (orderData,token) =>{
    return dispatch =>{
        dispatch();
        axios.post("/order.json?auth="+ token, orderData)
      .then((response) => {
          dispatch()
      })
      .catch((error) => {
        dispatch()
      });
    }
}
export const setUserId = (id) =>{
    return{
        type:actionTypes.SET_USER_ID,
        id
    }
}

export const setData = (currentUser) => {
    console.log("setData")
     return dispatch =>{
    axios.get("/CourseData.json")
    .then(res =>{ 
        dispatch(assignData(res.data,currentUser))
    })
    .catch(error=>{
      console.log(error)
    })
    }
}
export const assignData = (data,currentUser) => {
    return {
        type:actionTypes.ASSIGN_DATA,
        data,
        currentUser
    }
}
export const addDetails = (cart) =>{
    return{
        type:actionTypes.ADD_TO_CART,
        cart:cart,
    }
}
export const resetData = () =>{
    return{
        type:actionTypes.RESET_DATA,
        
    }
}

export const removeFromCart= (index) =>{
    return {
        type:actionTypes.REMOVE_FROM_CART,
        index
        
    }
}

export const calculateCartPrice = () => {
    return{
        type:actionTypes.CALCULATE_CART_PRICE
    }
}
export const moveToWishlist = (index) =>{
    return{
        type:actionTypes.MOVE_TO_WISHLIST,
        index
    }
}
export const removeFromWishList = (index) =>{
    return{
        type:actionTypes.REMOVE_FROM_WISHLIST,
        index
    }
}
export const moveToCart = (index) => {
    return{
        type:actionTypes.MOVE_TO_CART_FROM_WISHLIST,
        index
    }
}
export const addToWishlistDirectly = (id) =>{
    return{
        type:actionTypes.ADD_TO_WISHLIST_DIRECTLY,
        wishlistId:id
    }
}
export const SubmitData = (id,cart) => {
    console.log(cart)
    return dispatch => {
        axios.post("/orderedData.json", cart)
      .then((res) => {
          dispatch(orderedData(cart))
          dispatch(setResponseId(res.data.name))
          dispatch(clearCart())
          console.log("res",res)
          console.log("res",res.data.name)
          console.log("data submitted")
      })
      .catch((error) => {
        console.log("error durning ")
      });
      
    }
}
export const setResponseId= (id) =>{
    return{
        type:actionTypes.SET_RESPONSE_ID,
        id
    }
}
export const orderedData = (data) => {
    return{
        type:actionTypes.ORDERED_DATA,
        data
    }
}
export const clearCart = () =>{
    return{
        type:actionTypes.CLEAR_CART
    }
}
export const getPurchasedCourses = (id) => {
    return dispatch =>{
        axios.get("/orderedData.json")
        .then(res =>{ 
            console.log(res.data)
            dispatch(setEmpty())
            dispatch(selectUser(res.data,id))
            // dispatch(setFetchedOrder(res.data[id]))
        })
        .catch(error=>{
          console.log(error)
        })
        }
}
export const selectUser = (data,id) => {
    console.log("inside selectUser acrtion")
    console.log(data)
    console.log(id)
    return dispatch => {
        Object.keys(data).map(function(key, index) {
            console.log(data)
            console.log(data[key].userId)

            if(data[key].userId === id){
                
                dispatch(selectedId(data[key].cart))
            }
          });
    }
}
// export const mappedData = ()
export const setEmpty = () =>{
    return{
        type:actionTypes.SET_EMPTY,

    }
}
export const selectedId = (purchasedCourse) => {
    console.log("inside selectedId acrtion")
    console.log(purchasedCourse)
    return{
        type:actionTypes.ADD_TO_LEARNING_ARRAY,
        purchasedCourse
    }
}
export const setFetchedOrder = (data) => {
    return{
        type:actionTypes.SET_FETCHED_ORDER,
        data
    }
}