const { Router } = require("express");
const placeController = require("../controllers/place");
const {
  placeValidationSchema,
  placeUpdateValidationSchema,
} = require("../models/place");

const validateParamId = require("../utils/validateParamId");

const validate = require("../middlewares/validate");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

const router = Router();

router.get("/", /* auth, */ placeController.getAll);
router.get(
  "/:placeId",
  // auth,
  validateParamId("placeId"),
  validate,
  placeController.getOne
);

router.post(
  "/",

  [auth, admin],
  placeValidationSchema,
  validate,
  placeController.create
);

// router.post(
//   "/:userId",
//   [auth, admin],
//   placeValidationSchema,
//   validate,
//   placeController.toggleFavorite
// );

router.put(
  "/:placeId",
  validateParamId("placeId"),
  placeUpdateValidationSchema,
  validate,
  placeController.update
);
router.put("/:placeId/favorite", auth, placeController.toggleFavorite);

router.delete(
  "/:placeId",
  validateParamId("placeId"),
  validate,
  placeController.deleteOne
);

module.exports = router;
