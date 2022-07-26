// include product model
const Championnat = require("../models/Championnat");

// create a new Product.
exports.championnat_create = function (req, res) {
  // validate request

  if (
    !req.body.nom ||
    !req.body.typeChampionnat ||
    !req.body.equipe ||
    !req.body.terrain ||
    !req.body.arbitre ||
    !req.body.score
  ) {
    return res.status(400).send({
      success: false,
      message: "Please enter nom/type/equipe/terrain/arbitre/score",
    });
  }

  // create a product
  let championnat = new Championnat({
    nom: req.body.nom,
    typeChampionnat: req.body.typeChampionnat,
    equipe: req.body.equipe,
    terrain: req.body.terrain,
    arbitre: req.body.arbitre,
    score: req.body.score,
  });

  // save product in the database.
  championnat
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
exports.all_championnats = (req, res) => {
  Championnat.find()
    .then((data) => {
      var message = "";
      if (data === undefined || data.length == 0)
        message = "No championnat found!";
      else message = "Championnat successfully retrieved";

      res.send({
        success: true,
        message: message,
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message:
          err.message || "Some error occurred while retrieving championnat.",
      });
    });
};
// retrieve and get statistique
exports.all_championnats_statistique = (req, res) => {
  Championnat.find()
    .then((data) => {
      var message = "";
      if (data === undefined || data.length == 0)
        message = "No championnat found!";
      else message = "Championnat successfully retrieved";

      res.send({
        success: true,
        message: message,
        data: data.length,
      });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message:
          err.message || "Some error occurred while retrieving championnat.",
      });
    });
};

// find a single product with a id.
exports.championnat_details = (req, res) => {
  Championnat.findById(req.params.id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          success: false,
          message: "Championnat not found with id " + req.params.id,
        });
      }
      res.send({
        success: true,
        message: "Championnat successfully retrieved",
        data: data,
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          success: false,
          message: "Championnat not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        success: false,
        message: "Error retrieving product with id " + req.params.id,
      });
    });
};

// update a product  by the id.
exports.championnat_update = (req, res) => {
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
  Championnat.findByIdAndUpdate(
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
          message: "Championnat not found with id " + req.params.id,
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
          message: "Championnat not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        success: false,
        message: "Error updating Championnat with id " + req.params.id,
      });
    });
};

/////////// search

exports.search_nom_championnats = (req, res) => {
  Championnat.find({ nom: req.params.nom })
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
        message:
          err.message || "Some error occurred while retrieving championnat.",
      });
    });
};

exports.search_score_championnats = (req, res) => {
  Championnat.find({ score: req.params.score })
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
        message:
          err.message || "Some error occurred while retrieving championnat.",
      });
    });
};

exports.search_type_championnats = (req, res) => {
  Championnat.find({ typeChampionnat: req.params.typeChampionnat })
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
        message:
          err.message || "Some error occurred while retrieving championnat.",
      });
    });
};

exports.search_equipe_championnats = (req, res) => {
  Championnat.find({ equipe: req.params.equipe })
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
        message:
          err.message || "Some error occurred while retrieving championnat.",
      });
    });
};

exports.search_terrain_championnats = (req, res) => {
  Championnat.find({ terrain: req.params.terrain })
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
        message:
          err.message || "Some error occurred while retrieving championnat.",
      });
    });
};

exports.search_arbitre_championnats = (req, res) => {
  Championnat.find({ arbitre: req.params.arbitre })
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
        message:
          err.message || "Some error occurred while retrieving championnat.",
      });
    });
};

// delete a Championnat with the specified id.
exports.championnat_delete = (req, res) => {
  Championnat.findByIdAndRemove(req.params.id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          success: false,
          message: "Championnat not found with id " + req.params.id,
        });
      }
      res.send({
        success: true,
        message: "Championnat successfully deleted!",
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          success: false,
          message: "Championnat not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        success: false,
        message: "Could not delete championnat with id " + req.params.id,
      });
    });
};
