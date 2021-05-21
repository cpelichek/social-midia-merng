// We are using the context API but we could use Redux for a better data storage and management. Also, we should remember that context doesn't really manage data, what it does is data injection, but that's enough for what we are building in our application.
import React, { userReducer, createContext } from "react";

// AuthContext will be used in our components to access our context data
const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

const loginString = "LOGIN";
const logoutString = "LOGOUT";

function authReducer(state, action) {
  switch (action.type) {
    case loginString:
      return {
        ...state,
        user: action.payload,
      };
    case logoutString:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

// AuthProvider will be used in our App to wrap around our entire application so that it would have access through this provider to the functions in the context
function AuthProvider(props) {
  const [state, dispatch] = userReducer(authReducer, { user: null });

  function login(userData) {
    dispatch({
      type: loginString,
      payload: userData,
    });
  }

  function logout() {
    dispatch({ type: logoutString });
  }

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
