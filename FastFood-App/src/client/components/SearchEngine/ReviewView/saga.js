import ReviewViewActions from "./actions";
import { ReviewViewActionsConstants } from "./constants";
import { call, put, takeEvery } from "redux-saga/effects";

function* loadData(action) {
  try {
    const result = yield call(fetch, action.uri, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = yield call([result, "json"]);
    yield put(ReviewViewActions.ReviewViewLoadSuccess(data));

  } 
  catch (err) {
    yield put(ReviewViewActions.ReviewViewLoadFail(err.message));
  }
}



function* ReviewViewSaga() {
  yield takeEvery(ReviewViewActionsConstants.REVIEW_VIEW_LOAD, loadData);
}

export default ReviewViewSaga;
