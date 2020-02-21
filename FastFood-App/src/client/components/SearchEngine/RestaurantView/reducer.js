import initialState from "../../../initialState";
import { RestaurantViewActionsConstants } from "./constants";


const RestaurantViewReducer = (state = initialState.restaurantView, action) => {
  switch (action.type) {

    case RestaurantViewActionsConstants.RESTAURANT_VIEW_CHANGE_SORTING:
      state = state.set("sortBy", action.sort)
        .set("starFilter", 0)
        .set("topicFilter", "any")
        .set("reviewTimeSort", "oldest");
      return state;

    case RestaurantViewActionsConstants.RESTAURANT_VIEW_MINIFY:
      state = state.set("minify", true);
      return state;

    case RestaurantViewActionsConstants.RESTAURANT_VIEW_SHOW_REVIEW:
      state = state.set("writeReview", true);
      return state;


    case RestaurantViewActionsConstants.RESTAURANT_VIEW_UNMINIFY:
      state = state.set("minify", false)
        .set("restaurantName", action.restaurantName);
      return state;

    case RestaurantViewActionsConstants.RESTAURANT_VIEW_CHANGE_TIME_SORTING:
      state = state.set("reviewTimeSort", action.sort);
      return state;


    case RestaurantViewActionsConstants.RESTAURANT_VIEW_HIDE_REVIEW:
      state = state.set("writeReview", false);
      return state;

    case RestaurantViewActionsConstants.RESTAURANT_VIEW_CHANGE_D_FILTER:
      state = state.set("daysFilter", action.filter);
      return state;


    case RestaurantViewActionsConstants.RESTAURANT_VIEW_CHANGE_RATING:
      state = state.set("starFilter", action.star);
      return state;

    case RestaurantViewActionsConstants.RESTAURANT_VIEW_CHANGE_TOPIC:
      state = state.set("topicFilter", action.topic);
      return state;



    default:
      return state;
  }
};

export default RestaurantViewReducer;
