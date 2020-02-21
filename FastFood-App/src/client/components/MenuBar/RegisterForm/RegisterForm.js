import React from "react";
import { connect } from "react-redux";
import Geosuggest from "react-geosuggest";
import RegisterActions from "./actions";
import PropTypes from "prop-types";
import { Button, Modal } from "semantic-ui-react";

class Register extends React.Component {
  imageHandler = event => {
    const fileReader = new FileReader();
    const pic = event.target.files[0];

    fileReader.onloadend = () => {
      this.props.registerPictureSet(fileReader.result, pic.name);
    };

    fileReader.readAsDataURL(pic);
  };

  render() {
    return (
      <div>
        <Modal trigger={<Button>Register</Button>} size="tiny">
          <Modal.Header>Sign Up</Modal.Header>
          <Modal.Content>
            <div className="auth-page">
              <div className="container page">
                <div className="row">
                  <div>
                    <h4 className="text-xs-center">Please fill in information below:</h4><br />
                    <form
                      className="ui form"
                      onSubmit={() =>
                        this.props.registerRequest(
                          this.props.username,
                          this.props.picture,
                          this.props.location
                        )
                      }
                    ><div>
                        <div class="ui list">
                          <div class="item">
                            <i class="big user icon"></i>
                            <div class="content">
                              <input
                                className="field "
                                type="text"
                                id="username"
                                value={this.props.username}
                                placeholder="User name"
                                onChange={this.props.registerUserSet}
                                autoCorrect="off"
                                autoCapitalize="off"
                                spellCheck="false"
                              /></div><br />
                            {!this.props.userValid ? (
                              <div className="ui up pointing red basic label">
                                User name {this.props.username} is already in use!
                              </div>
                            ) : (
                                []
                              )}
                          </div>
                          <div class="item">
                            <i class="big location arrow icon"></i>
                            <div class="content">
                              <Geosuggest
                                placeholder="Location"
                                onSuggestSelect={this.props.registerLocationSet}
                              />
                            </div>
                          </div>
                          <h6>Profile Photo: </h6>
                          <div class="item">
                            <i class="big image icon"></i>
                            <div class="content">
                              <input
                                className="field "
                                type="file"
                                accept="image/"
                                onChange={this.imageHandler}
                                placeholder="Picture"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <br />
                      {!this.props.userValid ||
                        !this.props.picture ||
                        !this.props.location ? (
                          <button className="ui disabled button">Submit</button>
                        ) : (
                          <button className="ui active button">Submit</button>
                        )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    username: state["register"].get("username"),
    picture: state["register"].get("picture"),
    location: state["register"].get("location"),
    currentlySending: state["register"].get("currentlySending"),
    userValid: state["register"].get("userValid")
  };
};

const mapDispatchToProps = dispatch => {
  return {
    registerUserSet: username => {
      dispatch(RegisterActions.registerUserSet(username));
      dispatch(RegisterActions.validateUserName(username));
    },

    registerRequest: (username, picture, location) => {
      dispatch(RegisterActions.registerRequest(username, picture, location));
    },
    
    registerPictureSet: (picture, pictureName) => {
      dispatch(RegisterActions.registerPictureSet(picture, pictureName));
    },
    
    registerLocationSet: location => {
      dispatch(RegisterActions.registerLocationSet(location));
    }
  };
};

Register.propTypes = {
  username: PropTypes.string,
  picture: PropTypes.object,
  location: PropTypes.object,
  currentlySending: PropTypes.bool,
  userValid: PropTypes.bool
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
