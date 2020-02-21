const mongoose = require("mongoose");
const RestaurantModel = require("../model/restaurant");

module.exports = app => {

  app.post("/api/dev/rests/add", function(req, res, next) {
    /**
     * Add new restaurant
     */
    const newRestaurant = new RestaurantModel({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      location: req.body.location
    });

    newRestaurant
      .save()
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });

  app.get("/api/dev/rests/getall", function(req, res) {
    /**
     * Get all restaurants
     */
    RestaurantModel.find()
      .populate("reviews")
      .populate({
        path: "reviews",
        populate: {
          path: "reviewer",
          model: "UsersModel"
        }
      })

      .exec((err, data) => {
        if (err) {
          res.status(500).json({
            error: err
          });
        } else {
          res.send(data).end();
        }
      });
  });

};
