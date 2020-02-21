
# Assignment 3 - MERN

### Written by
Gad Elbaz

Ron Barsimantov


## General:
We developed web-application for fast-food restaurants search.
running instruction:
  1. run mongod.exe at the background
  2. run 'npm install'
  3. run 'npm start' (it will run both the client & the server concurrently)

* The service will be available through http://localhost:8080/
* The database listens to port 8000


## Design:
Our project's development inspired by the example given in the class. (primereact-react-redux-saga-express-mongoose)
Server side:
  * api - full description bellow (Appendix B)
  * model - mongoose scheme, full description bellow (Appendix A)
Client side:
  * Components structure description can be found in "React Component Structure.pdf" file attached
  * The UI framework we chose to work with was Semantic UI
  * 3rd party components we used: 		
    - StarRatings - Stars rating (for review edit/creation)
    - Geosuggest - Google Maps API for location search


## Flow example: User registration
  user tries to register ->
  while typing, validation request is sent ->
  saga catch that request and send validation request from the server ->
    * if the typed username already exists (validation succeeded), an error message will pop: "This name is already taken!" 
    * until the typed username won't be unused, the user won't be able to register.
  user will submit the request ->
  registration request will be sent ->
  saga catches that request and add the user to the system
		  
-------------------------

## Appendix A - mongoose scheme

1. UsersModel:
  {
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    location: {
      type: { description: String, lat: Number, lng: Number },
      default: null
    },
    picture: {
      type: { name: String, data: String, contentType: String },
      default: null
    },
    reviews: [{ type: Schema.Types.ObjectId, ref: "ReviewModel" }]
  }

2. RestaurantModel:
  {
    _id: Schema.Types.ObjectId,
    name: String,
    location: {
      type: { description: String, lat: Number, lng: Number },
      default: null
    },
    reviews: [{ type: Schema.Types.ObjectId, ref: "ReviewModel" }]
  }

3. ReviewModel:
  {
    _id: Schema.Types.ObjectId,
    reviewer: { type: Schema.Types.ObjectId, ref: "UsersModel" },
    restaurant: { type: Schema.Types.ObjectId, ref: "RestaurantModel" },
    pictures: {
      type: [{ name: String, data: String, contentType: String }],
      default: []
    },
    rating: {
      type: {
        bathroomQuality: Number,
        staffKindness: Number,
        cleanliness: Number,
        driveThruQuality: Number,
        deliverySpeed: Number,
        foodQuality: Number
      },
      default: null,
      creationDate: Date
    }
  }


-------------------------

## Appendix B - API

### Users handeler endpoints:


#### Get user

**Definition**
`GET /api/dev/users/get/<username>`

**Description**
`Get user's details`


#### List all users

**Definition**
`GET /api/dev/users/getall`

**Description**
`Retrieve list containing all the users in the system`


#### Register

**Definition**
`POST /api/dev/users/register`

**Description**
`Add new user to the system`

**body**
{ username, picture, location }


#### Validate user

**Definition**
`GET /api/dev/users/validate/<username>`

**Description**
`Validate <username> exists in the system`


#### Login

**Definition**
`GET /api/dev/users/login/<username>`

**Description**
`Log <username> into the system`


#### Logout

**Definition**
`GET /api/dev/users/logout`

**Description**
`Log the current logged-in user out of the system`


#### Edit user

**Definition**
`POST /api/dev/users/edit/<username>`

**Description**
`Edit <username>s details`

**body**
{ username, location }



### Restaurants handeler endpoints:


### Add Restaurant

**Definition**
`POST /api/dev/rests/add`

**Description**
`Add new restaurant to the system`

**body**
{ name, location }


#### List all restaurants

**Definition**
`GET /api/dev/rests/getall`

**Description**
`Retrieve list containing all the restaurants in the system`



### Reviews handeler endpoints:


#### Add review

**Definition**
`POST /api/dev/reviews/add`

**Description**
`Add new review to the system`

**body**
{ reviewer, restaurant, pictures, rating }


#### Get review

**Definition**
`GET /api/dev/reviews/get/<reviewId>`

**Description**
`Get reviews's details`


#### Edit review

**Definition**
`POST /api/dev/reviews/edit/<reviewId>`

**Description**
`Edit review with id <reviewId>`

**body**
{ reviewer, restaurant, pictures, rating }


#### Delete review

**Definition**
`DELETE /api/dev/reviews/delete/<reviewId>`

**Description**
`delete reviews with id <reviewId>`
