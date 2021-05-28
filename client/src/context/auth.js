// We are using the context API but we could use Redux for a better data storage and management. Also, we should remember that context doesn't really manage data, what it does is data injection, but that's enough for what we are building in our application.
import React, { useReducer, createContext } from "react";
import jwtDecode from "jwt-decode";

const initialState = {
  user: null,
};

if (localStorage.getItem("jwtToken")) {
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));
  // verifies if token expired
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtToken");
  } else {
    initialState.user = decodedToken;
  }
}

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
  const [state, dispatch] = useReducer(authReducer, initialState);

  function login(userData) {
    localStorage.setItem("jwtToken", userData.token);
    dispatch({
      type: loginString,
      payload: userData,
    });
  }

  function logout() {
    localStorage.removeItem("jwtToken");
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
