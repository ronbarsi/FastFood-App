import { ReviewViewActionsConstants } from "./constants";

function ReviewViewLoadSuccess(review) {
  return { type: ReviewViewActionsConstants.REVIEW_VIEW_LOAD_VIEW_SUCCESS, review: review };
}

function ReviewViewLoadFail(msg) {
  return { type: ReviewViewActionsConstants.REVIEW_VIEW_LOAD_VIEW_FAILED, msg: msg };
}

function ReviewViewLoad(id) {
  return { type: ReviewViewActionsConstants.REVIEW_VIEW_LOAD, uri: `api/dev/reviews/get/${id}` };
}

function Unminify(reviewId) {
  return { type: ReviewViewActionsConstants.REVIEW_VIEW_UNMINIFY_VIEW, reviewId: reviewId };
}

function ReviewViewKeyChange(key) {
  return { type: ReviewViewActionsConstants.REVIEW_VIEW_CHANGE_KEY, key: key };
}

function ReviewViewSelectionChange(selection) {
  return { type: ReviewViewActionsConstants.REVIEW_VIEW_CHANGE_SELECTION, selection: selection };
}

function Minify(selection) {
  return { type: ReviewViewActionsConstants.REVIEW_VIEW_MINIFY_VIEW };
}

const ReviewViewActions = {
  ReviewViewLoadSuccess,  
  ReviewViewKeyChange,
  ReviewViewSelectionChange,
  ReviewViewLoadFail,
  ReviewViewLoad,
  Unminify,
  Minify
};

export default ReviewViewActions;
