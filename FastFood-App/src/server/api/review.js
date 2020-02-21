const ReviewModel = require("../model/review");
const UserModel = require("../model/user");
const RestaurantModel = require("../model/restaurant");
const mongoose = require("mongoose");

module.exports = app => {

  app.post("/api/dev/reviews/add", function (req, res, next) {
    /**
     * Add review
     */
    const { reviewer, restaurant, pictures, rating } = req.body;
    UserModel.findOne({ username: reviewer }, (err, userData) => {
      if (err) {
        res.status(500).json(
          {
            error: err
          }
        );
      } 
      else {
        RestaurantModel.findOne({ name: restaurant }, (err, restData) => {
          if (err) {
            res.status(500).json(
              {
                error: err
              }
            );
          } 
          else {
            const currTime = new Date();
            const newReviewModel = new ReviewModel(
              {
                _id: new mongoose.Types.ObjectId(),
                reviewer: userData._id,
                creationDate: currTime,
                restaurant: restData._id,
                pictures: pictures,
                rating: rating
              }
            );

            newReviewModel
              .save()
              .then(result => 
                {
                  res.send(result);

                  restData.reviews.push(newReviewModel._id);
                  restData.save();

                  userData.reviews.push(newReviewModel._id);
                  userData.save();
                }
              )
              .catch(err => {
                res.status(500).json(
                  {
                    error: err
                  }
                );
              });
          }
        });
      }
    });
  });

  app.get("/api/dev/reviews/get/:id", function (req, res) {
    /**
     * Get review
     */
    ReviewModel.findOne({ _id: req.params.id })
      .populate("reviewer")
      .populate(
        {
          path: "reviewer",
          populate: {
            path: "reviewer",
            model: "UsersModel"
          }
        }
      )
      .populate("restaurant")
      .exec((err, data) => {
        if (err) {
          res.status(500).json(
            {
              error: err
            }
          );
        } 
        else {
          res.send(data).end();
        }
      });
  });

  app.post("/api/dev/reviews/edit/:id", function (req, res, next) {
    /**
     * Edit review
     */
    const { pictures, rating } = req.body;
    ReviewModel.findOne({ _id: req.params.id }, (err, data) => {
      if (err) {
        res.status(500).json({
          error: err
        });
      } 
      else {
        data.pictures = pictures;
        data.rating = rating;
        data.save();
        res.json(data).end();
      }
    });
  });

  app.delete("/api/dev/reviews/delete/:id", function (req, res) {
    /**
     * Delete review
     */
    ReviewModel.findOneAndDelete({ _id: req.params.id }).exec((err, data) => {
      if (err) {
        res.status(500).json({
          error: err
        });
      } else {
        res.send(data);
      }
    });
  });

};
