import RestaurantActions from "./actions";
import { AddRestaurantFormConstants } from "./constants";
import { call, put, takeEvery } from "redux-saga/effects";

// Request Generator
function* restaurantRequest(action) {
  try {
    const result = yield call(fetch, action.uri,
      {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(action.restaurantDetails)
      }
    );

    const data = yield call([result, "json"]);

    yield put(RestaurantActions.RestaurantRequestSuccess(data));

  } catch (e) {
    // error
    yield put(RestaurantActions.RestaurantRequestFail(e.message));
  
  }
}

function* RestaurantSaga() {

  yield takeEvery(AddRestaurantFormConstants.ADD_NEW_RESTAURANT, restaurantRequest);

}

export default RestaurantSaga;
