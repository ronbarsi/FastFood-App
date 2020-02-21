import RestaurantViewActions from "./actions";
import { call, put, takeEvery } from "redux-saga/effects";
import { RestaurantViewActionsConstants } from "./constants";



function* loadData(action) {
  try {
    const userResult = yield call(fetch, action.user_uri, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });

    const restaurantResult = yield call(fetch, action.rest_uri, { method: "GET", headers: { "Content-Type": "application/json" } });

    const restData = yield call([restaurantResult, "json"]);
    const userData = yield call([userResult, "json"]);
    yield put(
      RestaurantViewActions.RestaurantViewLoadSuccess(restData, userData)
    );

  } 
  catch (err) {
    
    yield put(RestaurantViewActions.RestaurantViewLoadFail(err.message));
  }
}

function* RestaurantViewSaga() {
  yield takeEvery(RestaurantViewActionsConstants.RESTAURANT_VIEW_LOAD, loadData);
}

export default RestaurantViewSaga;
