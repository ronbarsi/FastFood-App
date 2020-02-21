import { combineReducers } from "redux";
import AppReducer from "./components/App/reducer";
import RegisterReducer from "./components/MenuBar/RegisterForm/reducer";
import ReviewEditReducer from "./components/SearchEngine/ReviewEdit/reducer";
import LoginReducer from "./components/MenuBar/LoginForm/reducer";
import ReviewViewReducer from "./components/SearchEngine/ReviewView/reducer";
import RestaurantReducer from "./components/MenuBar/AddRestaurantForm/reducer";
import SearchReducer from "./components/SearchEngine/Search/reducer";
import RestaurantReviewReducer from "./components/SearchEngine/RestaurantReview/reducer";

import UserProfileFormReducer from "./components/MenuBar/UserProfileForm/reducer";
import RestaurantViewReducer from "./components/SearchEngine/RestaurantView/reducer";
import UserViewReducer from "./components/MenuBar/UserProfileView/reducer";


export default combineReducers(
  {
    app: AppReducer,
    login: LoginReducer,
    register: RegisterReducer,
    restaurant: RestaurantReducer,
    userView: UserViewReducer,
    userEdit: UserProfileFormReducer,
    search: SearchReducer,
    review: RestaurantReviewReducer,
    reviewView: ReviewViewReducer,
    reviewEdit: ReviewEditReducer,
    restaurantView: RestaurantViewReducer
  }
);
