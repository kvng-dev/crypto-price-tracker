import { useParams } from "react-router-dom";
import "./coin.css";
import { useContext, useEffect, useState } from "react";
import { CoinContext } from "../../context/CoinContext";
import LineChart from "../../components/LineChart";

const Coin = () => {
  const { currency } = useContext(CoinContext);
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState();
  const [historicalData, setHistoricalData] = useState();

  const fectchCoin = async () => {
    const url = `https://api.coingecko.com/api/v3/coins/${coinId}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-SmU6MzgWjWQBHbSkozA3AWHQ",
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => setCoinData(json))
      .catch((err) => console.error(err));
  };

  const fetchHistory = async () => {
    const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-SmU6MzgWjWQBHbSkozA3AWHQ",
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => setHistoricalData(json))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fectchCoin();
    fetchHistory();
  }, [currency]);

  if (!coinData && !historicalData)
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  return (
    <div className="coin">
      <div className="coin-name">
        <img src={coinData.image.large} alt={coinData.name} />
        <p>
          <b>
            {coinData.name} ({coinData.symbol})
          </b>
        </p>
      </div>
      <div className="coin-chart">
        <LineChart historicalData={historicalData} />
      </div>

      <div className="coin-info">
        <ul>
          <li>Crypto Market Rank</li>
          <li>{coinData.market_cap_rank}</li>
        </ul>
        <ul>
          <li>Current Price</li>
          <li>
            {currency.symbol}
            {coinData.market_data.current_price[currency.name].toLocaleString()}
          </li>
        </ul>
        <ul>
          <li>Market Cap</li>
          <li>
            {currency.symbol}
            {coinData.market_data.market_cap[currency.name].toLocaleString()}
          </li>
        </ul>
        {/* <ul>
          <li>24 Hour High</li>
          <li>
            {currency.symbol}
            {coinData.market_data.market_cap.high_24h[
              currency.name
            ].toLocaleString()}
          </li>
        </ul>
        <ul>
          <li>24 Hour Low</li>
          <li>
            {currency.symbol}
            {coinData.market_data.market_cap.low_24h[
              currency.name
            ].toLocaleString()}
          </li>
        </ul> */}
      </div>
    </div>
  );
};
export default Coin;
