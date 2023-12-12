import { CircularProgress, Stack, Typography } from "@mui/material";

import { useState } from "react";

import { useParams } from "react-router-dom";

import { Form } from "components";

import customerService from "services/customer-service";

import { useCustomer } from "hooks";

import { fields, schema, getDefaultValues } from "./form-data";

export default function EditCustomerPage() {
  const { customerId } = useParams();

  const { customer, loading } = useCustomer(customerId);
  const [errorsFromResponse, setErrorsFromResponse] = useState([]);

  const onSubmit = (customer) => {
    customerService
      .update(customerId, customer)
      .then(() => {})
      .catch((err) => {
        if (err.response.status === 400)
          setErrorsFromResponse(err.response.data);
      });
  };
  if (loading) return <CircularProgress />;
  console.log(customer, "cusfdgfh");

  return (
    <>
      <Stack spacing={3}>
        <Typography variant="h2" component="h2">
          Editar cliente
        </Typography>
        <Form
          inputs={fields}
          onSubmit={onSubmit}
          validationSchema={schema}
          errorsFromResponse={errorsFromResponse}
          submitLabel="Editar"
          defaultValues={getDefaultValues(customer)}
        />
      </Stack>
    </>
  );
}
