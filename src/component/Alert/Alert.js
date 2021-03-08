import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Redirect } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
// import "./Alert.css"
export function Alert(props) {
  const [toastDispatch, setToastDispatch] = useState(false);
  const notify = () => {
    toast.error(props.msg, {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 3000,
      // className:"toast-error"
    });
    setTimeout(() => {
      setToastDispatch(true);
    }, 3000);
  };

  useEffect(() => {
    console.log("alert rendered")
    notify();
    return;
  }, []);
  return (
    <div>
      {toastDispatch ? <Redirect to="/Login" /> : null}
      <ToastContainer />
    </div>
  );
}
