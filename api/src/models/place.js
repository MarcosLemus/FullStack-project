const mongoose = require("mongoose");
const { body } = require("express-validator");

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Place = mongoose.model("Place", placeSchema);

const commonValidationSchema = [
  body("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .custom(async (name, { req }) => {
      const filter = { name };

      if (req.params.placeId) {
        filter["_id"] = { $ne: req.params.placeId };
      }

      const place = await Place.findOne(filter);
      if (place) throw new Error("Ya hay un cliente con ese nombre");
    }),
  body("latitude").isNumeric(),
  body("longitude").isNumeric(),
  body("description").isString(),
  body("likes.*").isMongoId().withMessage("ID no válido"),
];

const placeUpdateValidationSchema = [...commonValidationSchema];

const placeValidationSchema = [
  ...commonValidationSchema,
  // Descomentar validador de "logo" cuando se esté recibiendo la imagen.
  //   body("logo")
  //     .custom((_, { req }) => req.file)
  //     .withMessage("El logo es obligatorio")
  //     .custom((_, { req }) => validateLogo(req.file.mimetype))
  //     .withMessage(
  //       "El logo debe estar en uno de los formatos permitidos " +
  //         Object.values(LOGO_TYPES).join("/")
  //     ),
];

exports.Place = Place;
exports.placeValidationSchema = placeValidationSchema;
exports.placeUpdateValidationSchema = placeUpdateValidationSchema;
