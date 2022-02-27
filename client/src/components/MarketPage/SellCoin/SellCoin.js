import React from "react";
import { Button, TextField } from "@mui/material";
import styles from "./SellCoin.module.css";
import { Grid, Typography } from "@mui/material";

const SellCoin = () => {
  return (
    <Grid container gap={3} sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="h3">Sell</Typography>
      <TextField id="outlined-basic" label="Amount" variant="outlined" />
      <TextField id="outlined-basic" label="Amount" variant="outlined" />
      <Button variant="contained" sx={{ alignSelf: "center", marginTop: 5 }}>
        Sell
      </Button>
    </Grid>
  );
};

export default SellCoin;
