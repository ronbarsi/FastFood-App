import UserEditActions from "./actions";
import { UserProfileFormConstants } from "./constants";
import { call, put, takeEvery } from "redux-saga/effects";

function* validateEditUsername(action) {
  try {
    const result = yield call(fetch, action.uri, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = yield call([result, "json"]);
    if (data[0]) {
      yield put(UserEditActions.ValidateFail());
    } 
    else {

      yield put(UserEditActions.ValidateSuccess());
    }
  } 
  catch (err) {
    yield put(UserEditActions.ValidateSuccess());
  }
}

function* editUser(action) {
  try {
    const result = yield call(fetch, action.uri, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(action.userEditDetails)
    });

    const data = yield call([result, "json"]);
    yield put(UserEditActions.userEditRequestSuccess(data));
  } 
  catch (err) {
    yield put(UserEditActions.userEditRequestFail(err.message));
  }
}



function* loadReviews(action) {
  try {
    const result = yield call(fetch, action.uri, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = yield call([result, "json"]);

    yield put(UserEditActions.userEditLoadUserSuccess(data));
  } 
  catch (err) {
    yield put(UserEditActions.userEditLoadUserFail(err.message));
  }
}

function* UserProfileFormSaga() {
  yield takeEvery( UserProfileFormConstants.EDIT_USER, editUser);
  yield takeEvery( UserProfileFormConstants.EDIT_USER_USER_VALIDATION, validateEditUsername);
  yield takeEvery( UserProfileFormConstants.EDIT_USER_LOAD_USER_DATA, loadReviews);
}

export default UserProfileFormSaga;
