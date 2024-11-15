const express = require("express");
const tourController = require("../controller/tourController");

const router = express.Router();

// router.param('id', tourController.checkId)

router.route('/top-5-cheap').get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-status').get(tourController.getTourStatus);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.createTours);
router
  .route("/:id")
  .get(tourController.getTours)
  .patch(tourController.updateTours)
  .delete(tourController.deleteTours);

module.exports = router;
