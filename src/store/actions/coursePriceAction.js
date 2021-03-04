
import * as actionTypes from "./actionTypes";
export const addDetails = (cart,price) =>{
    return{
        type:actionTypes.ADD_TO_CART,
        price:price,
        cart:cart
    }
}
export const resetData = () =>{
    return{
        type:actionTypes.RESET_DATA,
        
    }
}

export const removeFromCart= () =>{
    return {
        type:actionTypes.REMOVE_FROM_CART,
        
    }
}