import { RestaurantReviewActionsConstants } from "./constants";
import RestaurantReviewActions from "./actions";
import { call, put, takeEvery } from "redux-saga/effects";


function* sendRestaurantReviewRequest(action) {

  try {
    const result = yield call(fetch, action.uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(action.details)
    });

    const data = yield call([result, "json"]);

    yield put(RestaurantReviewActions.RestaurantReviewRequestSuccess(data));

  } 
  catch (err) {

    yield put(RestaurantReviewActions.RestaurantReviewRequestFail(err.message));
  }
}

function* RestaurantReviewSaga() {
  yield takeEvery(
    RestaurantReviewActionsConstants.REVIEW,
    sendRestaurantReviewRequest
  );
}

export default RestaurantReviewSaga;
