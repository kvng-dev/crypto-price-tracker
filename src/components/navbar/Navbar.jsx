import { useContext } from "react";
import "./navbar.css";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { setCurrency } = useContext(CoinContext);

  const handleCurrencyChange = (e) => {
    switch (e.target.value) {
      case "usd":
        setCurrency({ name: "usd", symbol: "$" });
        break;
      case "eur":
        setCurrency({ name: "eur", symbol: "€" });
        break;
      case "ngn":
        setCurrency({ name: "ngn", symbol: "₦" });
        break;
      default:
        setCurrency({ name: "usd", symbol: "$" });
        break;
    }
  };
  return (
    <div className="navbar">
      <Link to="/">
        <img src="/logo.png" className="logo" alt="" />
      </Link>

      <ul>
        <Link to="/">
          <li>Home</li>
        </Link>
        <li>Features</li>
        <li>Pricing</li>
        <li>Blog</li>
      </ul>

      <div className="nav-right">
        <select onChange={handleCurrencyChange}>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="ngn">NAIRA</option>
        </select>
        <button>
          Sign Up
          <img src="/arrow_icon.png" alt="" />
        </button>
      </div>
    </div>
  );
};
export default Navbar;
