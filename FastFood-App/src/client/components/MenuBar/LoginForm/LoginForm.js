import React from "react";
import { connect } from "react-redux";
import LoginActions from "./actions";
import PropTypes from "prop-types";
import { Button, Modal } from 'semantic-ui-react'

class LoginForm extends React.Component {
  render() {
    const { username } = this.props;
    return (
      <div>
        {this.props.loggedIn ? (
          <div>
            <h6>Logged in as {this.props.appUser}</h6>
            <Button onClick={() => { this.props.logout(); }}>Logout</Button>
          </div>
        ) : (
            <Modal trigger={<Button>Login</Button>} size="tiny">
              <Modal.Header>Please fill in information below</Modal.Header>
              <Modal.Content image>
                <Modal.Description>
                  <form name="loginForm">
                    <div>
                      <label htmlFor="username">Username</label>
                      {this.props.loggedIn ? (
                        <h4>Logged in ({this.props.appUser})</h4>
                      ) : (
                          <input
                            type="text"
                            className="form-control"
                            value={this.props.username}
                            onChange={this.props.loginUserSet}
                          />
                        )}
                      {!(username || this.props.loggedIn) && (
                        <div className="help-block">Username is required</div>
                      )}
                    </div><br/>
                    <div className="form__submit-btn-wrapper">
                      <div>
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            this.props.login(this.props.username);
                          }}
                        >
                          Login
                        </button>
                      </div>
                    </div>
                  </form>
                </Modal.Description>
              </Modal.Content>
            </Modal>
          )}
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    username: state["login"].get("username"),
    loggedIn: props.appLoggedIn
  };
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {dispatch(LoginActions.Logout());},

    login: username => {dispatch(LoginActions.Login(username));},

    loginUserSet: username => {dispatch(LoginActions.LoginUserSet(username));}
  };
};

LoginForm.propTypes = {
  username: PropTypes.string,
  loggedIn: PropTypes.bool
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
