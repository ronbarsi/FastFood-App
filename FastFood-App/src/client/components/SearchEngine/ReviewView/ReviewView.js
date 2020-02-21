import React from "react";
import { connect } from "react-redux";
import ReviewViewActions from "./actions";
import ReviewEdit from "../ReviewEdit/ReviewEdit";
import PropTypes from "prop-types";

class ReviewView extends React.Component {
  render() {
    return (
      <div className="ui centered card">
                <div className="content">
        {this.props.review ? (
          !this.props.minify ? (
            this.props.reviewId == this.props.expandReviewId ? (
              <div>
                <h6>Reviewer: {this.props.review.reviewer.username}</h6>
                <div class="ui list">
                  <div class="item">
                    <i class="female icon"></i>
                    <div class="content">
                      Bathroom Quality: {this.props.review.rating.bathroomQuality}
                    </div>
                  </div>
                  <div class="item">
                    <i class="trash alternate outline icon"></i>
                    <div class="content">
                      Cleanliness: {this.props.review.rating.cleanliness}
                    </div>
                  </div>
                  <div class="item">
                    <i class="motorcycle icon"></i>
                    <div class="content">
                      Delivery Speed: {this.props.review.rating.deliverySpeed}
                    </div>
                  </div>
                  <div class="item">
                    <i class="utensils icon"></i>
                    <div class="content">
                      Food Quality: {this.props.review.rating.foodQuality}
                    </div>
                  </div>
                  <div class="item">
                    <i class="heart icon"></i>
                    <div class="content">
                      Staff Kindness: {this.props.review.rating.staffKindness}
                    </div>
                  </div>
                  <div class="item">
                    <i class="car icon"></i>
                    <div class="content">
                      Drive Through Quality: {this.props.review.rating.driveThruQuality}
                    </div>
                  </div>
                  <div class="item">
                    <i class="images outline icon"></i>
                    <div class="content">Pictures:<br />
                    {(this.props.review.pictures && 
                      (this.props.review.pictures.length == 0 || 
                        (this.props.review.pictures.length == 1 && !this.props.review.pictures[0])))  ? ("No Pictures") :
                    (this.props.review.pictures.map((picture, index) => (
                          <div>

                          <div key={index}>
                            <img class="ui medium rounded image" src={picture? picture.data : ""}></img>
                          </div> <br/>
                          </div> 
                        )))
                    }
                    </div>
                  </div>
                </div>
                <button
                  className="ui secondary button"
                  onClick={this.props.Minify}
                >
                  Collapse
                </button>
              </div>
            ) : (
                <div>
                  <h6>Reviewer: {this.props.review.reviewer.username}</h6>
                  <button
                    className="ui primary button"
                    onClick={() => {
                      this.props.Unminify(this.props.reviewId);
                    }}
                  >
                    Review's details
              </button></div> 
              )
          ) : (
            
              <div>
                
                <h6>Reviewer: {this.props.review.reviewer.username}</h6>
                <button
                  className="ui primary button"
                  onClick={() => {
                    this.props.Unminify(this.props.reviewId);
                  }}
                >
                  Review's details
              </button>
              </div>
            )
        ) : (
            []
          )}
        {this.props.isEditor ? (
          <div>
            <br/>
          <ReviewEdit
            review={this.props.review}
            reviewId={this.props.reviewId}
            loggedInUserId={this.props.loggedInUserId}
          />
          </div>
        ) : (
            []
          )}
      </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    reviewId: props.reviewId,    
    isEditor: props.review.reviewer._id == props.loggedInUserId,
    expandReviewId: state["reviewView"].get("reviewId"),
    review: props.review,    
    userId: state["app"].get("userId"),
    minify: state["reviewView"].get("minify"),
    loggedInUserId: props.loggedInUserId,
    restaurantName: props.restaurantName
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ReviewViewLoad: id => { dispatch(ReviewViewActions.ReviewViewLoad(id)); },

    Unminify: reviewId => { dispatch(ReviewViewActions.Unminify(reviewId)); },

    Minify: () => { dispatch(ReviewViewActions.Minify()); }
  };
};

ReviewView.propTypes = {
  reviewId: PropTypes.string,
  expandReviewId: PropTypes.string,  
  isEditor: PropTypes.bool,
  review: PropTypes.object,  
  userId: PropTypes.object,
  minify: PropTypes.bool,
  loggedInUserId: PropTypes.string
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewView);
