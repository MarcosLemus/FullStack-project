import { NavLink } from "react-router-dom";
import { Typography } from "@mui/material";

import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";

function Brand() {
  return (
    <>
      <DirectionsBikeIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
      <Typography
        variant="h6"
        noWrap
        component={NavLink}
        sx={{
          mr: 2,

          display: { xs: "none", md: "flex" },
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".1rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        RIDERS
      </Typography>
    </>
  );
}
export default Brand;
