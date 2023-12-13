const mongoose = require("mongoose");
const config = require("config");
const jwt = require("jsonwebtoken");
const { pick } = require("lodash");
const { body } = require("express-validator");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true },

  isAdmin: Boolean,
});

userSchema.methods.generateJWT = function () {
  return jwt.sign(
    pick(this, ["_id", "username", "isAdmin"]),
    config.get("jwtSecret")
  );
};

const User = mongoose.model("User", userSchema);

const userValidationSchema = [
  body("username")
    .notEmpty()
    .withMessage("El nombre de usuario no puede estar vacío"),
  body("password").notEmpty().withMessage("La password no puede estar vacía"),
  // body("email").notEmpty().withMessage("El email no puede estar vacío"),
];

exports.User = User;
exports.userValidationSchema = userValidationSchema;
