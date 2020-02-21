const mongoose = require("mongoose");
const UserModel = require("../model/user");


module.exports = app => {

  app.get("/api/dev/users/get/:username", function(req, res, next) {
    /**
     * Get a specific user
     */
    UserModel.findOne({ username: req.params.username })
      .populate("reviews")
      .populate({
        path: "reviews",
        populate: {
          path: "restaurant",
          model: "RestaurantModel"
        }
      })
      .populate({
        path: "reviews",
        populate: {
          path: "reviewer",
          model: "UsersModel"
        }
      })
      .exec((err, data) => {
        if (err) {
          res.status(500).send({
            error: err
          });
        } 
        else {
          res.send(data).end();
        }
      });
  });

  app.get("/api/dev/users/getall/", function(req, res) {
    /**
     * Get all users
     */
    UserModel.find()
      .populate("reviews")
      .populate({
        path: "reviews",
        populate: {
          path: "restaurant",
          model: "RestaurantModel"
        }
      })
      .populate({
        path: "reviews",
        populate: {
          path: "reviewer",
          model: "UsersModel"
        }
      })
      .exec((err, data) => {
        if (err) {
          res.status(500).send({
            error: err
          });
        } 
        else {
          res.send(data).end();
        }
      });
  });

  app.post("/api/dev/users/register", function(req, res, next) {
    /**
     * Register user
     */
    const { username, location, picture } = req.body;
    const newUserModel = new UserModel(
      {
        _id: new mongoose.Types.ObjectId(),
        username: username,
        location: location,
        picture: picture
      }
    );
    newUserModel
      .save()
      .then(result => {
        res.send(result).end();
      })
      .catch(err => {
        res.status(500).send({
          error: err
        });
      });
  });

  app.get("/api/dev/users/validate/:username", function(req, res) {
    /**
     * Validate user exists in DB
     */
    UserModel.find({ username: req.params.username }, (err, data) => {
      if (err) {
        res.status(500).send({
          error: err
        });
      } else {
        res.send(data).end();
      }
    });
  });

  app.get("/api/dev/users/login/:username", function(req, res, next) {
    /**
     * Login user
     */
    UserModel.findOne({ username: req.params.username })
      .populate("reviews")
      .populate({
        path: "reviews",
        populate: {
          path: "restaurant",
          model: "RestaurantModel"
        }
      })
      .populate({
        path: "reviews",
        populate: {
          path: "reviewer",
          model: "UsersModel"
        }
      })
      .exec((err, data) => {
        if (err) {
          res.status(500).send({
            error: err
          });
        } else if (data) {
          res
            .cookie("name", data.username, { overwrite: true })
            .cookie("id", JSON.stringify(data._id), { overwrite: true })
            .cookie("location", JSON.stringify(data.location), {
              overwrite: true
            })
            .send(data)
            .end();
        } else {
          res.status(500).send({
            error: "Internal server error"
          });
        }
      });
  });

  app.get("/api/dev/users/logout", function(req, res) {
    /**
     * Logout user - clears coockie
     */
    res
      .cookie("name", "", { overwrite: true })
      .cookie("id", "", { overwrite: true })
      .cookie("location", undefined, {
        overwrite: true
      })
      .send({ msg: "User logged out successfully" })
      .end();
  });

  app.post("/api/dev/users/edit/:username", function(req, res, next) {
    /**
     * Edit user
     */
    const clientName = req.cookies["name"];
    UserModel.findOne({ username: req.params.username })
      .populate("reviews")
      .populate({
        path: "reviews",
        populate: {
          path: "restaurant",
          model: "RestaurantModel"
        }
      })
      .populate({
        path: "reviews",
        populate: {
          path: "reviewer",
          model: "UsersModel"
        }
      })
      .exec((err, data) => {
        if (err) {
          res.status(500).send({
            error: err
          });
        } 
        else if (!data || err || clientName === "") {
          res.status(500).send({
            error: err
          });
        } 
        else {
          /* change username and location */
          if (req.body.username) {
            data.username = req.body.username;
          }
          if (req.body.location) {
            data.location = req.body.location;
          }
          data.save();

          /* update coockie if needed */
          res
            .cookie("name", req.body.username, { overwrite: true })
            .cookie("id", JSON.stringify(data._id), { overwrite: true })
            .cookie("location", JSON.stringify(req.body.location), {
              overwrite: true
            })
            .send(data)
            .end();
        }
      });
  });

};
