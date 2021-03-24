import * as actionTypes from "./actionTypes";
import axios from "../../axios-order";
import firebase from "firebase";
import { db,storageRef } from "../../firebase";

export const getTrendingCourses = () =>{
  return(dispatch) =>{
    axios.get("/TrendingCourses.json")
        .then((res) => {
          dispatch(assignTrendingCourses(res.data));
        })
        .catch((error) => {
          // console.log(error);
        })
  }
}
export const assignTrendingCourses = (data) => {
  console.log(data);
  return{
    type:actionTypes.ASSIGN_TRENDING_COURSES,
    data
  }
}
export const setUserId = (id) => {
  return {
    type: actionTypes.SET_USER_ID,
    id,
  };
};
export const setData = (currentUser,start,end) => {
  // console.log("set User");
  // console.log("start",start);
  // console.log("end",end);
  // let temp_array = []
  return (dispatch) => {
    // for(let i=start;i<end;i++){
    //   axios
    //     .get(`/CourseData/${i}.json`)
    //     .then((res) => {
    //       // console.log(`/CourseData/${i}.json`);
    //       console.log("api called");
    //       // console.log(res.data);//object received from api
    //       // temp_array.push(res.data)
    //       dispatch(assignData(res.data, currentUser));
    //     })
    //     // .then(()=>{
    //     //   console.log(  );

    //     //   console.log("temp",temp_array);

    //     //   // dispatch(assignData(temp_array, currentUser));

    //     // })
    //     .catch((error) => {
    //       // console.log(error);
    //     });
    //   }
      dispatch(checkAuthentication(currentUser.uid))
      axios
        .get("/CourseData/.json")
        .then((res) => {
          dispatch(assignData(res.data, currentUser));
        })
        .catch((error) => {
          // console.log(error);
        });
  };
};
export const assignData = (data, currentUser) => {
  return {
    type: actionTypes.ASSIGN_DATA,
    data,
    currentUser,
  };
};
export const getTableContent  = (id) => {
  return dispatch => {
    dispatch(checkAuthentication(id))
    axios
    .get("/TableContent.json")
    .then((res) => {
      // console.log(res.data);
      dispatch(assignTableContent(res.data));
    })
    .catch((error) => {
      // console.log(error);
    });
  
    // axios.get("https://newsapi.org/v2/everything?q=tesla&apiKey=2a27986ea0a24fb997dffa1fd17c5731").then((res)=> console.log(res.data))
  }
}
export const assignTableContent  = (data) => {
  return{
    type:actionTypes.ASSIGN_TABLECONTENT,
    data
  }
}
export const resetData = () => {
  return {
    type: actionTypes.RESET_DATA,
  };
};

export const moveToWishlist = (index) => {
  return {
    type: actionTypes.MOVE_TO_WISHLIST,
    index,
  };
};
export const removeFromWishList = (index) => {
  return {
    type: actionTypes.REMOVE_FROM_WISHLIST,
    index,
  };
};
export const moveToCart = (index) => {
  return {
    type: actionTypes.MOVE_TO_CART_FROM_WISHLIST,
    index,
  };
};
export const addToWishlistDirectly = (id) => {
  return {
    type: actionTypes.ADD_TO_WISHLIST_DIRECTLY,
    wishlistId: id,
  };
};

export const storeWishlistData = (data, id) => {
  // console.log("data", data);
  db.collection("orders")
    .doc(id)
    .update({
      wishlist: data,
    })
    .then(() => {
      // console.log("wishlist updated");
    });
};

