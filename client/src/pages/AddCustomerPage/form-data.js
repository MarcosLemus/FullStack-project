import * as yup from "yup";

const fields = [
  {
    name: "name",
    label: "Nombre",
    placeholder: "Client's name",
  },
  {
    name: "latitude",
    label: "Latitud",
    type: "number",
  },
  {
    name: "longitude",
    label: "Longitud",
    type: "number",
  },
  {
    name: "description",
    label: "Description",
    placeholder: "añadir una decripción",
  },
];

const schema = yup
  .object({
    name: yup
      .string()

      .required("Nombre obligatorio"),
    latitude: yup.number().typeError("Latitud obligatoria").required(),
    longitude: yup.number().typeError("Longitud obligatoria").required(),
    description: yup.string().required("Descripción obligatoria"),
  })
  .required();

export { fields, schema };
