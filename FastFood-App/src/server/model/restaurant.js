const mongoose = require("mongoose");

const MongoSchema = mongoose.Schema;


const restaurantSchema = new MongoSchema(
  {
    _id: MongoSchema.Types.ObjectId,
    name: String,
    location: {
      type: {
        description: String,
        lat: Number,
        lng: Number
      },
      default: null
    },
    reviews: [
      {
        type: MongoSchema.Types.ObjectId,
        ref: "ReviewModel"
      }
    ]
  }
);

module.exports = mongoose.model("RestaurantModel", restaurantSchema);
