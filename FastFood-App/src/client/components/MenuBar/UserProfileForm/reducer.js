import { UserProfileFormConstants } from "./constants";
import initialState from "../../../initialState";

const UserProfileFormReducer = (state = initialState.UserEdit, action) => {
  switch (action.type) {

    case UserProfileFormConstants.EDIT_USER_SUCCESS:
      state = state.set("userEditComplete", true);
      return state;

    case UserProfileFormConstants.EDIT_USER_FAILED:
      state = state.set("userEditComplete", false);
      return state;

   case UserProfileFormConstants.EDIT_USER_CHANGE_LOCATION:
      if (action.location) {
        const { lat, lng } = action.location.location;
        const location =  {
          description: action.location.description,
          lat: lat,
          lng: lng
        };
        state = state.set("location", location);
      }
      return state;

    case UserProfileFormConstants.EDIT_USER_CHANGE_USER:
      state = state.set("username", action.username);
      return state;

 

    case UserProfileFormConstants.EDIT_USER_LOAD_USER_DATA_SUCCESS:
      state = state.set("user", action.user);
      return state;
      
    case UserProfileFormConstants.EDIT_USER_USER_VALIDATION_SUCCESS:
      state = state.set("userValid", true);
      return state;

    case UserProfileFormConstants.EDIT_USER_USER_VALIDATION_FAILED:
      state = state.set("userValid", false);
      return state;


    default:
      return state;
  }
};

export default UserProfileFormReducer;
