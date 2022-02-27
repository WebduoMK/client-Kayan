import React from "react";
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import styles from "./BuyCoin.module.css";

const BuyCoin = () => {
  return (
    <Grid container gap={3} sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="h3">Buy</Typography>
      <TextField id="outlined-basic" label="Amount" variant="outlined" />
      <TextField id="outlined-basic" label="Amount" variant="outlined" />
      <Button variant="contained" sx={{ alignSelf: "center", marginTop: 5 }}>
        Buy
      </Button>
    </Grid>
  );
};

export default BuyCoin;
