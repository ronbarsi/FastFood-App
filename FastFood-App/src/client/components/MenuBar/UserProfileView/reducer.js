import initialState from "../../../initialState";
import { UserViewActionsConstants } from "./constants";


const UserViewReducer = (state = initialState.UserView, action) => {
  switch (action.type) {

    case UserViewActionsConstants.USER_VIEW_UNMINIFY:
      state = state.set("minify", false)
        .set("username", action.username);
      return state;

    case UserViewActionsConstants.USER_VIEW_MINIFY:
      state = state.set("minify", true);
      return state;   

    default:
      return state;
  }
};

export default UserViewReducer;
