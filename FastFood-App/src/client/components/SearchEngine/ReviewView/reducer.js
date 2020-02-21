import initialState from "../../../initialState";
import { ReviewViewActionsConstants } from "./constants";

const ReviewViewReducer = (state = initialState.ReviewView, action) => {
  switch (action.type) {

    case ReviewViewActionsConstants.REVIEW_VIEW_MINIFY_VIEW:
      state = state.set("minify", true);
      return state;

    case ReviewViewActionsConstants.REVIEW_VIEW_CHANGE_KEY:
      state = state.set("searchKey", action.key);
      return state;

    case ReviewViewActionsConstants.REVIEW_VIEW_LOAD_VIEW_SUCCESS:
      state = state.set("review", action.review);
      return state;

    case ReviewViewActionsConstants.REVIEW_VIEW_UNMINIFY_VIEW:
      state = state.set("minify", false)
        .set("reviewId", action.reviewId);
      return state;

    case ReviewViewActionsConstants.REVIEW_VIEW_CHANGE_SELECTION:
      state = state.set("selection", action.selection);
      return state;

    default:
      return state;
  }
};

export default ReviewViewReducer;
