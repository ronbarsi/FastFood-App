import ReviewEditActions from "./actions";
import { ReviewEditActionsConstants } from "./constants";
import { call, put, takeEvery } from "redux-saga/effects";

function* loadReviewDeleteRequest(action) {
  try {
    const result = yield call(fetch, action.uri, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = yield call([result, "json"]);
    yield put(ReviewEditActions.LoadReviewDeleteRequestSuccess(data));

  } 
  catch (err) {
    yield put(ReviewEditActions.LoadReviewDeleteRequestFail(err.message));
  }
}

function* loadReviewEditRequest(action) {
  try {
    const result = yield call(fetch, action.uri, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = yield call([result, "json"]);
    yield put(ReviewEditActions.ReviewEditLoadReviewSuccess(data));

  } 
  catch (err) {
    yield put(ReviewEditActions.ReviewEditLoadReviewFail(err.message));
  }
}

function* sendReviewEditRequest(action) {
  try {
    const result = yield call(fetch, action.uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(action.details)
    });

    const data = yield call([result, "json"]);
    yield put(ReviewEditActions.ReviewEditRequestSuccess(data));

  } 
  catch (err) {
    yield put(ReviewEditActions.ReviewEditRequestFail(err.message));
  }
}

function* ReviewEditSaga() {
  yield takeEvery( ReviewEditActionsConstants.REVIEW_EDIT, sendReviewEditRequest );
  yield takeEvery( ReviewEditActionsConstants.REVIEW_EDIT_LOAD, loadReviewEditRequest );
  yield takeEvery( ReviewEditActionsConstants.REVIEW_EDIT_DEL_REVIEW, loadReviewDeleteRequest );
}

export default ReviewEditSaga;
