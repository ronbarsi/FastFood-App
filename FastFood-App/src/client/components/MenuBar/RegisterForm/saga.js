import RegisterActions from "./actions";
import { RegisterConstants } from "./constants";
import { call, put, takeEvery } from "redux-saga/effects";

function* validateRegisterUsername(action) {
  try {
    const result = yield call(fetch, action.uri, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = yield call([result, "json"]);
    if (data[0]) {
      yield put(RegisterActions.ValidateFail(data[0]));
    } 
    else {
      yield put(RegisterActions.ValidateSuccess());
    }
  } 
  catch (err) {

    yield put(RegisterActions.ValidateSuccess());
  }
}

function* sendRegisterRequest(action) {
  try {
    const result = yield call(fetch, action.uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(action.registerDetails)
    });
    const data = yield call([result, "json"]);

    yield put(RegisterActions.registerRequestSuccess(data[0]));
  } 
  catch (err) {
    yield put(RegisterActions.registerRequestFail(err.message));
  }
}

function* RegisterSaga() {
  yield takeEvery(RegisterConstants.REGISTER, sendRegisterRequest);
  yield takeEvery(RegisterConstants.REGISTER_USER_VALIDATION, validateRegisterUsername );
}

export default RegisterSaga;
