// include product model
const Arbitre = require("../models/Arbitre");

// create a new Product.
exports.arbitre_create = function (req, res) {
  // validate request
  /*
  if (!req.body.name || !req.body.price) {
    return res.status(400).send({
      success: false,
      message: "Please enter product name and price",
    });
  }
*/
  // create a product
  let arbitre = new Arbitre({
    nom: req.body.nom,
  });

  // save product in the database.
  arbitre
    .save()
    .then((data) => {
      res.send({
        success: true,
        message: "Product successfully created",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message:
          err.message || "Some error occurred while creating the product.",
      });
    });
};

// retrieve and return all products.
exports.all_arbitres = (req, res) => {
  Arbitre.find()
    .then((data) => {
      var message = "";
      if (data === undefined || data.length == 0) message = "No Arbitre found!";
      else message = "Arbitre successfully retrieved";

      res.send({
        success: true,
        message: message,
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: err.message || "Some error occurred while retrieving Arbitre.",
      });
    });
};

// find a single product with a id.
exports.arbitre_details = (req, res) => {
  Arbitre.findById(req.params.id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          success: false,
          message: "Arbitre not found with id " + req.params.id,
        });
      }
      res.send({
        success: true,
        message: "Arbitre successfully retrieved",
        data: data,
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          success: false,
          message: "Arbitre not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        success: false,
        message: "Error retrieving product with id " + req.params.id,
      });
    });
};

// update a product  by the id.
exports.arbitre_update = (req, res) => {
  /*
    // validate request
  if (!req.body.name || !req.body.price) {
    return res.status(400).send({
      success: false,
      message: "Please enter product name and price",
    });
  }
  */

  // find product and update
  Arbitre.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  )
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          success: false,
          message: "Arbitre not found with id " + req.params.id,
        });
      }
      res.send({
        success: true,
        data: data,
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          success: false,
          message: "Arbitre not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        success: false,
        message: "Error updating Arbitre with id " + req.params.id,
      });
    });
};

/////////// search

exports.search_nom_arbitre = (req, res) => {
  Arbitre.find({ nom: req.params.nom })
    .then((data) => {
      var message = "";
      if (data === undefined || data.length == 0) message = "No !";
      else message = "successfully ";

      res.send({
        success: true,
        message: message,
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: err.message || "Some error occurred while retrieving Arbitre.",
      });
    });
};

// delete a Arbitre with the specified id.
exports.arbitre_delete = (req, res) => {
  Arbitre.findByIdAndRemove(req.params.id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          success: false,
          message: "Arbitre not found with id " + req.params.id,
        });
      }
      res.send({
        success: true,
        message: "Arbitre successfully deleted!",
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          success: false,
          message: "Arbitre not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        success: false,
        message: "Could not delete Arbitre with id " + req.params.id,
      });
    });
};
