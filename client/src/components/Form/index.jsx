import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Stack, Button, TextField } from "@mui/material";

import { useEffect } from "react";
import * as fields from "./input-fields";

function Form({
  inputs,
  validationSchema,
  onSubmit,
  errorsFromResponse = [],
  submitLabel,
  defaultValues,
}) {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  useEffect(() => {
    if (!Array.isArray(errorsFromResponse)) return;

    errorsFromResponse.forEach(({ field, msg }) => {
      setError(
        field,
        { type: "response", message: msg },
        { shouldFocus: true }
      );
    });
  }, [errorsFromResponse]);
  return (
    <Stack
      component="form"
      onSubmit={handleSubmit((data) => onSubmit(data, { setError, reset }))}
      spacing={3}
    >
      {inputs.map(({ name, type, ...rest }) => {
        const Input = fields[type] || fields.input;

        const { ref, ...resgisterProps } = register(name);

        return (
          <Input
            key={name}
            type={type}
            errors={errors[name]}
            inputRef={ref}
            {...resgisterProps}
            {...rest}
          />
        );
      })}

      <Button type="submit">{submitLabel}</Button>
    </Stack>
  );
}

export default Form;
