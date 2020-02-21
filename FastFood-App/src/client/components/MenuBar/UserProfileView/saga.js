import UserViewActions from "./actions";
import { UserViewActionsConstants } from "./constants";
import { call, put, takeEvery } from "redux-saga/effects";


function* loadData(action) {
  try {
    const restaurantResult = yield call(fetch, action.rest_uri, {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    });

    const userResult = yield call(fetch, action.user_uri, {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    });

    const restData = yield call([restaurantResult, "json"]);
    const userData = yield call([userResult, "json"]);

    yield put(UserViewActions.UserViewLoadSuccess(restData, userData));

  } 
  catch (err) {
    yield put(UserViewActions.UserViewLoadFail(err.message));
  }
}

function* UserViewSaga() {
  yield takeEvery(UserViewActionsConstants.USERVIEW_LOAD, loadData);
}

export default UserViewSaga;
