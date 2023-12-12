import { TextField } from "@mui/material";

const input = ({ name, errors, ...rest }) => (
  <TextField
    id={name}
    name={name}
    variant="outlined"
    errors={Boolean(errors)}
    helperText={errors?.message}
    {...rest}
  />
);

const select = ({ name, errors, options, placeholder, ...rest }) => (
  <TextField
    select
    id={name}
    name={name}
    variant="outlined"
    errors={Boolean(errors)}
    helperText={errors?.message}
    defaultValue="none"
    SelectProps={{
      native: true,
    }}
    {...rest}
  >
    <option value="none">{placeholder} </option>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </TextField>
);

export { input, select };
