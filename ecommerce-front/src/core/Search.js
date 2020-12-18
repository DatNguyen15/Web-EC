import React, { useState, useEffect } from "react";
import { getCategories, list } from "./apiCore";
import Card from "./Card";
import "../dist/css/search.css";

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false,
  });

  const { categories, category, search, results, searched } = data;

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const searchData = () => {
    if (search) {
      list({ search: search || undefined, category: category }).then(
        (response) => {
          if (response.error) {
            console.log(response.error);
          } else {
            setData({ ...data, results: response, searched: true });
          }
        }
      );
    }
  };
  const searchSubmit = (e) => {
    e.preventDefault();
    searchData();
  };

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };
  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return (
        <h5
          className="mt-4 mb-4 "
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "100",
          }}
        >
          <i
            className="far fa-filter"
            style={{ fontWeight: "700", marginRight: "10px" }}
          >
            :
          </i>

          <span style={{ color: "#1db954" }} style={{ fontSize: "15px" }}>
            {results.length} products.{" "}
          </span>
          <i style={{ color: "#1db954" }} className="fas fa-check"></i>
        </h5>
      );
    }
    if (searched && results.length < 1) {
      return (
        <h5
          className="mt-4 mb-4"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "100",
          }}
        >
          <i
            className="far fa-filter"
            style={{ fontWeight: "700", marginRight: "10px" }}
          >
            :
          </i>
          <span style={{ color: " #d8000c" }} style={{ fontSize: "15px" }}>
            Not Found.
          </span>
          <i style={{ color: " #d8000c" }} className="fas fa-times"></i>
        </h5>
      );
    }
  };

  const searchProducts = (results = []) => {
    return (
      <div>
        {searchMessage(searched, results)}
        <div className="row">
          {results.map((product, i) => (
            <Card key={i} product={product} />
          ))}
        </div>
      </div>
    );
  };

  const searchForm = () => (
    <form className="form-ml" onSubmit={searchSubmit}>
      <span className="input-group-text bg-black">
        <div className="input-group input-group-lg">
          <div className="input-group-prepend">
            <select
              className="category-dropdown mr-3"
              onChange={handleChange("category")}
            >
              <option value="All">Pick Category</option>
              {categories.map((c, i) => (
                <option key={i} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <input
            type="search"
            className="form-control"
            onChange={handleChange("search")}
            placeholder="Search by name"
            style={{ fontWeight: "200", fontSize: "18px" }}
          />
        </div>
        <div className="btn input-group-append ml-3" style={{ border: "none" }}>
          <button className="input-group-text btn-bg">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </span>
    </form>
  );
  return (
    <div className="row">
      <div className="container mb-3 center">{searchForm()}</div>
      <div className="container-fluid mb-3">{searchProducts(results)}</div>
    </div>
  );
};
export default Search;
