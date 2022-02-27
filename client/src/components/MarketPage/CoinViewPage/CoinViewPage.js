import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import styles from './CoinViewPage.module.css';
import { Grid, Typography } from '@mui/material';
import Watchlist from './../Watchlist/Watchlist';
import { Button } from '@mui/material';
import { Box } from '@mui/system';

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import useAxios from 'axios-hooks';
import BuyCoin from '../BuyCoin/BuyCoin';
import SellCoin from '../SellCoin/SellCoin';
import { formatNumber } from '../../../helpers/functions';

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="tooltip">
        <h4>{format(parseISO(label), 'eeee, d MMM, yyyy')}</h4>
        <p>{JSON.stringify(payload, null, 2)}</p>
        <p>{payload[0].value.toFixed(2)} USD</p>
      </div>
    );
  }
  return null;
}

const CoinViewPage = () => {
  const { id } = useParams();

  const [coin, setCoin] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
      )
      .then((res) => {
        setCoin(res.data[0]);
        console.log(res.data[0]);
      });
  }, []);

  // graph info
  const MARKET_CHART_ID = id;

  const [timeFilter, setTimeFilter] = useState('7');
  const [{ data, loading, error }] = useAxios({
    url: `https://api.coingecko.com/api/v3/coins/${MARKET_CHART_ID}/market_chart?vs_currency=usd&days=${timeFilter}`,
    method: 'GET',
  });

  const mappedData = React.useMemo(
    function () {
      return (data === null || data === void 0 ? void 0 : data.prices)
        ? data.prices.map(function (ele) {
            return {
              date: new Date(ele[0]),
              value: ele[1],
            };
          })
        : [];
    },
    [data]
  );

  console.log('mapped');
  console.log(mappedData);

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [watchlistData, setWatchlistData] = useState(null);

  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=%20bitcoin%2C%20ethereum%2C%20binancecoin%2C%20tether%2C%20solana%2C%20usd-coin%2C%20cardano%2C%20ripple%2C%20terra-luna%2C%20%20%20%20%20%20%20%20%20polkadot%2Cavalanche-2%2C%20dogecoin%2C%20matic-network%2C%20shiba-inu%2C%20binance-usd%2C%20near%2C%20crypto-com-chain%2C%20%20%20%20%20%20%20%20%20chainlink%2C%20wrapped-bitcoin%2C%20terrausd%2C%20uniswap%2C%20litecoin%2C%20dai%2C%20algorand%2C%20cosmos%2C%20fantom%2C%20%20%20%20%20%20%20%20%20bitcoin-cash%2C%20stellar%2C%20tron%2C%20internet-computer%2C%20ftx-token%2C%20decentraland%2C%20hedera-hashgraph%2C%20vechain%2C%20%20%20%20%20%20%20%20%20the-sandbox%2C%20axie-infinity%2C%20bitcoin-bep2%2C%20filecoin%2C%20theta-token%2C%20elrond-erd-2%2C%20ethereum-classic%2C%20%20%20%20%20%20%20%20%20monero%2C%20harmony%2C%20tezos%2C%20%20klay-token%2C%20iota%2C%20aave%2C%20the-graph%2C%20helium&order=market_cap_desc&per_page=100&page=1&sparkline=false'
      )
      .then((res) => {
        console.log(res.data);
        setWatchlistData(res.data);
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
            <Grid
              item
              // display="flex"
              sx={{ marginLeft: '20px', marginTop: '30px' }}
            >
              <Grid item xs={12} lg={9} order={{ xs: 2, lg: 1 }}>
                <Grid item display="flex" sx={{ paddingBottom: '20px' }}>
                  <img src={coin?.image} style={{ width: 40 }} />
                  <Typography variant="h2" sx={{ marginLeft: '20px' }}>
                    {coin?.name}
                    <span
                      style={{
                        color: '#9FA6AB',
                        fontSize: '1.2rem',
                        fontWeight: 500,
                        marginLeft: '5px',
                      }}
                    >
                      {coin?.symbol.toUpperCase()}
                    </span>
                  </Typography>
                </Grid>
              </Grid>
              <Typography variant="h2">
                ${coin?.current_price}{' '}
                <span
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: 500,
                    marginLeft: '5px',
                  }}
                  className={
                    coin?.price_change_percentage_24h < 0
                      ? styles.red
                      : styles.green
                  }
                >
                  {coin?.price_change_percentage_24h.toFixed(2)} %
                </span>
              </Typography>
              <Typography variant="body1">
                Marketcap: {formatNumber(coin?.market_cap, 2)}
              </Typography>
            </Grid>

            <div className={styles.coinViewPage}>
              {coin ? (
                <div className={styles.coinViewPage}>
                  <div
                    style={{
                      display: 'flex',
                      width: 500,
                      justifyContent: 'space-between',
                      width: '40%',
                      marginLeft: '60%',
                      color: '#9FA6AB',
                    }}
                  >
                    <p
                      style={{ cursor: 'pointer' }}
                      onClick={() => setTimeFilter('1')}
                    >
                      24H
                    </p>
                    <p
                      style={{ cursor: 'pointer' }}
                      onClick={() => setTimeFilter('7')}
                    >
                      1W
                    </p>
                    <p
                      style={{ cursor: 'pointer' }}
                      onClick={() => setTimeFilter('180')}
                    >
                      6M
                    </p>
                    <p
                      style={{ cursor: 'pointer' }}
                      onClick={() => setTimeFilter('365')}
                    >
                      1Y
                    </p>
                    <p
                      style={{ cursor: 'pointer' }}
                      onClick={() => setTimeFilter('1825')}
                    >
                      5Y
                    </p>
                    <p
                      style={{ cursor: 'pointer' }}
                      onClick={() => setTimeFilter('max')}
                    >
                      MAX
                    </p>
                  </div>

                  <div className={styles.graph}>
                    <ResponsiveContainer width="100%" height={400}>
                      <AreaChart data={mappedData}>
                        <defs>
                          <linearGradient
                            id="color"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="0%"
                              stopColor="#53b88c"
                              stopOpacity={0.4}
                            />
                            <stop
                              offset="75%"
                              stopColor="#53b88c"
                              stopOpacity={0.05}
                            />
                          </linearGradient>
                        </defs>

                        <Area
                          dataKey="value"
                          stroke="#53b88c"
                          fill="url(#color)"
                        />

                        <XAxis
                          dataKey="date"
                          axisLine={false}
                          tickLine={true}
                          tickFormatter={(str) => {
                            const date = new Date(str);
                            switch (timeFilter) {
                              case '7':
                                return date.getDate();
                            }
                            switch (timeFilter) {
                              case 'max':
                                return date.getFullYear();
                            }
                            return date.getFullYear();
                          }}
                        />

                        <YAxis
                          domain={['dataMin', 'dataMax']}
                          datakey="value"
                          axisLine={false}
                          tickLine={false}
                          tickCount={10}
                          tickFormatter={(number) => `$${number.toFixed(2)}`}
                          textAnchor="end"
                          sclaeToFit="true"
                          verticalAnchor="start"
                          width={55}
                        />

                        <Tooltip
                          wrapperStyle={{ backgroundColor: 'red' }}
                          labelStyle={{ color: 'green' }}
                          itemStyle={{ color: 'blue' }}
                          formatter={function (value, name) {
                            return `${value.toFixed(5)}`;
                          }}
                          labelFormatter={(value) => {
                            return `${format(new Date(value), 'do MMMM Y')}`;
                          }}
                        />

                        <CartesianGrid opacity={0.1} vertical={false} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Tabs */}
                  <Grid
                    container
                    sx={{
                      marginTop: '4rem',
                      justifyContent: 'space-between',
                      p: { xs: '0px', md: '20px' },
                      marginBottom: '2rem',
                    }}
                  >
                    <Grid container sx={{ justifyContent: 'end' }} xs={12}>
                      <Button variant="contained">Deposit</Button>
                    </Grid>

                    <Grid item sx={{ alignSelf: 'center' }} xs={12}>
                      <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                          <TabList
                            onChange={handleChange}
                            aria-label="lab API tabs example"
                          >
                            <Tab
                              sx={{ fontSize: '1.4rem', fontWeight: 500 }}
                              label="Roth IRA"
                              value="1"
                            />
                            <Tab
                              sx={{ fontSize: '1.4rem', fontWeight: 500 }}
                              label="Traditional IRA"
                              value="2"
                            />
                          </TabList>
                        </Box>
                        <TabPanel value="1">
                          <Grid container sx={{ display: 'flex' }} spacing>
                            <Grid item xs={12} md={6}>
                              <BuyCoin />
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <SellCoin />
                            </Grid>
                          </Grid>
                        </TabPanel>
                        <TabPanel value="2">
                          <Grid container sx={{ display: 'flex' }} spacing>
                            <Grid item xs={12} md={6}>
                              <BuyCoin />
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <SellCoin />
                            </Grid>
                          </Grid>
                        </TabPanel>
                      </TabContext>
                    </Grid>
                  </Grid>

                  {/* Buy/Sell */}
                  {/* <Grid container sx={{ display: "flex" }} spacing>
                    <Grid item xs={12} md={6}>
                      <BuyCoin />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <SellCoin />
                    </Grid>
                  </Grid> */}
                </div>
              ) : (
                'Insert loader here'
              )}
            </div>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} lg={3} order={{ xs: 1, lg: 2 }}>
          <Watchlist watchlistData={watchlistData} />
        </Grid>
        {/* <Grid item xs={12} sm={6} lg={3} order={{ xs: 1, lg: 2 }}>
          <Watchlist data={data} />
        </Grid> */}
      </Grid>
    </Grid>
  );
};

export default CoinViewPage;
