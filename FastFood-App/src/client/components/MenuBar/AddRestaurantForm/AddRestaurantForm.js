import React from "react";
import { connect } from "react-redux";
import RestaurantActions from "./actions";
import PropTypes from "prop-types";
import Geosuggest from "react-geosuggest";
import { Button, Modal } from 'semantic-ui-react'

class Restaurant extends React.Component {
  render() {
    return (
      <div>
        <Modal trigger={<Button>Add Restaurant</Button>} size="tiny">
          <Modal.Header>Add Reataurant</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
            <h4 className="text-xs-center">Please fill in information below:</h4><br />
              <form
                className="ui form"
                onSubmit={() =>
                  this.props.restaurantRequest(
                    this.props.name,
                    this.props.location
                  )
                }
              >
                <div>
                  <input
                    className="field "
                    type="text"
                    id="restName"
                    value={this.props.name || ""}
                    placeholder="Restaurant Name"
                    onChange={this.props.restaurantNameSet}
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                  />
                </div> <br />
                <div>
                  <Geosuggest
                    placeholder="Location"
                    onSuggestSelect={this.props.restaurantLocationSet}
                  />
                </div>
                {!this.props.name || !this.props.location ? (
                  <button className="ui disabled button">Submit</button>
                ) : (
                    <button className="ui active button">Submit</button>
                  )}
              </form>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    name: state["restaurant"].get("name"),
    location: state["restaurant"].get("location"),
    reviews: state["restaurant"].get("reviews")
  };
};

const mapDispatchToProps = dispatch => {
  return {
    restaurantNameSet: name => {
      dispatch(RestaurantActions.RestaurantNameSet(name));
    },
    restaurantRequest: (name, location) => {
      dispatch(RestaurantActions.RestaurantRequest(name, location));
    },
    restaurantLocationSet: location => {
      dispatch(RestaurantActions.RestaurantLocationSet(location));
    }
  };
};

Restaurant.propTypes = {
  name: PropTypes.string,
  reviews: PropTypes.arrayOf(PropTypes.object),
  location: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Restaurant);