export const getPurchasedCourses = (id) => {
  // console.log(id);
  return (dispatch) => {
    dispatch(setEmpty());

    /*-------------*/

    // axios
    //   .get("/orderedData.json")
    //   .then((res) => {
    //     // console.log(res.data);

    //     dispatch(setEmpty());
    //     dispatch(selectUser(res.data, id));
    //     // dispatch(setFetchedOrder(res.data[id]))
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    /*-------------*/
    if (id) {
      db.collection("orders")
        .doc(id)
        .get()
        .then((doc) => { 
          // console.log("fetched id", doc.data());
        });
        
      db.collection("orders")
        .doc(id)
        .collection("Purchased-Courses")
        .orderBy("docName", "desc")
        .get()
        .then((snapShot) => {
            
            snapShot.docs.map((doc) =>{
              
              // console.log(doc.id)
              // console.log(doc.data().purchasedCourse.length)

              dispatch(selectedId(doc.data()))
            }
            )
          
          // array of cities objects
        })
    }
  };
};
export const selectUser = (data, id) => {
  // console.log("inside selectUser action");
  // console.log(data);
  //   console.log(id);
  return (dispatch) => {
    Object.keys(data).map((key, index) => {
      //   console.log(data[key]);
      //   console.log(data[key].userId);
      //   console.log(data[key].cart);
      //   dispatch(purchasedCourseId(data[key].cart.courseId));
      if (data[key].userId === id) {
        // console.log(data[key].cart);
        dispatch(selectedId(data[key].cart));
        data[key].cart.map((data) => {
          // console.log(data);
          dispatch(purchasedCourseId(data.courseId));
        });
      }
    });
  };
};
// export const mappedData = ()
export const setEmpty = () => {
  return {
    type: actionTypes.SET_EMPTY,
  };
};
export const purchasedCourseId = (id) => {
  // console.log(id);
  return {
    type: actionTypes.PURCHASED_COURSE_ID,
    id,
  };
};
export const selectedId = (purchasedCourse) => {
  // console.log("inside selectedId action");
  return {
    type: actionTypes.ADD_TO_LEARNING_ARRAY,
    purchasedCourse,
    totalNoOfPurchasedCourse:purchasedCourse.purchasedCourse.length
  };
};


export const setFetchedOrder = (data) => {
  return {
    type: actionTypes.SET_FETCHED_ORDER,
    data,
  };
};

export const updateWishlist = (id, wishListData) => {
  return (dispatch) => {
    db.collection("orders")
      .doc(id)
      .update({
        cart: {
          wishlist: wishListData,
        },
      })
      .then(function () {
        console.log("Data  updated");
      });
  };
};

export const getWishlistData = (id) => {
  return (dispatch) => {
    // if(db.collection('orders').doc(id)){
    //   console.log(db.collection('orders').doc(id) ? "true" : "false");
    // }
    // else{
    //   console.log("false inside else");
    // }

    // console.log(db.collection('orders'));
    // const docRef = db.collection('orders').doc(id)
    // docRef.get().then((doc)=>{
    //   if(doc.exists){
    //     console.log("doc",docRef.doc.data().wishlist)
    //     // dispatch(assignWishListData(docRef.doc.data().wishlist));
    //   }
    // })

    // if(db.collection('orders')){
    db.collection("orders")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          dispatch(assignWishListData(doc.data().wishlist));
        }
      });
    // }
  };
};

export const assignWishListData = (data) => {
  return {
    type: actionTypes.ASSIGN_WISHLIST_DATA,
    data,
  };
};

export const addWishListDataToServer = (data, id) => {
  return (dispatch) => {
    const docRef = db.collection("orders").doc(id);
    docRef.update({
      wishlist: firebase.firestore.FieldValue.arrayUnion(data),
    });
  };
};

export const wishlistRemoveUpdateServer = (data, id) => {
  return (dispatch) => {
    const docRef = db.collection("orders").doc(id);
    docRef.update({
      wishlist: firebase.firestore.FieldValue.arrayRemove(data),
    });
  };
};

export const setFormat = (id) => {
  return (dispatch) => {
    // console.log("setFormat id 1", id);

    db.collection("orders")
      .doc(id)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          db.collection("orders").doc(id).set({
            id: id,
            // email:currentUser.email,
            wishlist: [],
            cart: [],
          });
        }
      }).then(()=>{
        console.log("account created");
      });
    // console.log("setFormat id 2", id);
  };
};

export const setFormateState = () => {
  return {
    type: actionTypes.SET_FORTMAT_STATE,
  };
};

export const checkAuthentication = (userId) =>{
  console.log(userId);
  return dispatch => {
    dispatch(setEmpty())
    if(userId){

      db.collection("orders")
          .doc(userId)
          .collection("Purchased-Courses")
          .orderBy("docName", "desc")
          .get()
          .then((snapShot) => {
              
              snapShot.docs.map((doc) =>{
                
                // console.log(doc.id)
                console.log(doc.data().purchasedCourse)
  
                dispatch(paidCourseId(doc.data().purchasedCourse))
              }
              )
            
            // array of cities objects
          });
    }
  }
}

export const paidCourseId = (data) =>{
  return dispatch =>{

    data.map((data)=>{
      console.log(data.courseId);
      dispatch(setPaidCourseId(data.courseId))
    })

  }
}
export const setPaidCourseId = (id)=>{
  return{
    type:actionTypes.PAID_COURSE_ID,
    id
  } 

}

