import { AppActionsConstants } from "./constants.js";

function loadUserEventHandler(name) {
  return {
    type: AppActionsConstants.LOAD_USER_DATA,
    name: name
  };
}


const AppActions = {
  loadUserEventHandler
};

export default AppActions;
