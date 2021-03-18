import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Alert.css"
// import "./Alert.css"
export function SuccessAlert(props) {
  setTimeout(() => {
    
    window.sessionStorage.setItem("user", "unset");
  }, 3000);

  const notify = () => {
    toast.success(props.msg, {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 3000,
      className:"toast-container"
      // className:"toast-error"
    });
    
  };

  useEffect(() => {
    console.log("alert rendered")
    notify();
    return;
  }, []);
  return (
    <div>
      <ToastContainer />
    </div>
  );
}
