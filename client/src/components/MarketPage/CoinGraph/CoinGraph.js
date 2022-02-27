import React, { useEffect, useState, PureComponent } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { format, parseISO } from "date-fns";
import styles from "./CoinGraph.module.css";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import useAxios from "axios-hooks";
import BuyCoin from "../BuyCoin/BuyCoin";
import SellCoin from "../SellCoin/SellCoin";
import { formatNumber } from "../../../helpers/functions";

export const CoinGraph = () => {
  // const { id } = 'bitcoin';

  // const [coin, setCoin] = useState(null);

  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&order=market_cap_desc&per_page=100&page=1&sparkline=false`
  //     )
  //     .then((res) => setCoin(res.data[0]));
  // }, []);

  // graph info
  const MARKET_CHART_ID = "bitcoin";

  const [timeFilter, setTimeFilter] = useState("7");
  const [{ data, loading, error }] = useAxios({
    url: `https://api.coingecko.com/api/v3/coins/${MARKET_CHART_ID}/market_chart?vs_currency=usd&days=${timeFilter}`,
    method: "GET",
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

  console.log("mapped");
  console.log(mappedData);

  return (
    <>
      <div
        style={{
          display: "flex",
          width: 500,
          justifyContent: "space-between",
          width: "40%",
          marginLeft: "60%",
          color: "#9FA6AB",
        }}
      >
        <p style={{ cursor: "pointer" }} onClick={() => setTimeFilter("1")}>
          24H
        </p>
        <p style={{ cursor: "pointer" }} onClick={() => setTimeFilter("7")}>
          1W
        </p>
        <p style={{ cursor: "pointer" }} onClick={() => setTimeFilter("180")}>
          6M
        </p>
        <p style={{ cursor: "pointer" }} onClick={() => setTimeFilter("365")}>
          1Y
        </p>
        <p style={{ cursor: "pointer" }} onClick={() => setTimeFilter("1825")}>
          5Y
        </p>
        <p style={{ cursor: "pointer" }} onClick={() => setTimeFilter("max")}>
          MAX
        </p>
      </div>
      <div className={styles.graph}>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={mappedData}>
            <defs>
              <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#53b88c" stopOpacity={0.4} />
                <stop offset="75%" stopColor="#53b88c" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <Area dataKey="value" stroke="#53b88c" fill="url(#color)" />

            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={true}
              tickFormatter={(str) => {
                const date = new Date(str);
                switch (timeFilter) {
                  case "7":
                    return date.getDate();
                }
                switch (timeFilter) {
                  case "max":
                    return date.getFullYear();
                }
                return date.getFullYear();
              }}
            />

            <YAxis
              domain={["dataMin", "dataMax"]}
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
              wrapperStyle={{ backgroundColor: "red" }}
              labelStyle={{ color: "green" }}
              itemStyle={{ color: "blue" }}
              formatter={function (value, name) {
                return `${value.toFixed(5)}`;
              }}
              labelFormatter={(value) => {
                return `${format(new Date(value), "do MMMM Y")}`;
              }}
            />

            <CartesianGrid opacity={0.1} vertical={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};
export default CoinGraph;
