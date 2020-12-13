import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";
import Search from "./Search";
import Carousel from "./Carousel";
import Menu from "./Menu";

const Home = () => {
  const [productBySell, setProductBySell] = useState([]);
  const [productByArrival, setProductByArrival] = useState([]);
  const [error, setError] = useState(false);
  const loadProductBySell = () => {
    getProducts("sold").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductBySell(data);
      }
    });
  };
  const loadProductByArrival = () => {
    getProducts("createAt").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductByArrival(data);
      }
    });
  };
  useEffect(() => {
    loadProductByArrival();
    loadProductBySell();
  }, []);
  return (
    <div className="">
      <Menu />
      <div className="">
        <Carousel />
      </div>
      <div className="container mt-5">
        <img
          style={{ cursor: "pointer", marginBottom: "20px" }}
          src="https://cdn.tgdd.vn/2020/12/banner/1200-75-1200x75-2.png"
          alt="đt"
          width="1200"
          height="75"
        ></img>
        <Search />
        <h2 className="mb-4">Best Sellest</h2>
        <div className="row">
          {productBySell.map((product, i) => (
            <Card key={i} product={product} />
          ))}
        </div>

        <h2 className="mb-4">New Arrivals</h2>
        <div className="row">
          {productByArrival.map((product, i) => (
            <Card key={i} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
