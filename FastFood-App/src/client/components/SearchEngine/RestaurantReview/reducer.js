import { RestaurantReviewActionsConstants } from "./constants";
import initialState from "../../../initialState";

const RestaurantReviewReducer = (
  state = initialState.RestaurantReview,
  action
) => {
  switch (action.type) {
    case RestaurantReviewActionsConstants.REVIEW_CHANGE_RATING:
      const { i, newRating, stars } = action;
      state = state.set(
        "stars",
        stars.map((value, index) => (index == i ? newRating : value))
      );
      return state;

    case RestaurantReviewActionsConstants.REVIEW_SUCCESS:
      state = initialState.RestaurantReview;
      return state;


    case RestaurantReviewActionsConstants.REVIEW_FAILED:
      state = initialState.RestaurantReview;
      return state;

case RestaurantReviewActionsConstants.REVIEW_ADD_PICTURE:
      const { picture, pictures } = action;
      state = state.set("pictures", [...pictures, picture]).set("picture", null);
      return state;

    case RestaurantReviewActionsConstants.REVIEW_SET_PICTURE:
      state = state.set("currentPicture", { name: action.pictureName, data: action.currentPicture, contentType: "image/png" });
      return state;


    default:
      return state;
  }
};

export default RestaurantReviewReducer;
