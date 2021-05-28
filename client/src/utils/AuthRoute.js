// The purpose of this component is to fix a situation where, for instance, the user is logged in and we don't want to show our register page our let him go to the register page by any means, so we redirect him to our home instead
import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from "../context/auth";

const AuthRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default AuthRoute;
