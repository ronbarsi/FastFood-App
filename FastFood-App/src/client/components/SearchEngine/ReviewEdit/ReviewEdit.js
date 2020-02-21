import { connect } from "react-redux";
import PropTypes from "prop-types";
import ReviewEditActions from "./actions";
import StarRatings from "react-star-ratings";
import "./style.css";
import React from "react";


class ReviewEdit extends React.Component {
  componentWillMount() { this.props.ReviewEditLoadReview(this.props.reviewId); }

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
    fr.onloadend = () => { this.props.ReviewEditPictureSet(fr.result, image.name); };
    fr.readAsDataURL(image);
  };

  render() {
    const starsGenerator = starsAmount =>
      starsAmount ? [
          <li key={starsAmount - 1}>
            <StarRatings
              rating={this.props.stars[starsAmount - 1]}
              starRatedColor="green" 
              changeRating={newRating =>
                this.props.ReviewEditStarSet(
                  starsAmount - 1,
                  newRating,
                  this.props.stars
                )
              }
              numberOfStars={5}
              name="rating"
              starDimension="20px"
              starSpacing="5px"
            />
            <div>{this.topics[starsAmount - 1]}</div>
          </li>
        ].concat(starsGenerator(starsAmount - 1))
        : "";

    return (
      <div>
        {this.props.review &&
          !this.props.minimize &&
          this.props.maximReviewId == this.props.reviewId ? (
            <div className="ui centered card">
              <h4 className="ui header">Edit review :</h4>
              <br/>

              <ul>{starsGenerator(6)}</ul>

              <div className="ui content">
              <h4 className="ui header">Add Picture:</h4><div>
                <input
                  className="field "
                  type="file"
                  accept="image/"
                  onChange={this.imageHandler}
                  placeholder="Picture"
                /></div>
                <br/>
                <div
                  className="ui bottom attached button"
                  onClick={() =>
                    this.props.currentPicture
                      ? this.props.ReviewEditPictureAdd(
                        this.props.currentPicture,
                        this.props.pictures
                      )
                      : {}
                  }
                >
                  <i className="add icon" />
                  Add
              </div>
                <ul className="content">
                  {this.props.pictures.map((picture, index) => (
                    <li key={index}> {picture.name}</li>
                  ))}
                </ul>
                <div className="ui divider"></div>

                {this.props.loggedIn ? (
                  <div><div>
                    <button
                      className="ui negative button"
                      onClick={() => this.props.ReviewEditDelete(this.props.reviewId)}
                    >
                      Delete Review
                </button></div>
                    <br /><div>
                    <button
                      className="ui secondary button"
                      onClick={this.props.ReviewEditMinimize}
                    >
                      Close editor
                </button></div><br/>
                    <div
                      className="ui primary button"
                      onClick={() => {
                        this.props.ReviewEditRequest(this.props);
                        this.props.ReviewEditMinimize();
                      }}
                    >
                      {" "}
                      Send Review
                </div>
                  </div>
                ) : (
                    <div className="ui bottom disabled attached button">
                      Send Review
                </div>
                  )}
              </div>
            </div>
          ) : this.props.review && this.props.minimize && this.props.isEditor ? (
            <button
              className="ui small button"
              onClick={() => {
                this.props.ReviewEditMaximize(this.props.reviewId);
              }}
            >
              Edit Review
          </button>
          ) : (
              []
            )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    reviewId: props.reviewId,    
    loggedInUserId: props.loggedInUserId,
    maximReviewId: state["reviewEdit"].get("reviewId"),
    review: props.review,   
    currentPicture: state["reviewEdit"].get("currentPicture"),
    pictures: state["reviewEdit"].get("pictures"),
    loggedIn: state["app"].get("loggedIn"),
    minimize: state["reviewEdit"].get("minimize"),
    stars: state["reviewEdit"].get("stars"),
    userId: state["app"].get("userId"),
    isEditor: props.review && props.review.reviewer._id === props.loggedInUserId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ReviewEditRequest: ReviewEditDetails => { dispatch(ReviewEditActions.ReviewEditRequest(ReviewEditDetails)); },

    ReviewEditStarSet: (i, newRating, stars) => { dispatch(ReviewEditActions.ReviewEditStarSet(i, newRating, stars)); },

    ReviewEditPictureSet: (currentPicture, pictureName) => { dispatch( ReviewEditActions.ReviewEditPictureSet(currentPicture, pictureName) ); },

    ReviewEditPictureAdd: (picture, pictures) => { dispatch(ReviewEditActions.ReviewEditPictureAdd(picture, pictures)); },

    ReviewEditLoadReview: reviewId => { dispatch(ReviewEditActions.ReviewEditLoadReview(reviewId)); },

    ReviewEditMaximize: reviewId => { dispatch(ReviewEditActions.ReviewEditMaximize(reviewId)); },

    ReviewEditMinimize: () => { dispatch(ReviewEditActions.ReviewEditMinimize()); },

    ReviewEditDelete: reviewId => { dispatch(ReviewEditActions.ReviewEditDelete(reviewId)); }
  };
};

ReviewEdit.propTypes = {
  maximReviewId: PropTypes.string,
  review: PropTypes.object,  
  currentPicture: PropTypes.object,
  pictures: PropTypes.array,
  loggedIn: PropTypes.bool,
  minimize: PropTypes.bool,
  stars: PropTypes.array,
  isEditor: PropTypes.bool,
  userId: PropTypes.string,  
  reviewId: PropTypes.string,
  loggedInUserId: PropTypes.string
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewEdit);
