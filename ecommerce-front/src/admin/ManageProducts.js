import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "./../auth/index";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "./apiAdmin";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const { user, token } = isAuthenticated();
  const loadProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  const destroy = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadProducts();
      }
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Layout
      title="Manage Products"
      description="Perform CRUD products"
      className="container"
    >
      <div className="row mt-5">
        <div className="col-8">
          <h2 className=" mb-4" style={{ color: "red", fontWeight: "600" }}>
            MANAGE PRODUCTS
          </h2>
        </div>
        <div className="col-4 center">
          <Link to="/create/product">
            <button
              className="btn btn-success"
              style={{ fontWeight: "500", padding: "10px 40px" }}
            >
              <i class="fas fa-plus"></i> PRODUCT
            </button>
          </Link>
        </div>
      </div>
      <div className="row my-3">
        <div className="col-12">
          <ul className="list-group">
            <li
              className="list-group-item"
              style={{
                background: "black",
                color: "whitesmoke",
                fontSize: "23px",
                fontWeight: "600",
              }}
            >
              <span>Name</span>
              <span style={{ paddingLeft: "600px" }}>Quantity</span>
            </li>
            {products.map((p, i) => (
              <li className="list-group-item d-flex justify-content-between align-items-center">
                {p.quantity > 0 ? (
                  <strong>{p.name}</strong>
                ) : (
                  <strong style={{ color: "red" }}>{p.name}</strong>
                )}
                <div>
                  <strong style={{ marginRight: "300px" }}>{p.quantity}</strong>
                  <Link to={`/admin/product/update/${p._id}`}>
                    <span className="">
                      <i
                        style={{
                          background: "white",
                          padding: "4px",
                          color: "#007bff",
                        }}
                        class="far fa-edit"
                      ></i>
                    </span>
                  </Link>
                  <span
                    onClick={() => destroy(p._id)}
                    className="pl-3"
                    style={{ cursor: "pointer" }}
                  >
                    <i
                      style={{
                        background: "red",
                        padding: "4px",
                        color: "whitesmoke",
                      }}
                      class="far fa-trash-alt"
                    ></i>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* {JSON.stringify(products.length)} */}
      </div>
    </Layout>
  );
};
export default ManageProducts;
