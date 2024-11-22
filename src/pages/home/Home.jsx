import { useContext, useEffect, useState } from "react";
import "./home.css";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { coins, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);

  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
    if (e.target.value == "") {
      setDisplayCoin(coins);
    }
  };

  const searchHandler = async (e) => {
    e.preventDefault();
    const result = await coins.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
    setDisplayCoin(result);
  };

  useEffect(() => {
    setDisplayCoin(coins);
  }, [coins]);
  return (
    <div className="home">
      <div className="hero">
        <h1>
          Largest <br />
          <span> Crypto </span>Market Place
        </h1>
        <p>
          Welcome to the {"world's"} largest cryptocurrency marketplace. Sign up
          to explore more about cryptos
        </p>
        <form onSubmit={searchHandler}>
          <input
            value={input}
            onChange={handleInputChange}
            type="text"
            list="coinlist"
            placeholder="Search crypto..."
          />
          <datalist id="coinlist">
            {coins.map((item, index) => (
              <option key={index} value={item.name} />
            ))}
          </datalist>
          <button type="submit">Search</button>
        </form>
      </div>

      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24H Change</p>
          <p className="mkt-cap">Market Cap</p>
        </div>
        {displayCoin.slice(0, 10).map((item, index) => (
          <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
            <p>{item.market_cap_rank}</p>
            <div>
              <img src={item.image} alt="" />
              <p>{item.name + "-" + item.symbol}</p>
            </div>
            <p>
              {currency.symbol} {item.current_price.toLocaleString()}
            </p>
            <p
              className={item.price_change_percentage_24h > 0 ? "green" : "red"}
            >
              {Math.floor(item.price_change_percentage_24h * 100) / 100}
            </p>
            <p className="mkt-cap">
              {currency.symbol} {item.market_cap.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Home;
