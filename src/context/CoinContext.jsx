import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

export const CoinContextProvider = ({ children }) => {
  const [coins, setCoins] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$",
  });

  const fetchCoins = async () => {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-SmU6MzgWjWQBHbSkozA3AWHQ",
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => setCoins(json))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);
  const contextValue = { coins, currency, setCurrency };
  return (
    <CoinContext.Provider value={contextValue}>{children}</CoinContext.Provider>
  );
};
