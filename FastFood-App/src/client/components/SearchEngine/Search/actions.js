import { SearchActionsConstants } from "./constants";

function LoadSearch() {
  return { type: SearchActionsConstants.SEARCH_LOAD_SEARCH, user_uri: "/api/dev/users/getall/", rest_uri: "/api/dev/rests/getall/" };
}

function SearchChangeSearchTopic(topic) {
  return { type: SearchActionsConstants.SEARCH_CHANGE_SEARCH_TOPIC, topic: topic };
}

function LoadSearchSuccess(restaurants, users) {
  return { type: SearchActionsConstants.SEARCH_LOAD_SEARCH_SUCCESS, restaurants: restaurants, users: users };
}

function SearchKeyChangeLocation(location) {
  return { type: SearchActionsConstants.SEARCH_CHANGE_LOCATION, location: location };
}

function SearchKeyChangeSelection(selection) {
  return { type: SearchActionsConstants.SEARCH_CHANGE_SELECTION, selection: selection };
}

function LoadSearchFailed(msg) {
  return { type: SearchActionsConstants.SEARCH_LOAD_SEARCH_FAILED, msg: msg };
}

function SearchKeyChange(key) {
  return { type: SearchActionsConstants.SEARCH_CHANGE_SEARCH_KEY, key: key };
}

function SearchChangeRating(stars) {
  return { type: SearchActionsConstants.SEARCH_CHANGE_RATING, stars: stars };
}


function SearchChangeSorting(sort) {
  return { type: SearchActionsConstants.SEARCH_CHANGE_SORTING, sort: sort };
}

function SearchChangeScale(scale) {
  return { type: SearchActionsConstants.SEARCH_CHANGE_SCALE, scale: scale };
}
// export functions:

const SearchActions = {
  LoadSearchFailed,
  LoadSearch,
  LoadSearchSuccess,
  SearchKeyChange,  
  SearchKeyChangeSelection,
  SearchChangeRating,
  SearchKeyChangeLocation,
  SearchChangeSorting,

  SearchChangeSearchTopic,
  SearchChangeScale
};

export default SearchActions;
