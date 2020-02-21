import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import RestaurantViewActions from "./actions";
import RestaurantReview from "../RestaurantReview/RestaurantReview";
import ReviewView from "../ReviewView/ReviewView";



const filterByTopicRating = (topic, stars) => review =>
  topic == "any" || review.rating[topic] >= stars;

const sortByTopicRating = topic => function (review1, review2) {
  if (topic == "any") return 0;
  else return review2.rating[topic] - review1.rating[topic];
}



class RestaurantView extends React.Component {
  render() {
    return (
      <React.Fragment>
        {this.props.minify ? (
          <div className="ui centered card">
            <h6 className="header">Name:</h6>
            <div className="header">{this.props.restaurant.name}</div>
            <button
              className="ui button"
              onClick={() => {
                this.props.Unminify(this.props.restaurant.name);
              }}
            >
              More details
            </button>
          </div>
        ) : (
            <div className="ui centered card">
              <h6 className="header">Name:</h6>
              <div className="header">{this.props.restaurant.name}</div>
              <h6 className="content">Location:</h6>
              <div className="header">{this.props.restaurant.location.description}</div>
              <div className="content">
                <h6>Sort By:</h6><br />
                <select
                  className="ui dropdown"
                  value={this.props.sortBy}
                  onChange={this.props.ReviewsSortByChange}
                >
                  <option value="date">Date</option>
                  <option value="topic">Topic</option>
                </select>
              </div>
              {this.props.sortBy == "date" ? (
                <div className="content">
                  <select
                    className="ui dropdown"
                    value={this.props.reviewTimeSort}
                    onChange={this.props.ReviewsSortByTimeChange}>

                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                  </select> <br /><br />
                  <select
                    className="ui dropdown"
                    value={this.props.daysFilter}
                    onChange={this.props.RestaurantDaysFilterChange}
                  >
                    <option value="allTime">All Time</option>
                    <option value="year">Since Last Year</option>
                    <option value="month">Since Last Month</option>
                    <option value="week">Since Last Week</option>
                  </select>
                </div>
              ) : (
                  <div className="content">
                    <select
                      className="ui dropdown"
                      value={this.props.starFilter}
                      onChange={this.props.ReviewsStarChange}
                    >
                      <option value="0">0+ Stars</option>
                      <option value="1">1+ Stars</option>
                      <option value="2">2+ Stars</option>
                      <option value="3">3+ Stars</option>
                      <option value="4">4+ Stars</option>
                    </select> <br /><br />
                    <select
                      className="ui dropdown"
                      value={this.props.topicFilter}
                      onChange={this.props.ReviewsTopicChange}
                    >
                      <option value="any">No Filter</option>
                      <option value="bathroomQuality">Bathroom Quality</option>
                      <option value="staffKindness">Staff Kindness</option>
                      <option value="cleanliness">Cleanliness</option>
                      <option value="driveThruQuality">Drive Thru Quality</option>
                      <option value="deliverySpeed">Delivery Speed</option>
                      <option value="foodQuality">Food Quality</option>

                    </select>
                  </div>
                )}
              <div className="content">
                <h6>Reviews:{" "}</h6>
                {this.props.reviewTimeSort == "oldest" ? (
                  <div>
                    {this.props.restaurant.reviews
                      .filter(
                        filterByTopicRating(
                          this.props.topicFilter,
                          this.props.starFilter
                        )
                      )
                      .sort(sortByTopicRating(this.props.topicFilter))
                      .map((review, index) => (
                        <div>
                          <br />
                          <ReviewView
                            key={index}
                            review={review}
                            reviewId={review._id}
                            loggedInUserId={this.props.loggedInUserId}
                          />
                        </div>
                      ))}
                  </div>
                ) : (
                    <div>
                      {this.props.restaurant.reviews
                        .reverse()
                        .filter(
                          filterByTopicRating(
                            this.props.topicFilter,
                            this.props.starFilter
                          )
                        )
                        .sort(sortByTopicRating(this.props.topicFilter))
                        .map((review, index) => (
                          <div>
                            <br />
                            <ReviewView
                              key={index}
                              review={review}
                              reviewId={review._id}
                              loggedInUserId={this.props.loggedInUserId}
                              restaurantName={this.props.restaurant.name}
                            />
                          </div>
                        ))}
                    </div>
                  )}
              </div>
              {this.props.loggedIn ? (
                <div>
                  {this.props.writeReview ? (
                    <button
                      className="ui negative button"
                      onClick={this.props.WriteReviewHide}
                    >
                      Stop writing review
                  </button>
                  ) : (
                      <button
                        className="ui positive button"
                        onClick={this.props.WriteReviewShow}
                      >
                        Write Review
                  </button>
                    )}
                </div>
              ) : (
                  []
                )}
              <br />
              <button className="ui button" onClick={this.props.Minify}>
                Less details
            </button>
            </div>
          )}

        {this.props.writeReview ? (
          <RestaurantReview
            currentUser={this.props.currentUser}
            restaurant={this.props.restaurant.name}
            loggedInUserId={this.props.loggedInUserId}
          />
        ) : (
            []
          )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    restaurant: props.restaurant,
    currentUser: props.currentUser,
    sortBy: state["restaurantView"].get("sortBy"),
    loggedIn: state["app"].get("loggedIn"),
    userId: state["app"].get("userId"),
    loggedInUserId: props.loggedInUserId,
    minify: state["restaurantView"].get("minify"),
    writeReview: state["restaurantView"].get("writeReview"),
    reviewTimeSort: state["restaurantView"].get("reviewTimeSort"),
    starFilter: state["restaurantView"].get("starFilter"),
    daysFilter: state["restaurantView"].get("daysFilter"),
    topicFilter: state["restaurantView"].get("topicFilter")

  };
};

const mapDispatchToProps = dispatch => {
  return {


    Minify: () => { dispatch(RestaurantViewActions.Minify()); },

    WriteReviewShow: () => { dispatch(RestaurantViewActions.WriteReviewShow()); },

    WriteReviewHide: () => { dispatch(RestaurantViewActions.WriteReviewHide()); },

    ReviewsSortByTimeChange: selection => { dispatch(RestaurantViewActions.ReviewsSortByTimeChange(selection.target.value)); },

    ReviewsSortByChange: selection => { dispatch(RestaurantViewActions.ReviewsSortByChange(selection.target.value)); },

    ReviewsStarChange: star => { dispatch(RestaurantViewActions.ReviewsStarChange(star.target.value)); },

    ReviewsTopicChange: topic => { dispatch(RestaurantViewActions.ReviewsTopicChange(topic.target.value)); },

    Unminify: restaurantName => { dispatch(RestaurantViewActions.Unminify(restaurantName)); },

    RestaurantDaysFilterChange: filter => { dispatch(RestaurantViewActions.RestaurantDaysFilterChange(filter.target.value)); }
  };
};

RestaurantView.propTypes = {
  currentUser: PropTypes.string,
  minify: PropTypes.bool,loggedIn: PropTypes.bool,
  writeReview: PropTypes.bool,
  topicFilter: PropTypes.string,
  userId: PropTypes.object,sortBy: PropTypes.string,
  loggedInUserId: PropTypes.string,
  reviewTimeSort: PropTypes.string,
  restaurant: PropTypes.object,
  daysFilter: PropTypes.string
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantView);
