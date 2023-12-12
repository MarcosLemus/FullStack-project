const mongoose = require("mongoose");
const { body } = require("express-validator");

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
});

const Customer = mongoose.model("Customer", customerSchema);

const commonValidationSchema = [
  body("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .custom(async (name, { req }) => {
      const filter = { name };

      if (req.params.customerId) {
        filter["_id"] = { $ne: req.params.customerId };
      }

      const customer = await Customer.findOne(filter);
      if (customer) throw new Error("Ya hay un cliente con ese nombre");
    }),
  body("latitude").isNumeric(),
  body("longitude").isNumeric(),
];

const customerUpdateValidationSchema = [...commonValidationSchema];

const customerValidationSchema = [
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

exports.Customer = Customer;
exports.customerValidationSchema = customerValidationSchema;
exports.customerUpdateValidationSchema = customerUpdateValidationSchema;
