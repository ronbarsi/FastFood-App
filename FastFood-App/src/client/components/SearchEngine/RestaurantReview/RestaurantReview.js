import React from "react";
import "./style.css";
import StarRatings from "react-star-ratings";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import RestaurantReviewActions from "./actions";



class RestaurantReview extends React.Component {
  topics = [
    "Bathroom Quality",
    "Staff Kindness",
    "Cleanliness",
    "Drive-thru quality",
    "Delivery Speed",
    "Food Quality"
  ];

  imageHandler = event => {
    const fr = new FileReader();
    const image = event.target.files[0];
    fr.onloadend = () => { this.props.RestaurantReviewPictureSet(fr.result, image.name); };
    fr.readAsDataURL(image);
  };

  render() {
    const starsGenerator = starsAmmount =>
      starsAmmount
        ? [
          <li key={starsAmmount - 1}>
            <StarRatings
              rating={this.props.stars[starsAmmount - 1]}
              starRatedColor="green"
              changeRating={newRating =>
                this.props.RestaurantReviewStarSet(
                  starsAmmount - 1,
                  newRating,
                  this.props.stars
                )
              }
              numberOfStars={5}
              name="rating"
              starDimension="20px"
              starSpacing="5px"
            />
            <div>{this.topics[starsAmmount - 1]}</div>
          </li>
        ].concat(starsGenerator(starsAmmount - 1))
        : "";

    return (
      <div className="ui centered card">
        <div><h4 className="ui header">Write Review</h4></div>
        <h6 className="ui left aligned header">
          Reviewer: {this.props.reviewer}
        </h6>

        <ul>{starsGenerator(6)}</ul>

        <div className="ui content">
          <h4 className="ui header">Add Picture:</h4><div>
            <input
              className="field "
              type="file"
              accept="image/"
              onChange={this.imageHandler}
              placeholder="Picture"
            /></div><br />
          <div
            className="ui bottom attached button"
            onClick={() =>
              this.props.RestaurantReviewPictureAdd(
                this.props.currentPicture,
                this.props.pictures
              )
            }
          >
            <i className="add icon" />
            Add image
          </div>
          <ul className="content">
            {this.props.pictures.map((picture, index) => (
              <li key={index}> {picture ? picture.name : "No pictures chosen"}</li>
            ))}
          </ul>
          <div className="ui divider"></div>

          {this.props.loggedIn ? (
            <div
              className="ui bottom attached positive button"
              onClick={() => this.props.RestaurantReviewRequest(this.props)}
            >
              {" "}
              Send.
            </div>
          ) : (
              <div
                className="ui bottom disabled attached positive button"
                onClick={() => this.props.RestaurantReviewRequest(this.props)}
              >
                Send.
            </div>
            )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    reviewer: props.currentUser,
    pictures: state["review"].get("pictures"),
    currentPicture: state["review"].get("currentPicture"),
    restaurant: props.restaurant,
    stars: state["review"].get("stars"),
    loggedIn: state["app"].get("loggedIn"),
    userId: state["app"].get("userId")
  };
};

const mapDispatchToProps = dispatch => {
  return {

    RestaurantReviewPictureSet: (currentPicture, pictureName) => { dispatch(RestaurantReviewActions.RestaurantReviewPictureSet(currentPicture, pictureName)); },

    RestaurantReviewStarSet: (i, newRating, stars) => { dispatch(RestaurantReviewActions.RestaurantReviewStarSet(i, newRating, stars)); },

    RestaurantReviewRequest: RestaurantReviewDetails => { dispatch(RestaurantReviewActions.RestaurantReviewRequest(RestaurantReviewDetails)); },

    RestaurantReviewPictureAdd: (picture, pictures) => { dispatch(RestaurantReviewActions.RestaurantReviewPictureAdd(picture, pictures)); }
  };
};

RestaurantReview.propTypes = {
  loggedIn: PropTypes.bool,
  reviewer: PropTypes.string,
  stars: PropTypes.array,
  restaurant: PropTypes.string,
  pictures: PropTypes.array,
  currentPicture: PropTypes.object,
  userId: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantReview);
