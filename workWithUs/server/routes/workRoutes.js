const express = require("express");
const router = express.Router();
const workController = require("../controllers/workController");

/**
 *App routes
 */
router.get("/", workController.homepage);
router.get("/job/:id", workController.exploreJob);
router.get("/categories", workController.exploreCategories);
router.get("/categories/:id", workController.exploreCategoriesById);
router.post("/search", workController.searchWork);
router.get("/explore-latest", workController.exploreLatest);
router.get("/explore-random", workController.exploreRandom);
router.get("/submit-job", workController.submitJob);
router.post("/submit-job", workController.submitJobOnPost);

module.exports = router;
