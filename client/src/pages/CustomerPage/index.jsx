import * as React from "react";

import { Link } from "react-router-dom";

import { Stack, Button, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";
import customerService from "services/customer-service";
import { Table } from "components";
import { useCustomers } from "hooks";
export default function CustomerPage() {
  // const [view, setView] = useState();
  const navigate = useNavigate();

  const { customers, loading, setCustomers } = useCustomers();

  const handleEdit = ({ _id: customerIdtoEdit }) =>
    navigate("/customer/edit/" + customerIdtoEdit);
  const handleDelete = ({ _id: customerIdToDelete }) => {
    customerService
      .delete(customerIdToDelete)
      .then(() =>
        setCustomers(
          customers.filter((customer) => customer._id !== customerIdToDelete)
        )
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
        rows={customers}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </>
  );
}
