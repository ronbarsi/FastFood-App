import { all } from "redux-saga/effects";
import AppSaga from "./components/App/saga";
import RegisterSaga from "./components/MenuBar/RegisterForm/saga";
import ReviewViewSaga from "./components/SearchEngine/ReviewView/saga";
import LoginSaga from "./components/MenuBar/LoginForm/saga";
import RestaurantSaga from "./components/MenuBar/AddRestaurantForm/saga";
import UserProfileFormSaga from "./components/MenuBar/UserProfileForm/saga";
import RestaurantReviewSaga from "./components/SearchEngine/RestaurantReview/saga";
import SearchSaga from "./components/SearchEngine/Search/saga";

import ReviewEditSaga from "./components/SearchEngine/ReviewEdit/saga";

export default function* Sagas() {
  yield all([
    AppSaga(),
    LoginSaga(),
    RegisterSaga(),
    RestaurantSaga(),
    UserProfileFormSaga(),
    SearchSaga(),
    RestaurantReviewSaga(),
    ReviewViewSaga(),
    ReviewEditSaga()
  ]);
}
