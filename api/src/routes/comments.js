const { Router } = require("express");
const commentController = require("../controllers/comments");
const { commentValidationSchema } = require("../models/comment");
const validateParamId = require("../utils/validateParamId");
const validate = require("../middlewares/validate");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

const router = Router();

router.get("/", auth, commentController.getAll);

router.get(
  "/:commentId",
  validateParamId("commentId"),
  validate,
  commentController.getOne
);

router.post(
  "/:placeId",
  auth,
  commentValidationSchema,
  validate,
  commentController.create
);

router.put(
  "/:commentId",
  validateParamId("commentId"),
  commentValidationSchema,
  validate,
  commentController.update
);

router.delete(
  "/:placeId/:commentId",
  validateParamId("commentId"),
  validate,
  commentValidationSchema,
  commentController.deleteOne
);

module.exports = router;
