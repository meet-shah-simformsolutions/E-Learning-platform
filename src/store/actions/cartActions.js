import * as actionTypes from "./actionTypes";
import axios from "../../axios-order";
import  firebase  from "firebase";
import { db } from "../../firebase";


export const addDetails = (cart) => {
    return {
      type: actionTypes.ADD_TO_CART,
      cart: cart,
    };
  };
  export const removeFromCart = (index) => {
    return {
      type: actionTypes.REMOVE_FROM_CART,
      index,
    };
  };
  export const calculateCartPrice = () => {
    return {
      type: actionTypes.CALCULATE_CART_PRICE,
    };
  };
  export const SubmitData = (id, data) => {
    console.log("id inside submitaction",id)
    console.log(data);
    return (dispatch) => {
      
  /*-----*/
  
      // axios
      //   .post("/orderedData.json", cart)
      //   .then((res) => {
      //     dispatch(orderedData(cart));
      //     dispatch(setResponseId(res.data.name));
      //     dispatch(clearCart());
      //     console.log("res", res);
      //     console.log("res", res.data.name);
      //     console.log("data submitted");
      //   })
      //   .catch((error) => {
      //     console.log("error durning ");
      //   });
  
  
  /*-----*/
  
          // db.settings({
          //     timestampsInSnapshots: true
          //     });
        //  db.collection("orders").doc(id).set({
        //       cart: cart.cart,
        //       },{merge:true}).then(()=>{
        //         console.log("data set to new doc");
        //       });  
        
  
  // let today = new Date();
  // let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  // let time = (today + date).slice(0,25)
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth()+1; 
  let yyyy = today.getFullYear();
  if(dd<10) 
  {
      dd='0'+dd;
  } 
  if(mm<10) 
  {
      mm='0'+mm;
  } 
  let seconds = today.getSeconds()
  if(seconds<10){
    seconds = '0'+seconds
  }
  let minutes = today.getMinutes();
  if(minutes<10){
    minutes = '0'+minutes
  }
  let hour = today.getHours();
  if(hour<10){
    hour = '0'+hour
  }
  let time = today = 'Date: '+dd+'-'+mm+'-'+yyyy + ' Time: '+hour +':' +minutes+ ':' + seconds;
        console.log(data.cart);
        db.collection('orders').doc(id)
                  .collection('Purchased-Courses').doc(time).set({
                    purchasedCourse:data.cart,
                    docName:time
                  })
        db.collection('orders').doc(id).update({
        cart:[],
        }).then(()=>{
          console.log("data posted");

          dispatch(orderedData(data.cart));
        }).then(()=>{
            dispatch(clearCart())
        })
    };
  };
  export const orderedData = (data) => {
    return {
      type: actionTypes.ORDERED_DATA,
      data,
    };
  };
  export const setResponseId = (id) => {
    return {
      type: actionTypes.SET_RESPONSE_ID,
      id,
    };
  };
  export const clearCart = () => {
    return {
      type: actionTypes.CLEAR_CART,
    };
  };
  export const setEmpty = () => {
    return {
      type: actionTypes.SET_EMPTY,
    };
  };
  export const getCartData =(id) =>{
    return dispatch =>{
      db.collection('orders').doc(id).get().then((doc)=>{

        if(doc.exists){
              dispatch(assignCartData(doc.data().cart));
        }
    })
  // }
  }
  }
  export const assignCartData = (data) => {
    console.log("data",data)
    return{
      type:actionTypes.ASSIGN_CART_DATA,
      data
    }
  }
  export const addCartDataToServer = (data,id) => {
    return dispatch => {
      const docRef = db.collection("orders").doc(id);
      console.log("data inside add to cart function",data)
      docRef.update({
      cart: firebase.firestore.FieldValue.arrayUnion(data)
    }).then(()=>{
      dispatch(calculateCartPrice())
    })
    }
  }
  export const cartItemRemoveUpdateServer = (data,id) => {
    return dispatch => {
      const docRef = db.collection("orders").doc(id);
       docRef.update({
      cart: firebase.firestore.FieldValue.arrayRemove(data)
      });
  
    }
  }
  export const setToast = () => {
    return {
      type: actionTypes.SET_TOAST,
    };
  };
  export const resetToast = () => {
    return {
      type: actionTypes.RESET_TOAST,
    };
  };