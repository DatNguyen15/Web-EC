import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "./../auth/index";
import { Link } from "react-router-dom";
import { getCategory, updateCategory } from "./apiAdmin";

const UpdateCategory = ({ match }) => {
  const [values, setName] = useState({ name: "" });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  //destructure user and token from localStorage
  const { user, token } = isAuthenticated();
  const { name } = values;
  const init = (categoryId) => {
    getCategory(categoryId).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setName({
          ...values,
          name: data.name,
        });
      }
    });
  };

  useEffect(() => {
    init(match.params.categoryId);
  }, []);
  const handleChanges = (e) => {
    const name = e.target.value;
    setName({ name });
  };
  const clickSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    //make request to api to create category
    updateCategory(match.params.categoryId, user._id, token, { name }).then(
      (data) => {
        if (data.error) {
          setError(true);
        } else {
          setError("");
          setSuccess(true);
          setName({ ...values, name: data.name });
        }
      }
    );
  };

  const newCategoryFom = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChanges}
          value={name}
          autoFocus
          required
        />
      </div>
      <div className="center">
        <button className="btn btn-outline-primary">Update Category</button>
      </div>
    </form>
  );
  const showSuccess = () => {
    if (success) {
      return <h3 className="text-success">{name} is updated</h3>;
      // return alert(`${name} is created.`);
    }
  };
  const showError = () => {
    if (error) {
      return <h3 className="text-danger">Category show be unique</h3>;
    }
  };
  const goBack = () => (
    <div className="mt-5">
      <Link style={{ color: "red" }} to="/admin/dashboard">
        <i
          style={{ fontSize: "1rem", fontWeight: "600" }}
          className="far fa-angle-double-left mr-1"
        ></i>
        Back to Dashboard
      </Link>
    </div>
  );
  return (
    <Layout
      title="Update a category"
      description={`Hello ${user.name}, ready to update a category?`}
      className="container"
    >
      <div className="row my-4">
        <div className="col-md-8 offset-md-2">
          {showSuccess()}
          {showError()}
          {newCategoryFom()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
};
export default UpdateCategory;
