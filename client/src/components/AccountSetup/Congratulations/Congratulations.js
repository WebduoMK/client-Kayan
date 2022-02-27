import React from "react";
import Stack from "@mui/material/Stack";
import Hidden from "@mui/material/Hidden";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import Textfield from "./../../FormsUI/Textfield";
import { ReactComponent as Congrats } from "../../../assets/Congratulations_svg.svg";
import { ReactComponent as Logo } from "../../../assets/logo.svg";

const Congratulations = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100vh", width: "100vw", overflow: "hidden", margin: 0 }}
    >
      <Logo
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          marginTop: "3rem",
          marginLeft: "4rem",
        }}
        xs={12}
      />
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        xs={12}
        gap={3}
        sx={{
          width: { xs: "30rem", sm: "40rem", md: "50rem" },
          bgColor: "#000",
        }}
      >
        <Typography variant="h2">Congratulations</Typography>
        <Typography variant="body2">
          Let’s celebrate! Today is a big day. You have invested your first
          money.
        </Typography>
        <Congrats />
        <Button variant="contained" href="/dashboard">
          Go to dashboard
        </Button>
      </Grid>
    </Grid>
  );
};

export default Congratulations;
