const express = require("express");
const router = express.Router();

// include product controller
const arbitre_controller = require("../controller/arbitre.controller");

// routes
router.get("/", arbitre_controller.all_arbitres);
router.post("/create", arbitre_controller.arbitre_create);
router.post(
  "/rechercher/nom/:nom",
  arbitre_controller.search_nom_arbitre
);
router.get("/:id", arbitre_controller.arbitre_details);
router.put("/update/:id", arbitre_controller.arbitre_update);
router.delete("/delete/:id", arbitre_controller.arbitre_delete);
module.exports = router;
