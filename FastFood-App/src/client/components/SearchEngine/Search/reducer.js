import initialState from "../../../initialState";
import { SearchActionsConstants } from "./constants";

const SearchReducer = (state = initialState.Search, action) => {
  switch (action.type) {

    case SearchActionsConstants.SEARCH_CHANGE_SORTING:
      state = state.set("topicFilter", "any")
        .set("starFilter", 0)
        .set("sortBy", action.sort);
      return state;

    case SearchActionsConstants.SEARCH_LOAD_SEARCH_SUCCESS:
      state = state.set("restaurants", action.restaurants)
        .set("users", action.users);
      return state;

    case SearchActionsConstants.SEARCH_CHANGE_SEARCH_KEY:
      state = state.set("searchKey", action.key);
      return state;

    case SearchActionsConstants.SEARCH_CHANGE_LOCATION:
      state = state.set("searchKeyLocation", action.location);
      return state;

    case SearchActionsConstants.SEARCH_CHANGE_SELECTION:
      state = state.set("selection", action.selection);
      return state;

    case SearchActionsConstants.SEARCH_CHANGE_SEARCH_TOPIC:
      state = state.set("topicFilter", action.topic);
      return state;

    case SearchActionsConstants.SEARCH_CHANGE_RATING:
      state = state.set("starFilter", action.stars);
      return state;

    case SearchActionsConstants.SEARCH_CHANGE_SCALE:
      state = state.set("scaleValue", action.scale);
      return state;

    default:
      return state;
  }
};

export default SearchReducer;
