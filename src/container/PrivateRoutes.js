import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Redirect, Route } from "react-router-dom";
import { Alert } from "../component/Alert/Alert";
function PrivateRoutes({ component: Component, ...rest }) {
  const { currentUser } = useAuth();
  console.log(currentUser)
  const obj = {
    ...rest
  }
  return (
    <div>
      <Route
        {...rest}
        render={ props => {
          return  currentUser ? (
            <Component {...props} />
          ) : (
            <div>
              <Alert msg={obj.msg}/>
              {/* <Redirect to="/Login" /> */}
            </div>
          );
        }}
      ></Route>
    </div>
  );
}

export default PrivateRoutes;
 