import React, { useEffect } from 'react';
import styles from './Watchlist.module.css';
import Paper from '@mui/material/Paper';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Typography,
} from '@mui/material';
import TableRow from '@mui/material/TableRow';
import { formatNumber } from '../../../helpers/functions';
import { useNavigate } from 'react-router-dom';
import { color } from '@mui/system';

const Watchlist = ({ watchlistData }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        borderRadius: 10,
        boxShadow: '0px 4px 5px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        padding: '3rem 2rem',
      }}
    >
      <Typography
        variant="h3"
        color="GrayText.primary"
        sx={{ paddingBottom: '30px', textAlign: 'left' }}
      >
        Watchlist
      </Typography>
      <TableContainer>
        <Table sx={{ minWidth: 200 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="body1" color="#9FA6AB">
                  Name
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body1" color="#9FA6AB">
                  Price
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {watchlistData?.slice(0, 5).map((coin) => (
              <TableRow key={coin.name}>
                <TableCell
                  component="th"
                  scope="coin"
                  style={{ display: 'flex', alignItems: 'center' }}
                  onClick={() => navigate(`${coin.id}`)}
                >
                  <img src={coin.image} width={40} alt="" />
                  <p style={{ marginLeft: 15 }}>
                    {coin.name} <br />
                    <span style={{ color: '#9FA6AB' }}>
                      {coin.symbol.toUpperCase()}
                    </span>
                  </p>
                </TableCell>
                <TableCell align="right">
                  ${coin.current_price}
                  <br />
                  <p
                    style={{ margin: '0' }}
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

export default Watchlist;
