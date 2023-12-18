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
    type: "string",
  },
  {
    name: "longitude",
    label: "Longitud",
    type: "string",
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
    latitude: yup.string().typeError("Latitud obligatoria").required(),
    longitude: yup.string().typeError("Longitud obligatoria").required(),
    description: yup.string().required("Descripción obligatoria"),
  })
  .required();

export { fields, schema };
