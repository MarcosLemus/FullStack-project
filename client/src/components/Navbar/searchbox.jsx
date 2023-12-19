import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState, useEffect } from "react";

export default function Searchbox() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const getPlacesFromApi = async () => {
      try {
        const response = await fetch("http://localhost:4040/api/places");
        const data = await response.json();
        setPlaces(data);
      } catch (error) {
        console.error("Error getting places from API:", error);
      }
    };

    getPlacesFromApi();
  }, []);

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={places}
      getOptionLabel={(option) => option.name} // Indica la propiedad que se mostrará en la caja de texto
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Filtra lugares" />}
      renderOption={(props, option) => (
        <li {...props}>
          <div>{option.name}</div>
        </li>
      )}
    />
  );
}
