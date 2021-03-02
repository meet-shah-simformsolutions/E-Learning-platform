import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Redirect, Route } from "react-router-dom";
function PrivateRoutes({ component: Component, ...rest }) {
  const { currentUser } = useAuth();
  console.log(currentUser)
  return (
    <div>
      <Route
        {...rest}
        render={ props => {
          return  currentUser ? (
            <Component {...props} />
          ) : (
            <Redirect to="/Login" />
          );
        }}
      ></Route>
    </div>
  );
}

export default PrivateRoutes;
 