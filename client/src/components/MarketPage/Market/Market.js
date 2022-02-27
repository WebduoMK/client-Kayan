import CoinList from '../CoinList/CoinList';
import styles from './Market.module.css';
import CoinsTable from '../CoinsTable/CoinsTable';
import { Grid, Typography } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Watchlist from '../Watchlist/Watchlist';

const Market = () => {
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=%20bitcoin%2C%20ethereum%2C%20binancecoin%2C%20tether%2C%20solana%2C%20usd-coin%2C%20cardano%2C%20ripple%2C%20terra-luna%2C%20%20%20%20%20%20%20%20%20polkadot%2Cavalanche-2%2C%20dogecoin%2C%20matic-network%2C%20shiba-inu%2C%20binance-usd%2C%20near%2C%20crypto-com-chain%2C%20%20%20%20%20%20%20%20%20chainlink%2C%20wrapped-bitcoin%2C%20terrausd%2C%20uniswap%2C%20litecoin%2C%20dai%2C%20algorand%2C%20cosmos%2C%20fantom%2C%20%20%20%20%20%20%20%20%20bitcoin-cash%2C%20stellar%2C%20tron%2C%20internet-computer%2C%20ftx-token%2C%20decentraland%2C%20hedera-hashgraph%2C%20vechain%2C%20%20%20%20%20%20%20%20%20the-sandbox%2C%20axie-infinity%2C%20bitcoin-bep2%2C%20filecoin%2C%20theta-token%2C%20elrond-erd-2%2C%20ethereum-classic%2C%20%20%20%20%20%20%20%20%20monero%2C%20harmony%2C%20tezos%2C%20%20klay-token%2C%20iota%2C%20aave%2C%20the-graph%2C%20helium&order=market_cap_desc&per_page=100&page=1&sparkline=false'
      )
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      });
  }, []);
  return (
    <Grid container sx={{ backgroundColor: '#F8F8F8' }}>
      <Grid
        container
        sx={{
          marginLeft: { xs: '0', lg: '300px' },
          width: '100%',
          paddingRight: 5,
          py: '100px',
        }}
        spacing={5}
      >
        <Grid item xs={12} lg={9} order={{ xs: 2, lg: 1 }}>
          <Grid
            xs={12}
            item
            sx={{
              borderRadius: '10px',
              boxShadow: '0px 4px 5px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#fff',
              padding: '10px 15px',
            }}
          >
            <CoinsTable />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} lg={3} order={{ xs: 1, lg: 2 }}>
          <Watchlist watchlistData={data} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Market;
