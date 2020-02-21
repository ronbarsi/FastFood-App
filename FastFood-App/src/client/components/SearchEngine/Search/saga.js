import SearchActions from "./actions";
import { SearchActionsConstants } from "./constants";
import { call, put, takeEvery } from "redux-saga/effects";

function* loadData(action) {
  try {
    const restaurantResults = yield call(fetch, action.rest_uri, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const userResults = yield call(fetch, action.user_uri, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const userdata = yield call([userResults, "json"]);
    const restData = yield call([restaurantResults, "json"]);
    yield put(SearchActions.LoadSearchSuccess(restData, userdata));

  } 
  catch (err) {
    yield put(SearchActions.LoadSearchFailed(err.message));
  }
}

function* SearchSaga() {
  yield takeEvery(SearchActionsConstants.SEARCH_LOAD_SEARCH, loadData);
}

export default SearchSaga;
