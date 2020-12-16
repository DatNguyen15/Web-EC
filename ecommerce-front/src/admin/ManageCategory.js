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
      title="Manage Products"
      description="Perform CRUD products"
      className="container"
    >
      <div className="row">
        <div className="col-12">
          <ul className="list-group">
            {categories.map((c, i) => (
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <strong>{c.name}</strong>
                <div>
                  <Link to={`/admin/category/update/${c._id}`}>
                    <span className="badge badge-warning badge-pill">
                      Update
                    </span>
                  </Link>
                  <span
                    onClick={() => destroy(c._id)}
                    className="badge badge-danger badge-pill"
                  >
                    Delete
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {JSON.stringify(categories.length)}
      </div>
    </Layout>
  );
};
export default ManageCategory;
