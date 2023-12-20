import * as React from "react";

import { Link } from "react-router-dom";

import { Stack, Button, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";
import placeService from "services/place-service";
import { Table } from "components";
import { usePlaces } from "hooks";
export default function CustomerPage() {
  // const [view, setView] = useState();
  const navigate = useNavigate();

  const { places, loading, setPlaces } = usePlaces();

  const handleEdit = ({ _id: placeIdtoEdit }) =>
    navigate("/customer/edit/" + placeIdtoEdit);
  const handleDelete = ({ _id: placeIdToDelete }) => {
    placeService
      .delete(placeIdToDelete)
      .then(() =>
        setPlaces(places.filter((place) => place._id !== placeIdToDelete))
      )
      .catch((err) => {
        if (err.response.status === 400)
          setErrorsFromResponse(err.response.data);
      });
  };

  if (loading) return <CircularProgress />;

  return (
    <>
      <Stack spacing={3}>
        <Stack direction="row" justifyContent="space-between">
          <Button
            variant="contained"
            color="secondary"
            startIcon={<Add />}
            component={Link}
            to="/customer/new"
          >
            New client
          </Button>
        </Stack>
      </Stack>
      <Typography variant="h2" component="h2">
        Lista de clientes
      </Typography>

      <Table
        columns={[
          {
            label: "Nombre",
            path: "name",
          },
          {
            label: "latitud",
            path: "latitude",
            props: {
              align: "right",
            },
          },
          {
            label: "longitude",
            path: "longitude",
            props: {
              align: "right",
            },
          },
        ]}
        rows={places}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </>
  );
}
