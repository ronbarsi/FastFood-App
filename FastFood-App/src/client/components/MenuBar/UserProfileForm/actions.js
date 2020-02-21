import { UserProfileFormConstants } from "./constants";



function validateUserName(username) {
  return { type: UserProfileFormConstants.EDIT_USER_USER_VALIDATION, uri: `/api/dev/users/validate/${username.target.value}` };
}

function ValidateFail() {
  return { type: UserProfileFormConstants.EDIT_USER_USER_VALIDATION_FAILED };
}

function ValidateSuccess() {
  return { type: UserProfileFormConstants.EDIT_USER_USER_VALIDATION_SUCCESS };
}

function userEditRequestFail(msg) {
  return { type: UserProfileFormConstants.EDIT_USER_FAILED, msg: msg };
}

function userEditRequestSuccess(msg) {
  return { type: UserProfileFormConstants.EDIT_USER_SUCCESS, msg: msg };
}
function userEditUserSet(username) {
  return { type: UserProfileFormConstants.EDIT_USER_CHANGE_USER, username: username.target.value };
}

function userEditLocationSet(location) {
  return { type: UserProfileFormConstants.EDIT_USER_CHANGE_LOCATION, location: location };
}

function userEditLoadUser(username) {
  return { type: UserProfileFormConstants.EDIT_USER_LOAD_USER_DATA, uri: `/api/dev/users/get/${username}` };
}

function userEditPictureSet(picture, pictureName) {
  return { type: UserProfileFormConstants.EDIT_USER_CHANGE_PICTURE, picture: picture, pictureName: pictureName };
}

function userEditLoadUserFail(msg) {
  return { type: UserProfileFormConstants.EDIT_USER_LOAD_USER_DATA_FAILED, msg: msg };
}

function userEditLoadUserSuccess(user) {
  return { type: UserProfileFormConstants.EDIT_USER_LOAD_USER_DATA_SUCCESS, user: user };
}
function userEditRequest(username, location, currentUser) {
  return {
    type: UserProfileFormConstants.EDIT_USER,
    uri: `/api/dev/users/edit/${currentUser}`,
    userEditDetails: {
      username,
      location
    }
  };
}

const UserEditActions = {
  userEditRequest,
  userEditRequestSuccess,
  userEditUserSet,  
  validateUserName,
  ValidateFail,
  ValidateSuccess,
  userEditPictureSet,
  userEditLocationSet,
  userEditRequestFail,
  userEditLoadUser,
  userEditLoadUserSuccess,
  userEditLoadUserFail
};

export default UserEditActions;
