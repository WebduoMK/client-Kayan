import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./CoinsPortfolioTable.module.css";

const CoinsPortfolioTable = ({ data, title }) => {
  // const [data, setData] = useState([])

  const navigate = useNavigate();

  // useEffect(() => {
  //     axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=%20bitcoin%2C%20ethereum%2C%20binancecoin%2C%20tether%2C%20solana%2C%20usd-coin%2C%20cardano%2C%20ripple%2C%20terra-luna%2C%20%20%20%20%20%20%20%20%20polkadot%2Cavalanche-2%2C%20dogecoin%2C%20matic-network%2C%20shiba-inu%2C%20binance-usd%2C%20near%2C%20crypto-com-chain%2C%20%20%20%20%20%20%20%20%20chainlink%2C%20wrapped-bitcoin%2C%20terrausd%2C%20uniswap%2C%20litecoin%2C%20dai%2C%20algorand%2C%20cosmos%2C%20fantom%2C%20%20%20%20%20%20%20%20%20bitcoin-cash%2C%20stellar%2C%20tron%2C%20internet-computer%2C%20ftx-token%2C%20decentraland%2C%20hedera-hashgraph%2C%20vechain%2C%20%20%20%20%20%20%20%20%20the-sandbox%2C%20axie-infinity%2C%20bitcoin-bep2%2C%20filecoin%2C%20theta-token%2C%20elrond-erd-2%2C%20ethereum-classic%2C%20%20%20%20%20%20%20%20%20monero%2C%20harmony%2C%20tezos%2C%20%20klay-token%2C%20iota%2C%20aave%2C%20the-graph%2C%20helium&order=market_cap_desc&per_page=100&page=1&sparkline=false")
  //         .then(res => {
  //             console.log(res.data)
  //             setData(res.data)
  //         })
  // }, [])

  return (
    <div className={styles.portoflio}>
      <Typography
        variant="h3"
        sx={{ marginBottom: "4rem", textAlign: "center" }}
      >
        {title}
      </Typography>
      <TableContainer style={{ width: "100%" }}>
        <Table sx={{ width: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#9FA6AB", width: "33%" }}>
                <Typography variant="body1" color="#9FA6AB">
                  Name
                </Typography>
              </TableCell>
              <TableCell align="center" sx={{ color: "#9FA6AB", width: "33%" }}>
                <Typography variant="body1" color="#9FA6AB">
                  Available
                </Typography>
              </TableCell>
              <TableCell align="center" sx={{ color: "#9FA6AB", width: "33%" }}>
                <Typography variant="body1" color="#9FA6AB">
                  Value
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ border: 0, boxShadow: 0 }}>
            {data.map((coin) => (
              <TableRow
                key={coin.name}
                sx={{
                  width: "100%",
                  borderBottom: "1px solid rgba(224, 224, 224, 1)",
                }}
              >
                <TableCell
                  component="th"
                  scope="coin"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "33%",
                    borderBottom: 0,
                  }}
                  onClick={() => navigate(`/market/${coin.id}`)}
                >
                  <img src={coin.image} width={40} alt="" />
                  <p style={{ marginLeft: 15 }}>
                    {coin.name} <br />
                    <span style={{ color: "#9FA6AB" }}>
                      {coin.symbol.toUpperCase()}
                    </span>
                  </p>
                </TableCell>
                <TableCell align="center" sx={{ width: "33%" }}>
                  {coin.current_price}
                </TableCell>
                <TableCell
                  sx={{ width: "33%" }}
                  align="center"
                  className={
                    coin.price_change_percentage_24h < 0
                      ? styles.red
                      : styles.green
                  }
                >
                  <p
                    style={{ margin: "0" }}
                    className={
                      coin.price_change_percentage_24h < 0
                        ? styles.red
                        : styles.green
                    }
                  >
                    {coin.price_change_percentage_24h.toFixed(2)} %
                  </p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CoinsPortfolioTable;
