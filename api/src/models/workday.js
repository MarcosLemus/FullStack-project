const mongoose = require("mongoose");
const { body } = require("express-validator");

const workdaySchema = new mongoose.Schema({
  date: { type: Date, required: true, unique: true },
  visits: [{ type: mongoose.Schema.Types.ObjectId, ref: "Customer" }],
  rider: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Workday = mongoose.model("Workday", workdaySchema);

const workdayValidationSchema = [
  body("date")
    .isISO8601()
    .toDate()
    .withMessage("La fecha de jornada no es válida"),
  body("visits.*").isMongoId().withMessage("ID de cliente no válido"),
];

exports.Workday = Workday;

exports.workdayValidationSchema = workdayValidationSchema;
