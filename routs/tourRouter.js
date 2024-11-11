const express = require("express");
const tourController = require("../controller/tourController");

const router = express.Router();

router.param('id', tourController.checkId)


router
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.createTours);
router
  .route("/:id")
  .get(tourController.getTours)
  .patch(tourController.updateTours)
  .delete(tourController.deleteTours);

module.exports = router;
