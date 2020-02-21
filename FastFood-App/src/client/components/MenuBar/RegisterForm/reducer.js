
import initialState from "../../../initialState";
import { RegisterConstants } from "./constants";

const RegisterReducer = (state = initialState.register, action) => {
  switch (action.type) {
    
    case RegisterConstants.REGISTER_USER_VALIDATION_SUCCESS:
      state = state.set("userValid", true);
      return state;

    case RegisterConstants.REGISTER_USER_VALIDATION_FAILED:
      state = state.set("userValid", false);
      return state;
      
    case RegisterConstants.REGISTER_SUCCESS:
      state = state.set("registerComplete", true);
      return state;

    case RegisterConstants.REGISTER_FAILED:
      state = state.set("registerComplete", false);
      return state;

    case RegisterConstants.REGISTER_CHANGE_USER:
      state = state.set("username", action.username);
      return state;

    case RegisterConstants.REGISTER_CHANGE_LOCATION:
      if (action.location) {
        const { lat, lng } = action.location.location;
        state = state.set("location", {
          description: action.location.description,
          lat: lat,
          lng: lng
        });
      }
      return state;

    case RegisterConstants.REGISTER_CHANGE_PICTURE:
      state = state.set("picture", {
        name: action.pictureName,
        data: action.picture,
        contentType: "image/png"
      });
      return state;



    default:
      return state;
  }
};

export default RegisterReducer;
