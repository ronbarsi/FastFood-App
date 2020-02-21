import { RegisterConstants } from "./constants";

function registerRequestSuccess(msg) {
  return { type: RegisterConstants.REGISTER_SUCCESS, msg: msg };
}

function registerRequestFail(msg) {
  return { type: RegisterConstants.REGISTER_FAILED, msg: msg };
}

function validateUserName(username) {
  return { type: RegisterConstants.REGISTER_USER_VALIDATION, uri: `/api/dev/users/validate/${username.target.value}` };
}

function ValidateFail() {
  return { type: RegisterConstants.REGISTER_USER_VALIDATION_FAILED };
}

function ValidateSuccess() {
  return { type: RegisterConstants.REGISTER_USER_VALIDATION_SUCCESS };
}
 
function registerUserSet(username) {
  return { type: RegisterConstants.REGISTER_CHANGE_USER, username: username.target.value };
}

function registerLocationSet(location) {
  return { type: RegisterConstants.REGISTER_CHANGE_LOCATION, location: location };
}

function registerPictureSet(picture, pictureName) {
  return { type: RegisterConstants.REGISTER_CHANGE_PICTURE, picture: picture, pictureName: pictureName };
}

function registerRequest(username, picture, location) {
  return {
    type: RegisterConstants.REGISTER,
    uri: "/api/dev/users/register",
    registerDetails: {
      username,
      picture,
      location
    }
  };
}

const RegisterActions = {
  registerRequest,
  registerRequestSuccess,
  registerRequestFail,
  validateUserName,
  ValidateFail,
  ValidateSuccess,
  registerUserSet,
  registerPictureSet,
  registerLocationSet
  
};

export default RegisterActions;
