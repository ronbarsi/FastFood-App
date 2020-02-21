const { Map } = require("immutable");

export default {
  app: Map({}),

  LoginPage: Map({
    username: "",
    picture: null,
    location: null,
    loggedIn: false,
    user: null
  }),

  register: Map({
    username: "",
    picture: null,
    location: null,
    currentlySending: false,
    error: null,
    registerComplete: false,
    userValid: true
  }),

  Restaurant: Map({
    name: "",
    location: null,
    reviews: []
  }),

  UserView: Map({
    minify: true,
    username: ""
  }),

  UserEdit: Map({
    username: "",
    picture: null,
    location: null,
    currentlySending: false,
    error: null,
    registerComplete: false,
    userValid: true,
    user: null
  }),

  RestaurantReview: Map({
    stars: [0, 0, 0, 0, 0, 0],
    pictures: [],
    currentPicture: null
  }),

  ReviewEdit: Map({
    stars: [0, 0, 0, 0, 0, 0],
    pictures: [],
    currentPicture: null,
    review: null,
    minimize: true,
    reviewId: ""
  }),

  ReviewView: Map({
    review: null,
    minify: true,
    reviewId: ""
  }),

  Search: Map({
    restaurants: [],
    users: [],
    searchKey: "",
    searchKeyLocation: "",
    selection: "restaurants",
    starFilter: 0,
    scaleValue: 100
  }),
  
  SearchRestaurant: Map({
    restaurants: [],
    searchKey: ""
  }),

  SearchUser: Map({}),

  restaurantView: Map({
    minify: true,
    writeReview: false,
    restaurantName: null,
    reviewTimeSort: "oldest",
    sortBy: "topic",
    topicFilter: "any",
    starFilter: 0,
    daysFilter: "allTime"
  })
};
