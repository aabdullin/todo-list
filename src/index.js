import React, { createContext, useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import useAxios from "axios-hooks";
import "./index.css";

const CryptoCard = (props) => {
  console.log(props);
  const { key, value } = props;
  return (
    <div className="crypto-card">
      {key}
      <h2>{value.name}</h2>
      <img className="card-image" src={value.image} alt={value.name} />
      <div className="crypto-card-list">
        <li>Price: ${value.current_price} </li>
        <li>
          Change (24h):{" "}
          {Math.round(value.price_change_percentage_24h * 100) / 100} %
        </li>
      </div>
      {value.market_cap}
    </div>
  );
};

const CryptoList = () => {
  const [search, setSearch] = useState("");
  const [{ data, loading, error }, refetch] = useAxios(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=24h"
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  console.log(data);

  return (
    <div className="d-flex flex-row">
      <input
        type="text"
        name="name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {data
        .filter((item) => {
          return item.id.startsWith(search);
        })
        .map((item) => {
          return <CryptoCard key={item.id} value={item} />;
        })}
    </div>
  );
};

ReactDOM.render(<CryptoList />, document.querySelector("#root"));
