import { ReviewEditActionsConstants } from "./constants";

function ReviewEditLoadReviewFail(msg) {
  return { type: ReviewEditActionsConstants.REVIEW_EDIT_LOAD_REVIEW_FAILED, msg: msg };
}

function ReviewEditMaximize(reviewId) {
  return { type: ReviewEditActionsConstants.REVIEW_EDIT_UNMINIFY, reviewId: reviewId };
}

function ReviewEditMinimize() {
  return { type: ReviewEditActionsConstants.REVIEW_EDIT_MINIFY };
}

function ReviewEditDelete(reviewId) {
  return { type: ReviewEditActionsConstants.REVIEW_EDIT_DEL_REVIEW, uri: `api/dev/reviews/delete/${reviewId}` };
}

function ReviewEditRequestSuccess(review) {
  return { type: ReviewEditActionsConstants.REVIEW_EDIT_SUCCESS, review: review };
}

function ReviewEditRequestFail(msg) {
  return { type: ReviewEditActionsConstants.REVIEW_EDIT_FAILED, msg: msg };
}

function ReviewEditLoadReviewSuccess(review) {
  return { type: ReviewEditActionsConstants.REVIEW_EDIT_LOAD_REVIEW_SUCC, review: review };
}

function ReviewEditStarSet(i, newRating, stars) {
  return { type: ReviewEditActionsConstants.REVIEW_EDIT_CHANGE_RATING, i: i, newRating: newRating, stars: stars };
}

function ReviewEditPictureSet(currentPicture, pictureName) {
  return { type: ReviewEditActionsConstants.REVIEW_EDIT_SET_PICTURE, currentPicture: currentPicture, pictureName: pictureName };
}

function ReviewEditPictureAdd(picture, pictures) {
  return { type: ReviewEditActionsConstants.REVIEW_EDIT_ADD_PICTURE, picture: picture, pictures: pictures };
}

function ReviewEditRequest(ReviewEdit) {
  const rating = {
    bathroomQuality: ReviewEdit.stars[0],
    staffKindness: ReviewEdit.stars[1],
    cleanliness: ReviewEdit.stars[2],
    driveThruQuality: ReviewEdit.stars[3],
    deliverySpeed: ReviewEdit.stars[4],
    foodQuality: ReviewEdit.stars[5]
  }
  const details = {
    reviewer: ReviewEdit.reviewer,
    restaurant: ReviewEdit.restaurant,
    pictures: ReviewEdit.pictures,
    rating: rating
  }
  return { type: ReviewEditActionsConstants.REVIEW_EDIT, uri: `api/dev/reviews/edit/${ReviewEdit.reviewId}`, details: details };
}

function ReviewEditLoadReview(id) {
  return { type: ReviewEditActionsConstants.REVIEW_EDIT_LOAD, uri: `api/dev/reviews/get/${id}` };
}

function LoadReviewDeleteRequestSuccess(json) {
  return { type: ReviewEditActionsConstants.REVIEW_EDIT_DEL_SUCCESS, json: json };
}

function LoadReviewDeleteRequestFail(msg) {
  return { type: ReviewEditActionsConstants.REVIEW_EDIT_DEL_FAILED, msg: msg };
}

const ReviewEditActions = {
  LoadReviewDeleteRequestSuccess,
  ReviewEditLoadReview,
  ReviewEditRequestSuccess,
  ReviewEditStarSet,
  ReviewEditPictureSet,
  ReviewEditPictureAdd,
  ReviewEditLoadReviewFail,
  ReviewEditMaximize,
  ReviewEditMinimize,
  ReviewEditRequestFail,
  ReviewEditLoadReviewSuccess,
  ReviewEditRequest,
  ReviewEditDelete,
  LoadReviewDeleteRequestFail
};

export default ReviewEditActions;
