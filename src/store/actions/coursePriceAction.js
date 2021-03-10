
import * as actionTypes from "./actionTypes";
import axios from "../../axios-order";

export const setData = () => {
    console.log("setData")
     return dispatch =>{
    axios.get("/CourseData.json")
    .then(res =>{ 
        dispatch(assignData(res.data))
    })
    .catch(error=>{
      console.log(error)
    })
    }
}
export const assignData = (data) => {
    return {
        type:actionTypes.ASSIGN_DATA,
        data
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