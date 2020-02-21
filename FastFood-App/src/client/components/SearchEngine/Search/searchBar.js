import React from "react";
import RestaurantView from "../RestaurantView/RestaurantView";
import UserView from "../../MenuBar/UserProfileView/UserProfileView";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";


import { Search } from "semantic-ui-react";
const mea = 100;

const SearchBar = props => {
  const getFilteredRes = (restMap, userMap) =>
    props.selection == "restaurants" ?
      props.RestaurantMinify ?
        props.restaurants
          .filter(
            restaurant =>
              restaurant.name
                .toLowerCase()
                .startsWith(props.searchKey.toLowerCase()) &&
              (!props.searchKeyLocation ||
                (props.searchKeyLocation &&
                  restaurant.location.description
                    .toLowerCase()
                    .startsWith(props.searchKeyLocation.toLowerCase()))) &&
              averageScoreFilter(restaurant, props.starFilter)
          )
          .sort(distanceQualitySort(props.scaleValue, props.currentLocation))
          .map(restMap)
        : props.restaurants
          .filter(restaurant => restaurant.name == props.restaurantName)
          .sort(distanceQualitySort(props.scaleValue, props.currentLocation))
          .map(restMap)
      : props.userMinify ?
        props.users
          .filter(
            user =>
              user.username &&
              user.username
                .toLowerCase()
                .startsWith(props.searchKey.toLowerCase()) &&
              user.location.description
                .toLowerCase()
                .startsWith(props.searchKeyLocation.toLowerCase())
          )
          .map(userMap)
        : props.users
          .filter(user => user.username == props.username)
          .map(userMap);
          
  const searchFor = (
    <div>
      <div className="ui divider"></div>
      <h3 className="ui header">  Search For:</h3>
      <select
        className="ui dropdown"
        value={props.selection}
        onChange={props.SearchKeyChangeSelection}
      >
        <option value="users">Users</option>
        <option value="restaurants">Restaurants</option>
      </select>
      <div className="ui divider"></div>
    </div>
  );
  const advancedRestSearch = (
    <div className="ui search">
      <h3 className="ui header">Advanced Search:</h3>
      <Search
        className="ui fluid category search"
        placeholder="Search By Name"
        onResultSelect={(e, { result }) => props.SearchSelectedTitle(result)}
        onSearchChange={props.SearchKeyChange}
        results={getFilteredRes(
          rest => ({
            title: rest.name
          }),
          user => ({
            title: user.username
          })
        )}
        value={props.searchKey}
      />
      <br />
      <div className="ui category search">
        <div className="ui icon input">
          <input
            className="prompt"
            onChange={props.SearchKeyChangeLocation}
            placeholder="Search By Location"
          />
          <i className="search icon"></i>
        </div>
        <div className="results"></div>
      </div>
      <br />
      {props.selection == "restaurants" ? (
        <div>
          <div>
            <select
              className="ui dropdown"
              value={props.starFilter}
              onChange={props.SearchChangeRating}
            >
              <option value="0">0+ Stars</option>
              <option value="1">1+ Star</option>
              <option value="2">2+ Stars</option>
              <option value="3">3+ Stars</option>
              <option value="4">4+ Stars</option>
            </select>
          </div>
          <br />
          <div className="ui three column grid">
            <div className="row">
              <div className="column" />
              <div className="column">Closer - Better
                <InputRange
                  maxValue={mea}
                  minValue={0}
                  value={props.scaleValue}
                  onChange={props.SearchChangeScale}
                />
              </div>
            </div>
          </div>
          <br /><br />
        </div>
      ) : (
          []
        )
      }
    </div >
  );

  const showResults = (
    <div>
      {getFilteredRes(
        (restaurant, index) => (
          <RestaurantView
            key={`${index}`}
            restaurant={restaurant}
            currentUser={props.currentUser}
            loggedInUserId={props.loggedInUserId}
          />
        ),
        (user, index) => (
          <UserView
            key={index}
            user={user}
            loggedInUserId={props.loggedInUserId}
          />
        )
      )}
    </div>
  );
  return {
    searchFor,
    advancedRestSearch,
    showResults
  };
};

// get avarage score - deviding by parameters count
const reviewScoreAverage = review =>
  [
    review.rating["bathroomQuality"],
    review.rating["cleanliness"],
    review.rating["deliverySpeed"],
    review.rating["driveThruQuality"],
    review.rating["foodQuality"],
    review.rating["staffKindness"]
  ].reduce((param, count) => (param += count), 0) / 6;

const restaurantAvScore = rest =>
  rest.reviews.length
    ? rest.reviews.map(reviewScoreAverage).reduce((p, c) => (p += c), 0) /
    rest.reviews.length
    : 0;

    // devide by 5 stars count
const compareByRating = (restaurantA, restaurantB) =>
  (restaurantAvScore(restaurantB) - restaurantAvScore(restaurantA)) / 5;

  // Euclidian Distance
const compareByDist = myLoc => (restaurantA, restaurantB) => {
  const restA_x = restaurantA.location.lat;
  const restA_y = restaurantA.location.lng;
  const myLoc_x = myLoc.lat;
  const myLoc_y = myLoc.lng;
  const restA_dist = Math.sqrt(Math.pow(myLoc_x - restA_x, 2) + Math.pow(myLoc_y - restA_y, 2));
  const restB_x = restaurantB.location.lat;
  const restB_y = restaurantB.location.lat;
  const restB_dist = Math.sqrt(Math.pow(myLoc_x - restB_x, 2) + Math.pow(myLoc_y - restB_y, 2));

  return (restB_dist - restA_dist) / (restA_dist + restB_dist);
};
const averageScoreFilter = (restaurant, restaurantScore) => restaurantAvScore(restaurant) >= restaurantScore;

const distanceQualitySort = (scale, myLoc) => (restaurantA, restaurantB) =>
  (mea - scale) * compareByDist(myLoc)(restaurantA, restaurantB) +
  scale * compareByRating(restaurantA, restaurantB);

export default SearchBar;
