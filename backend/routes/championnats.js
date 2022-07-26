const express = require("express");
const router = express.Router();

// include product controller
const championnat_controller = require("../controller/championnat.controller");

// routes
router.get("/", championnat_controller.all_championnats);
router.get(
  "/stat/number_championnat",
  championnat_controller.all_championnats_statistique
);

router.post("/create", championnat_controller.championnat_create);

router.post(
  "/rechercher/nom/:nom",
  championnat_controller.search_nom_championnats
);
router.post(
  "/rechercher/type/:typeChampionnat",
  championnat_controller.search_type_championnats
);
router.post(
  "/rechercher/equipe/:equipe",
  championnat_controller.search_equipe_championnats
);
router.post(
  "/rechercher/terrain/:terrain",
  championnat_controller.search_terrain_championnats
);
router.post(
  "/rechercher/score/:score",
  championnat_controller.search_score_championnats
);
router.post(
  "/rechercher/arbitre/:arbitre",
  championnat_controller.search_arbitre_championnats
);

router.get("/:id", championnat_controller.championnat_details);
router.put("/update/:id", championnat_controller.championnat_update);
router.delete("/delete/:id", championnat_controller.championnat_delete);

module.exports = router;
