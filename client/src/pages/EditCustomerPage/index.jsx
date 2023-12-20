import { CircularProgress, Stack, Typography } from "@mui/material";

import { useState } from "react";

import { useParams } from "react-router-dom";

import { Form } from "components";

import placeService from "services/place-service";

import { usePlace } from "hooks";

import { fields, schema, getDefaultValues } from "./form-data";

export default function EditCustomerPage() {
  const { placeId } = useParams();
  console.log(placeId);

  const { place, loading } = usePlace(placeId);
  const [errorsFromResponse, setErrorsFromResponse] = useState([]);

  const onSubmit = (place) => {
    placeService
      .update(placeId, place)
      .then(() => {})
      .catch((err) => {
        if (err.response.status === 400)
          setErrorsFromResponse(err.response.data);
      });
  };
  if (loading) return <CircularProgress />;
  console.log(place, "cusfdgfh");

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
          defaultValues={getDefaultValues(place)}
        />
      </Stack>
    </>
  );
}
