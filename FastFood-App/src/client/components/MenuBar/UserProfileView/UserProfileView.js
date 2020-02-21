import React from "react";
import { connect } from "react-redux";
import UserViewActions from "./actions";
import ReviewView from "../../SearchEngine/ReviewView/ReviewView";
import PropTypes from "prop-types";

class UserProfileView extends React.Component {
  render() {
    return (
      <div className="ui centered card">
        {this.props.minify ? (
          <div className="content">
            <div class="ui list">
              <div class="item">
                <i class="big user circle icon"></i>
                <div class="content">
                  <h5>{this.props.user.username}</h5>
                </div>
              </div>
            </div>
            <button
              className="ui button"
              onClick={() => {
                this.props.Unminify(this.props.user.username);
              }}
            >
              More Details
            </button>
          </div>
        ) : (
            <div className="ui centered card">
              <div className="content">
                <div class="ui list">
                  <div class="item">
                    <i class="big user circle icon"></i>
                    <div class="content">
                      <h5>{this.props.user.username}</h5>
                    </div>
                  </div>
                </div>
                <div className="image">
                  <img class="ui medium circular image" src={this.props.user.picture.data} />
                  <div className="content">
                    <div className="description">
                      <br />
                      <h6>Location: </h6> {this.props.user.location.description}
                    </div>
                  </div>
                  <br />
                  <h6>
                    Reviews:{" "}</h6>
                  {this.props.user.reviews.length == 0 ? ("- None -") :
                    (this.props.user.reviews.map((review, index) => (
                      <ReviewView
                        review={review}
                        key={index}
                        reviewId={review._id}
                        loggedInUserId={this.props.loggedInUserId}
                      />
                    )))}
                  <br /><br />
                  <button className="ui button" onClick={this.props.Minify}>
                    Less Details
            </button>
                </div></div> </div>
          )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    Unminify: username => {
      dispatch(UserViewActions.Unminify(username));
    },
    Minify: () => {
      dispatch(UserViewActions.Minify());
    }
  };
};

const mapStateToProps = (state, props) => {
  return {
    user: props.user,
    minify: state["userView"].get("minify"),
    loggedInUserId: props.loggedInUserId
  };
};



UserProfileView.propTypes = {
  user: PropTypes.object,
  minify: PropTypes.bool,
  loggedInUserId: PropTypes.string
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfileView);
