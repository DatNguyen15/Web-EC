import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "./../auth/index";
import { Link } from "react-router-dom";
import { updateCategory, getCategory } from "./apiAdmin";

const UpdateCategory = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    error: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: "",
  });
  const { user, token } = isAuthenticated();
  const { name, error, createProduct, redirectToProfile, formData } = values;

  const init = (categoryId) => {
    getCategory(categoryId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
        });
      }
    });
  };
  // load categories and set form data

  useEffect(() => {
    init(match.params.categoryId);
  }, []);

  const handleChange = (e) => {
    setValues({ ...values, name: e.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "" });
    updateCategory(match.params.categoryId, user._id, token, { name }).then(
      (data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: "",
            error: false,
            redirectToProfile: true,
            createProduct: data.name,
          });
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
          onChange={handleChange}
          value={name}
          autoFocus
          required
        />
      </div>
      <button className="btn btn-outline-primary">Update Category</button>
    </form>
  );
  //   const showSuccess = () => {
  //     if (success) {
  //       // return <h3 className="text-success">{name} is created</h3>;
  //       return alert(`${name} is created.`);
  //     }
  //   };
  const showError = () => {
    if (error) {
      return <h3 className="text-danger">Category show be unique</h3>;
    }
  };
  const goBack = () => (
    <div className="mt-5">
      <Link style={{ color: "red" }} to="/admin/dashboard">
        Back to Dashboard
      </Link>
    </div>
  );
  return (
    <Layout
      title="Add a new category"
      description={`Hello ${user.name}, ready to add a new category?`}
      className="container"
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {/* {showSuccess()} */}
          {showError()}
          {newCategoryFom()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
};
export default UpdateCategory;
