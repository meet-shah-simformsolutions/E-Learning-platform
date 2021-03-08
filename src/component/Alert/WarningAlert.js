import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "./Alert.css"
export function WarningAlert(props) {
  const notify = () => {
    toast.warn(props.msg, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
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
