import { LoginConstants } from "./constants";
import initialState from "../../../initialState";

const LoginReducer = (state = initialState.LoginPage, action) => {
  switch (action.type) {
    case LoginConstants.LOGIN_SUCCESS:
      state = state.set("username", action.user["username"])
        .set("location", action.user["location"])
        .set("picture", action.user["picture"])
        .set("loggedIn", true);
      return state;

    case LoginConstants.LOGOUT_SUCCESS:
      state = state.set("username", "");
      state = state.set("loggedIn", false);
      return state;

    case LoginConstants.LOGIN_CHANGE_USER:
      state = state.set("username", action.username);
      return state;
      
    default:
      return state;
  }
};

export default LoginReducer;
