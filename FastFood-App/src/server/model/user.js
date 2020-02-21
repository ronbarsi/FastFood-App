const mongoose = require("mongoose");

const MongoSchema = mongoose.Schema;


const userSchema = new MongoSchema({
  _id: MongoSchema.Types.ObjectId,
  username: String,
  location: {
    type: { 
      description: String, 
      lat: Number, 
      lng: Number 
    },
    default: null
  },
  picture: {
    type: { 
      name: String, 
      data: String, 
      contentType: String 
    },
    default: null
  },
  reviews: [
    { 
      type: MongoSchema.Types.ObjectId, 
      ref: "ReviewModel" 
    }
  ]
});

module.exports = mongoose.model("UsersModel", userSchema);
