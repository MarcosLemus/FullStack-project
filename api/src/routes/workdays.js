const { Router } = require("express");
const workdayController = require("../controllers/workdays");
const { workdayValidationSchema } = require("../models/workday");
const validateParamId = require("../utils/validateParamId");
const validate = require("../middlewares/validate");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

const router = Router();

router.get("/", auth, workdayController.getAll);

router.get(
  "/:workdayId",
  validateParamId("workdayId"),
  validate,
  workdayController.getOne
);

router.post(
  "/",
  auth,
  workdayValidationSchema,
  validate,
  workdayController.create
);

router.put(
  "/:workdayId",
  validateParamId("workdayId"),
  workdayValidationSchema,
  validate,
  workdayController.update
);

router.delete(
  "/:workdayId",
  validateParamId("workdayId"),
  validate,
  workdayValidationSchema,
  workdayController.deleteOne
);

module.exports = router;
