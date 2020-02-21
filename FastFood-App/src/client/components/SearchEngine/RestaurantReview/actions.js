import { RestaurantReviewActionsConstants } from "./constants";


function RestaurantReviewRequestSuccess(msg) {
  return { type: RestaurantReviewActionsConstants.REVIEW_SUCCESS, msg: msg };
}

function RestaurantReviewRequestFail(msg) {
  return { type: RestaurantReviewActionsConstants.REVIEW_FAILED, msg: msg };
}

function RestaurantReviewPictureAdd(picture, pictures) {
  return { type: RestaurantReviewActionsConstants.REVIEW_ADD_PICTURE, picture: picture, pictures: pictures };
}

function RestaurantReviewStarSet(i, newRating, stars) {
  return { type: RestaurantReviewActionsConstants.REVIEW_CHANGE_RATING, i: i, newRating: newRating, stars: stars };
}

function RestaurantReviewPictureSet(currentPicture, pictureName) {
  return { type: RestaurantReviewActionsConstants.REVIEW_SET_PICTURE, currentPicture: currentPicture, pictureName: pictureName };
}



function RestaurantReviewRequest(RestaurantReview) {
  const rating = {
        bathroomQuality: RestaurantReview.stars[0],
        staffKindness: RestaurantReview.stars[1],
        cleanliness: RestaurantReview.stars[2],
        driveThruQuality: RestaurantReview.stars[3],
        deliverySpeed: RestaurantReview.stars[4],
        foodQuality: RestaurantReview.stars[5]
      };
  const details = {
      reviewer: RestaurantReview.reviewer,      
      pictures: RestaurantReview.pictures,
      restaurant: RestaurantReview.restaurant,
      rating: rating
    }
  return { type: RestaurantReviewActionsConstants.REVIEW, uri: "api/dev/reviews/add", details: details };
}

const RestaurantReviewActions = {
  RestaurantReviewRequest,  
  RestaurantReviewRequestFail,
  RestaurantReviewStarSet,
  RestaurantReviewRequestSuccess,
  RestaurantReviewPictureAdd,
  RestaurantReviewPictureSet

};

export default RestaurantReviewActions;
