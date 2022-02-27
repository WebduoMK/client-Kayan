import React from 'react';
import {useNavigate} from "react-router";

const CoinMarket = ({coin}) => {
    let navigate = useNavigate()

    return (
        <div onClick={() => navigate(`${coin.id}`)}>
            <h1>{coin.name}</h1>
            <img src={coin.image} width={100} alt={coin.name}/>
            <p>Price: {coin.current_price}</p>
            <p>Market Cap: {coin.market_cap.toLocaleString()}</p>
        </div>
    );
};

export default CoinMarket;
