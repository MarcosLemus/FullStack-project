import { Stack, Typography } from "@mui/material";

import { useState } from "react";

import { Form } from "components";

import { toast } from "react-toastify";

import { fields, schema } from "./form-data";
import { register } from "services/auth-service";

import { useAuth } from "hooks";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [, dispatch] = useAuth();
  const [errorsFromResponse, setErrorsFromResponse] = useState([]);

  const onSubmit = (user) => {
    register(user)
      .then((decodedJWT) => {
        const { username, isAdmin } = decodedJWT;

        const type = isAdmin ? "admin" : "login";
        dispatch({ type, username });
        navigate("/", { replace: true });
      })
      .catch((err) => {
        const { data, status } = err.response;
        if (Array.isArray(data) && status === 400) {
          setErrorsFromResponse(err.response.data);
        } else {
          toast.error(data.message);
        }
      });
  };

  return (
    <>
      <Stack spacing={3}>
        <Typography variant="h2" component="h2">
          Registrar usuario
        </Typography>
        <Form
          inputs={fields}
          onSubmit={onSubmit}
          validationSchema={schema}
          errorsFromResponse={errorsFromResponse}
          submitLabel="Registrar"
        />
      </Stack>
    </>
  );
}
