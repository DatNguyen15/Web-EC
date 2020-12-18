import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getCategories } from "./../admin/apiAdmin";
import Checkbox from "./Checkbox";
import { prices } from "./fixedPrices";
import RadioBox from "./RadioBox";
import { getFilteredProducts } from "./apiCore";
import Footer from "./Footer";
import Carousel from "./Carousel";
import Menu from "./Menu";

const Shop = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });
  const [categories, setcategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);
  // load categories and set form data
  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setcategories(data);
      }
    });
  };
  const loadFilterdResults = (newFilters) => {
    //console.log(newFilters);
    getFilteredProducts(skip, limit, newFilters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults(data.data);
        setSize(data.size);
        setSkip(0);
      }
    });
  };

  const loadMore = () => {
    //console.log(newFilters);
    let toSkip = skip + limit;
    getFilteredProducts(toSkip, limit, myFilters.filters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults([...filteredResults, ...data.data]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };
  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className="btn btn-warning mb-5">
          Load more
        </button>
      )
    );
  };

  useEffect(() => {
    init();
    loadFilterdResults(skip, limit, myFilters.filters);
  }, []);
  const handleFilters = (filters, filterBy) => {
    // console.log("SHOP", filters, filterBy);
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    if (filterBy === "price") {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }
    loadFilterdResults(myFilters.filters);
    setMyFilters(newFilters);
  };

  const handlePrice = (value) => {
    const data = prices;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };

  return (
    <div>
      <Layout
        title="Shop Page"
        description="Search and find product of your choice"
        className=" "
      ></Layout>
      <Carousel />
      <div className="row mb-5">
        <div
          className="col-3"
          style={{
            border: "1px solid black",
            height: "500px",
            // paddingTop: "60px",
            background: "black",
            color: "white",
            //opacity: "0.8",
            borderRadius: "10px",
            boxShadow: "0px 0px 4px -1px #333",
          }}
        >
          <h3
            className="center"
            style={{
              background: "red",
              display: "block",
              color: "white",
              padding: "10 px",
            }}
          >
            FILTER
          </h3>
          <h4 className="center" style={{ color: "red", opacity: "0.8" }}>
            By Categories
          </h4>
          <ul className="ml-3">
            <Checkbox
              categories={categories}
              handleFilters={(filters) => handleFilters(filters, "category")}
            />
          </ul>

          <h4
            className="center"
            style={{ marginTop: "70px", color: "red", opacity: "0.8" }}
          >
            By Price Range
          </h4>
          <ul className="ml-3">
            <RadioBox
              prices={prices}
              handleFilters={(filters) => handleFilters(filters, "price")}
            />
          </ul>
        </div>

        <div className="col-9">
          <div
            style={{
              color: "whitesmoke",
              fontWeight: "400",
              border: "4px solid red",
              background: "red",
              padding: "4px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h3 className="">Product</h3>
            <i
              style={{ fontSize: "1.75rem", fontWeight: "600" }}
              className="far fa-angle-double-right"
            ></i>
          </div>
          <div className="row">
            {filteredResults.map((product, i) => (
              <Card key={i} product={product} />
            ))}
          </div>
          <hr />
          {loadMoreButton()}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Shop;
