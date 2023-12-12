import { Stack, Typography } from "@mui/material";

import { useState } from "react";

import { Form } from "components";

import customerService from "services/customer-service";

import { fields, schema } from "./form-data";

export default function AddCustomerPage() {
  const [errorsFromResponse, setErrorsFromResponse] = useState([]);

  const onSubmit = (customer, { setErrors, reset }) => {
    customerService
      .create(customer)
      .then(() => reset())
      .catch((err) => {
        const { data, status } = err.response;
        if (err.response.status === 400)
          setErrorsFromResponse(err.response.data);
      });
  };

  return (
    <>
      <Stack spacing={3}>
        <Typography variant="h2" component="h2">
          Añadir nuevo cliente
        </Typography>
        <Form
          inputs={fields}
          onSubmit={onSubmit}
          validationSchema={schema}
          errorsFromResponse={errorsFromResponse}
          submitLabel="Crear"
        />
      </Stack>
    </>
  );
}
