import initialState from "../../../initialState";
import { ReviewEditActionsConstants } from "./constants";

const ReviewEditReducer = (state = initialState.ReviewEdit, action) => {
  switch (action.type) {

    case ReviewEditActionsConstants.REVIEW_EDIT_LOAD_REVIEW_SUCC:
      const { rating } = action.review;
      state = state.set("review", action.review)
        .set("stars", [
          rating["bathroomQuality"],
          rating["cleanliness"],
          rating["deliverySpeed"],
          rating["driveThruQuality"],
          rating["foodQuality"],
          rating["staffKindness"]
        ])
        .set("pictures", action.review.pictures);
      return state;

    case ReviewEditActionsConstants.REVIEW_EDIT_ADD_PICTURE:
      const { picture, pictures } = action;
      state = state.set("pictures", [...pictures, picture])
        .set("picture", null);
      return state;

    case ReviewEditActionsConstants.REVIEW_EDIT_SUCCESS:
      state = state.set("review", action.review);
      return state;

    case ReviewEditActionsConstants.REVIEW_EDIT_CHANGE_RATING:
      const { i, newRating, stars } = action;
      state = state.set("stars", stars.map((value, index) => (index == i ? newRating : value)));
      return state;

    case ReviewEditActionsConstants.REVIEW_EDIT_UNMINIFY:
      state = state.set("minimize", false)
        .set("reviewId", action.reviewId);
      return state;

    case ReviewEditActionsConstants.REVIEW_EDIT_SET_PICTURE:
      state = state.set("currentPicture", { name: action.pictureName, data: action.currentPicture, contentType: "image/png" });
      return state;

    case ReviewEditActionsConstants.REVIEW_EDIT_LOAD_REVIEW_FAILED:
      alert("fail load review");
      return state;

    case ReviewEditActionsConstants.REVIEW_EDIT_MINIFY:
      state = state.set("minimize", true);
      return state;

    default:
      return state;
  }
};

export default ReviewEditReducer;
