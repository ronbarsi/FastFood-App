import React from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.css";
import { connect } from "react-redux";
import AppActions from "./actions";
import LoginForm from "../MenuBar/LoginForm/LoginForm";
import RegisterForm from "../MenuBar/RegisterForm/RegisterForm";
import { withCookies } from "react-cookie";
import AddRestaurantForm from "../MenuBar/AddRestaurantForm/AddRestaurantForm";
import Search from "../SearchEngine/Search/Search";
import UserProfileForm from "../MenuBar/UserProfileForm/UserProfileForm";
import Background from "../../../background.png";

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.loadUserEventHandler(this.props.cookies.cookies.name);
  }

  render() {
    return (
      <section
            style={{
              backgroundImage: `url(${Background})`,
              backgroundSize: "cover",
              backgroundRepeat: "yes",
              resizeMode: "stretch",
            }}
          > 
      <div className="app-root">
        <div>
          <section
            style={{
              backgroundImage: `url(${Background})`,
              backgroundSize: "cover",
              backgroundRepeat: "yes",
              resizeMode: "stretch",
            }}
          >  
          <br/><br/><br/><br/>
          <h2 className="ui header">Fast Food Restaurants Reviews</h2>

            {this.props.loggedIn ? (
              <div>
                <Search
                  currentUser={this.props.username}
                  loggedInUserId={this.props.loggedInUserId}
                  currentLocation={this.props.location}
                />
              </div>
            ) : (
              []
            )}
          </section>
        </div>
        
        <div className="ui inverted up fixed horizontal menu">
          
          
          <a className="item">
            <LoginForm
              appUser={this.props.username}
              appLoggedIn={this.props.loggedIn}
              currentLocation={this.props.location}
            />
          </a>
          
          <a className="item">
            <RegisterForm loggedInUserId={this.props.loggedInUserId} />
          </a>
          <a className="item">
            <AddRestaurantForm loggedInUserId={this.props.loggedInUserId} />
          </a>
          {this.props.loggedIn ? (
            <a className="item">
              <UserProfileForm loggedInUserId={this.props.loggedInUserId} />
            </a>
          ) : (
            []
          )}
        </div>
      </div> </section>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    username: props.cookies.cookies.name,
    loggedIn:
      props.cookies &&
      props.cookies.cookies.name &&
      props.cookies.cookies.name !== "" ? true : false,
    location:
      props.cookies.cookies.location &&
      props.cookies.cookies.location !== "undefined" &&
      JSON.parse(props.cookies.cookies.location),
    loggedInUserId:
      props.cookies && props.cookies.cookies.id ? JSON.parse(props.cookies.cookies.id) : null 
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadUserEventHandler: name => {
      dispatch(AppActions.loadUserEventHandler(name));
    }
  };
};

export default withCookies(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
