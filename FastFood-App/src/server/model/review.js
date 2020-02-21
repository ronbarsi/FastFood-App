const mongoose = require("mongoose");

const MongoSchema = mongoose.Schema;


const reviewSchema = new MongoSchema(
  {
    _id: MongoSchema.Types.ObjectId,
    reviewer: { 
      type: MongoSchema.Types.ObjectId, 
      ref: "UsersModel" 
    },
    restaurant: { 
      type: MongoSchema.Types.ObjectId, 
      ref: "RestaurantModel" 
    },
    pictures: {
      type: [
        { 
          name: String, 
          data: String, 
          contentType: String 
        }
      ],
      default: []
    },
    rating: {
      type: {
        bathroomQuality: Number,
        staffKindness: Number,
        driveThruQuality: Number,
        cleanliness: Number,
        foodQuality: Number,
        deliverySpeed: Number
      },

      default: null,

      creationDate: Date
    }
  },
  /* timestamp property */
  {
    timestamps: true
  }

);

module.exports = mongoose.model("ReviewModel", reviewSchema);
