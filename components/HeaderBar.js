import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import GrassIcon from "@mui/icons-material/Grass";

export default function HeaderBar() {
  return (
    <>
      <AppBar
        position="sticky"
        style={{ width: "100%", backgroundColor: "#A7C497" }}
      >
        <Toolbar>
          <GrassIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "white",
              width: "100%",
            }}
          >
            Brocolli & Co.
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}
