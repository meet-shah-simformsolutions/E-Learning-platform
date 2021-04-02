import * as actionTypes from "./actionTypes";
import axios from "../../axios-order";
import  firebase  from "firebase";
import { db } from "../../firebase";

export const giftCourse = (data,id) =>{
    console.log("Inside GiftCourse");
    console.log(data);
    console.log(id);
    return dispatch =>{
        db.collection('orders').doc(id)
                  .update({
                    Notification:firebase.firestore.FieldValue.arrayUnion(data.courseName),
                    giftedCourses:firebase.firestore.FieldValue.arrayUnion(data),
                  })
    }
}