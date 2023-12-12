const { Router } = require("express");
const customerController = require("../controllers/customer");
const {
  customerValidationSchema,
  customerUpdateValidationSchema,
} = require("../models/customer");

const validateParamId = require("../utils/validateParamId");

const validate = require("../middlewares/validate");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

const router = Router();

router.get("/", /* auth, */ customerController.getAll);
router.get(
  "/:customerId",
  // auth,
  validateParamId("customerId"),
  validate,
  customerController.getOne
);

router.post(
  "/",

  [auth, admin],
  customerValidationSchema,
  validate,
  customerController.create
);

router.put(
  "/:customerId",
  validateParamId("customerId"),
  customerUpdateValidationSchema,
  validate,
  customerController.update
);

router.delete(
  "/:customerId",
  validateParamId("customerId"),
  validate,
  customerController.deleteOne
);

module.exports = router;
