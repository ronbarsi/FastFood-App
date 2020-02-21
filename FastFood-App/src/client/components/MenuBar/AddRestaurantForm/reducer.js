import initialState from "../../../initialState";
import { AddRestaurantFormConstants } from "./constants";


const RestaurantReducer = (state = initialState.Restaurant, action) => {
  switch (action.type) {
    case AddRestaurantFormConstants.RESTAURANT_CHANGE_LOCATION:
      if (action.location) {
        const { lat, lng } = action.location.location;
        const loc = {
          description: action.location.description,
          lat: lat,
          lng: lng
        }
        state = state.set("location", loc);
      }
      return state;

    case AddRestaurantFormConstants.RESTAURANT_CHANGE_NAME:
      state = state.set("name", action.name);
      return state;

    default:
      return state;
  }
};

export default RestaurantReducer;
