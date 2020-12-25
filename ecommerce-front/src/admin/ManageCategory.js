import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "./../auth/index";
import { Link } from "react-router-dom";
import { getCategories, deleteCategory } from "./apiAdmin";

const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const { user, token } = isAuthenticated();
  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const destroy = (categoryId) => {
    deleteCategory(categoryId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadCategories();
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <Layout
      title="Manage Category"
      description="Perform CRUD categories"
      className="container"
    >
      <div className="row mt-5">
        <div className="col-8">
          <h2 className=" mb-4" style={{ color: "red", fontWeight: "600" }}>
            MANAGE CATEGORY
          </h2>
        </div>
        <div className="col-4 center">
          <Link to="/create/category">
            <button
              className="btn btn-success"
              style={{ fontWeight: "500", padding: "10px 40px" }}
            >
              <i class="fas fa-plus"></i> CATEGORY
            </button>
          </Link>
        </div>
      </div>
      <div className="row my-4">
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
              Name
            </li>
            {categories.map((c, i) => (
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <strong>{c.name}</strong>
                <div>
                  <Link to={`/admin/category/update/${c._id}`}>
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
                    onClick={() => destroy(c._id)}
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
        {/* {JSON.stringify(categories.length)} */}
      </div>
    </Layout>
  );
};
export default ManageCategory;
