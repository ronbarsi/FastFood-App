import { LoginConstants } from "./constants";

function Login(username) {
  return {type: LoginConstants.LOGIN, uri: `/api/dev/users/login/${username}`};
}

function LoginSuccess(user) {
  return {type: LoginConstants.LOGIN_SUCCESS, user: user};
}

function LoginFail(msg) {
  return {type: LoginConstants.LOGIN_FAILED, msg: msg};
}

function Logout() {
  return {type: LoginConstants.LOGOUT, uri: "/api/dev/users/logout"};
}

function LogoutSuccess(res) {
  return {type: LoginConstants.LOGOUT_SUCCESS, res: res};
}

function LoginUserSet(username) {
  return {type: LoginConstants.LOGIN_CHANGE_USER, username: username.target.value};
}

function LogoutFail(msg) {
  return {type: LoginConstants.LOGOUT_FAILED, msg: msg};
}

const LoginActions = {
  Login,
  LoginSuccess,
  LoginFail,
  LoginUserSet,
  Logout,
  LogoutSuccess,
  LogoutFail,
};

export default LoginActions;
