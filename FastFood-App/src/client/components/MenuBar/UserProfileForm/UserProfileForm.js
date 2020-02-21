import React from "react";
import { connect } from "react-redux";
import Geosuggest from "react-geosuggest";
import UserEditActions from "./actions";
import PropTypes from "prop-types";
import { Button, Modal } from "semantic-ui-react";
import UserProfileView from "../UserProfileView/UserProfileView";

class UserProfileForm extends React.Component {
  imageHandler = event => {
    const fileReader = new FileReader();
    const pic = event.target.files[0];
    fileReader.onloadend = () => {
      this.props.userEditPictureSet(fileReader.result, pic.name);
    };
    fileReader.readAsDataURL(pic);
  };

  render() {
    return (
      <div>
        <Modal trigger={<Button>Profile</Button>} size="tiny">
          <Modal.Header>Your Profile</Modal.Header>
          <Modal.Content image scrolling>
            <Modal.Description>
              <h2>View</h2>
              <br />
              <button
                className="btn btn-primary"
                onClick={() =>
                  this.props.userEditLoadUser(this.props.currentUser)
                }
              >
                Show Profile
              </button>
              {this.props.user ? (
                <UserProfileView
                  user={this.props.user}
                  loggedInUserId={this.props.loggedInUserId}
                />
              ) : (
                  []
                )}
              <div className="ui divider"></div>
              <h2>Edit</h2>
              <br />
              <form
                className="ui form"
                onSubmit={() =>
                  this.props.userEditRequest(
                    this.props.username,
                    this.props.location,
                    this.props.currentUser
                  )
                }
              > Name:
                <input
                  className="field "
                  type="text"
                  id="username"
                  value={this.props.username}
                  onChange={this.props.userEditUserSet}
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  placeholder={this.props.currentUser}
                  required="true"
                />
                {!this.props.userValid && (this.props.username != this.props.currentUser) ? (
                  <div className="ui up pointing red basic label">
                    User name {this.props.username} is already in use!
                  </div>
                ) : (
                    <div />
                  )}
                <br />
                Location:
                <Geosuggest
                  value={this.props.location}
                  placeholder="Location"
                  required="true"
                  onSuggestSelect={this.props.userEditLocationSet}
                />
                {!this.props.userValid && (this.props.username != this.props.currentUser) ? (
                  <button className="ui disabled button">Submit</button>
                ) : (
                    <button className="ui active button">Submit</button>
                  )}
              </form>
              <br />
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    userValid: state["userEdit"].get("userValid"),
    location: state["userEdit"].get("location"),
    username: state["userEdit"].get("username"),
    picture: state["userEdit"].get("picture"),
    user: state["userEdit"].get("user"),
    currentUser: state["app"].get("username"),
    loggedIn: state["app"].get("loggedIn"),
    loggedInUserId: props.loggedInUserId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userEditUserSet: username => {
      dispatch(UserEditActions.userEditUserSet(username));
      dispatch(UserEditActions.validateUserName(username));
    },

    userEditLocationSet: location => {
      dispatch(UserEditActions.userEditLocationSet(location));
    },

    userEditPictureSet: (picture, pictureName) => {
      dispatch(UserEditActions.userEditPictureSet(picture, pictureName));
    },

    userEditRequest: (username, location, currentUser) => {
      dispatch(
        UserEditActions.userEditRequest(username, location, currentUser)
      );
    },

    

    userEditLoadUser: username => {
      dispatch(UserEditActions.userEditLoadUser(username));
    }
  };
};

UserProfileForm.propTypes = {
  username: PropTypes.string,
  picture: PropTypes.object,
  userValid: PropTypes.bool,
  user: PropTypes.object,
  currentUser: PropTypes.string,
  location: PropTypes.object,
  loggedIn: PropTypes.bool,
  loggedInUserId: PropTypes.string
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfileForm);
