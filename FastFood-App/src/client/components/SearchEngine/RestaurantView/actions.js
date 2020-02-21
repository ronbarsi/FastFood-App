import { RestaurantViewActionsConstants } from "./constants";

function Minify() {
  return { type: RestaurantViewActionsConstants.RESTAURANT_VIEW_MINIFY };
}

function WriteReviewShow() {
  return { type: RestaurantViewActionsConstants.RESTAURANT_VIEW_SHOW_REVIEW };
}

function Unminify(restaurantName) {
  return { type: RestaurantViewActionsConstants.RESTAURANT_VIEW_UNMINIFY, restaurantName: restaurantName };
}

function WriteReviewHide() {
  return { type: RestaurantViewActionsConstants.RESTAURANT_VIEW_HIDE_REVIEW };
}

function ReviewsSortByTimeChange(sort) {
  return { type: RestaurantViewActionsConstants.RESTAURANT_VIEW_CHANGE_TIME_SORTING, sort: sort };
}

function ReviewsSortByChange(sort) {
  return { type: RestaurantViewActionsConstants.RESTAURANT_VIEW_CHANGE_SORTING, sort: sort };
}

function RestaurantDaysFilterChange(filter) {
  return { type: RestaurantViewActionsConstants.RESTAURANT_VIEW_CHANGE_D_FILTER, filter: filter };
}

function ReviewsTopicChange(topic) {
  return { type: RestaurantViewActionsConstants.RESTAURANT_VIEW_CHANGE_TOPIC, topic: topic };
}

function ReviewsStarChange(star) {
  return { type: RestaurantViewActionsConstants.RESTAURANT_VIEW_CHANGE_RATING, star: star };
}



const RestaurantViewActions = {
  ReviewsTopicChange,

  ReviewsSortByChange,
  WriteReviewShow,
  WriteReviewHide,
  ReviewsStarChange,
  Unminify,
  ReviewsSortByTimeChange,
  Minify,
  RestaurantDaysFilterChange
};

export default RestaurantViewActions;
