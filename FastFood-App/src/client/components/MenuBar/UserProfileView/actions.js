import { UserViewActionsConstants } from "./constants";

function Minify() {
  return {type: UserViewActionsConstants.USER_VIEW_MINIFY};
}

function Unminify(username) {
  return {type: UserViewActionsConstants.USER_VIEW_UNMINIFY, username: username};
}

const UserViewActions = {
  Unminify,
  Minify
};

export default UserViewActions;
