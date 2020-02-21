import { LoginConstants } from "./constants";
import { call, put, takeEvery } from "redux-saga/effects";
import LoginActions from "./actions";

// Logout

function* Logout(action) {
  try {
    const result = yield call(fetch, action.uri, {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    });

    const data = yield call([result, "json"]);
    yield put(LoginActions.LogoutSuccess(data));
  }
  catch (err) {

    yield put(LoginActions.LogoutFail(err));

  }
}

// Login 

function* Login(action) {
  try {
    const result = yield call(fetch, action.uri,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });

    const data = yield call([result, "json"]);
    yield put(LoginActions.LoginSuccess(data));
  }
  catch (err) {

    yield put(LoginActions.LoginFail(err));

  }
}

function* LoginSaga() {
  yield takeEvery(LoginConstants.LOGIN, Login);
  yield takeEvery(LoginConstants.LOGOUT, Logout);
}

export default LoginSaga;
