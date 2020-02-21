import { AddRestaurantFormConstants } from "./constants";

function RestaurantRequestSuccess(msg) {
  /*
    Request Success
  */
  return {
    type: AddRestaurantFormConstants.ADD_NEW_RESTAURANT_SUCC,
    msg: msg
  };
}

function RestaurantRequestFail(msg) {
  /*
    Request Fail
  */
  return {
    type: AddRestaurantFormConstants.ADD_NEW_RESTAURANT_FAIL,
    msg: msg
  };
}

function RestaurantRequest(name, location) {
  /*
    Add restaurant request
  */
  return {
    type: AddRestaurantFormConstants.ADD_NEW_RESTAURANT,
    restaurantDetails: {
      name,
      location
    },
    uri: "/api/dev/rests/add"
  };
}



function RestaurantLocationSet(location) {
  /*
    Change location
  */
  return {
    type: AddRestaurantFormConstants.RESTAURANT_CHANGE_LOCATION,
    location: location
  };
}

function RestaurantNameSet(name) {
  /*
    Change name
  */
  return {
    type: AddRestaurantFormConstants.RESTAURANT_CHANGE_NAME,
    name: name.target.value
  };
}



const RestaurantActions = {
  RestaurantRequest,  
  RestaurantNameSet,
  RestaurantLocationSet,
  RestaurantRequestSuccess,
  RestaurantRequestFail
};

export default RestaurantActions;
