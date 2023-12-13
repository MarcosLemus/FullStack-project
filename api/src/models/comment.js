const mongoose = require("mongoose");
const { body } = require("express-validator");

const commentSchema = new mongoose.Schema({
  comment: { type: String, required: true },
  date: { type: Date, required: true },
  usercomment: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Comment = mongoose.model("Comment", commentSchema);

const commentValidationSchema = [
  body("date").isISO8601().toDate().withMessage("Date is not correct"),
  body("userId.*").isMongoId().withMessage("ID de usuario no válido"),
];

exports.Comment = Comment;

exports.commentValidationSchema = commentValidationSchema;
