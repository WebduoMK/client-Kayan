import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { formatNumber } from "../../../helpers/functions";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Input from "@mui/material/Input";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

import styles from "./CoinTable.module.css";

const CoinsTable = () => {
  const [data, setData] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState("ASC");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=%20bitcoin%2C%20ethereum%2C%20binancecoin%2C%20tether%2C%20solana%2C%20usd-coin%2C%20cardano%2C%20ripple%2C%20terra-luna%2C%20%20%20%20%20%20%20%20%20polkadot%2Cavalanche-2%2C%20dogecoin%2C%20matic-network%2C%20shiba-inu%2C%20binance-usd%2C%20near%2C%20crypto-com-chain%2C%20%20%20%20%20%20%20%20%20chainlink%2C%20wrapped-bitcoin%2C%20terrausd%2C%20uniswap%2C%20litecoin%2C%20dai%2C%20algorand%2C%20cosmos%2C%20fantom%2C%20%20%20%20%20%20%20%20%20bitcoin-cash%2C%20stellar%2C%20tron%2C%20internet-computer%2C%20ftx-token%2C%20decentraland%2C%20hedera-hashgraph%2C%20vechain%2C%20%20%20%20%20%20%20%20%20the-sandbox%2C%20axie-infinity%2C%20bitcoin-bep2%2C%20filecoin%2C%20theta-token%2C%20elrond-erd-2%2C%20ethereum-classic%2C%20%20%20%20%20%20%20%20%20monero%2C%20harmony%2C%20tezos%2C%20%20klay-token%2C%20iota%2C%20aave%2C%20the-graph%2C%20helium&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d"
      )
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      });
  }, []);

  const sortCoinsBy = (col) => {
    if (order === "ASC") {
      const sorted = [...data].sort((a, b) => (a[col] > b[col] ? 1 : -1));
      setData(sorted);
      setOrder("DESC");
    }
    if (order === "DESC") {
      const sorted = [...data].sort((a, b) => (a[col] < b[col] ? 1 : -1));
      setData(sorted);
      setOrder("ASC");
    }
  };

  return (
    <div>
      <Grid
        container
        xs={12}
        sx={{
          justifyContent: "space-between",
          p: "20px",
          marginBottom: "2rem",
        }}
      >
        <Grid item md={6} sx={{ alignSelf: "center" }}>
          <TextField
            id="outlined-basic"
            placeholder="Search all assets"
            sx={{ width: "100%" }}
            variant="outlined"
            onChange={(event) => setSearchTerm(event.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item>
          <Button variant="contained">Deposit</Button>
        </Grid>
      </Grid>

      <TableContainer style={{ width: "100%" }}>
        <Table sx={{ width: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell variant="body1" sx={{ color: "#9FA6AB" }}></TableCell>
              <TableCell variant="body1" sx={{ color: "#9FA6AB" }}>
                Name
              </TableCell>
              <TableCell
                align="right"
                onClick={() => sortCoinsBy("current_price")}
                variant="body1"
                sx={{ color: "#9FA6AB" }}
              >
                Price
              </TableCell>
              <TableCell
                align="right"
                onClick={() =>
                  sortCoinsBy("price_change_percentage_1h_in_currency")
                }
                variant="body1"
                sx={{ color: "#9FA6AB" }}
              >
                1h
              </TableCell>
              <TableCell
                align="right"
                onClick={() =>
                  sortCoinsBy("price_change_percentage_24h_in_currency")
                }
                variant="body1"
                sx={{ color: "#9FA6AB" }}
              >
                24h
              </TableCell>
              <TableCell
                align="right"
                onClick={() =>
                  sortCoinsBy("price_change_percentage_7d_in_currency")
                }
                variant="body1"
                sx={{ color: "#9FA6AB" }}
              >
                7d
              </TableCell>

              <TableCell
                align="right"
                onClick={() => sortCoinsBy("market_cap")}
                variant="body1"
                sx={{ color: "#9FA6AB" }}
              >
                Market Cap
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .filter((c) =>
                c.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((coin) => (
                <TableRow key={coin.name}>
                  <TableCell>
                    <StarOutlineIcon color="grayText" />
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="coin"
                    style={{ display: "flex", alignItems: "center" }}
                    onClick={() => navigate(`${coin.id}`)}
                  >
                    <img src={coin.image} width={40} alt="" />
                    <p style={{ marginLeft: 15 }}>
                      {coin.name} <br />
                      <span style={{ color: "#9FA6AB" }}>
                        {coin.symbol.toUpperCase()}
                      </span>
                    </p>
                  </TableCell>
                  <TableCell align="right">
                    ${coin.current_price.toFixed(2)}
                  </TableCell>
                  <TableCell align="right">
                    <p
                      className={
                        coin.price_change_percentage_1h_in_currency < 0
                          ? styles.red
                          : styles.green
                      }
                    >
                      {coin.price_change_percentage_1h_in_currency.toFixed(2)} %
                    </p>
                  </TableCell>
                  <TableCell align="right">
                    <p
                      className={
                        coin.price_change_percentage_24h_in_currency < 0
                          ? styles.red
                          : styles.green
                      }
                    >
                      {coin.price_change_percentage_24h_in_currency.toFixed(2)}{" "}
                      %
                    </p>
                  </TableCell>
                  <TableCell align="right">
                    <p
                      className={
                        coin.price_change_percentage_7d_in_currency < 0
                          ? styles.red
                          : styles.green
                      }
                    >
                      {coin.price_change_percentage_7d_in_currency.toFixed(2)} %
                    </p>
                  </TableCell>

                  <TableCell align="right">
                    ${formatNumber(coin.market_cap, 2)}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CoinsTable;
