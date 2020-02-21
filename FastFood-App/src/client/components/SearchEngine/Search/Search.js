import React from "react";
import { connect } from "react-redux";
import SearchActions from "./actions";
import PropTypes from "prop-types";
import { Search as UiSearch } from "semantic-ui-react";
import SearchBar from "./searchBar";

class Search extends React.Component {
  render() {
    const {
      searchFor,
      advancedRestSearch,
      showResults
    } = SearchBar(this.props);

    return (
      <div>
        {searchFor}
        {advancedRestSearch}
        {showResults}
        <br/>
        <button className="ui button" onClick={this.props.LoadSearch}>
          Show Search Results
        </button>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    restaurants: state["search"].get("restaurants"),
    users: state["search"].get("users"),
    searchKey: state["search"].get("searchKey"),
    searchKeyLocation: state["search"].get("searchKeyLocation"),
    selection: state["search"].get("selection"),
    currentUser: props.currentUser,
    RestaurantMinify: state["restaurantView"].get("minify"),
    restaurantName: state["restaurantView"].get("restaurantName"),
    username: state["userView"].get("username"),
    userMinify: state["userView"].get("minify"),
    starFilter: state["search"].get("starFilter"),
    currUserLocation: state["app"].get("location"),
    loggedInUserId: props.loggedInUserId,
    scaleValue: state["search"].get("scaleValue"),
    currentLocation: props.currentLocation
  };
};

const mapDispatchToProps = dispatch => {
  return {
    LoadSearch: () => {
      dispatch(SearchActions.LoadSearch());
    },
    SearchKeyChange: key => {
      dispatch(SearchActions.SearchKeyChange(key.target.value));
    },
    SearchSelectedTitle: result => {
      dispatch(SearchActions.SearchKeyChange(result.title));
    },
    SearchKeyChangeLocation: location => {
      dispatch(SearchActions.SearchKeyChangeLocation(location.target.value));
    },
    SearchKeyChangeSelection: selection => {
      dispatch(SearchActions.SearchKeyChangeSelection(selection.target.value));
    },
    SearchChangeRating: stars => {
      dispatch(SearchActions.SearchChangeRating(stars.target.value));
    },
    SearchChangeScale: scale => {
      dispatch(SearchActions.SearchChangeScale(scale));
    }
  };
};

Search.propTypes = {
  restaurants: PropTypes.array,
  users: PropTypes.array,
  searchKey: PropTypes.string,
  searchKeyLocation: PropTypes.string,
  selection: PropTypes.string,
  currentUser: PropTypes.string,
  RestaurantMinify: PropTypes.bool,
  restaurantName: PropTypes.string,
  username: PropTypes.string,
  userMinify: PropTypes.bool,
  currUserLocation: PropTypes.object,
  loggedInUserId: PropTypes.string,
  currentLocation: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
