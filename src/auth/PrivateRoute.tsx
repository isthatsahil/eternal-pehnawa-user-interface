import React from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component, path }) => {
  return (
    <Route path={path} component={withAuthenticationRequired(component)} />
  );
};

export default PrivateRoute;
