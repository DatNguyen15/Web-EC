import React, { useEffect, useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "./../auth/index";
import { Link, Redirect } from "react-router-dom";
import { getProduct, getCategories, updateProduct } from "./apiAdmin";

const UpdateProduct = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    loading: false,
    error: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: "",
  });
  const { user, token } = isAuthenticated();
  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    loading,
    error,
    createProduct,
    redirectToProfile,
    formData,
  } = values;

  const init = (productId) => {
    getProduct(productId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category._id,
          shipping: data.shipping,
          quantity: data.quantity,
          formData: new FormData(),
        });
        //populate the state
        //load categories
        initCategories();
      }
    });
  };
  // load categories and set form data
  const initCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ categories: data, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    init(match.params.productId);
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    updateProduct(match.params.productId, user._id, token, formData).then(
      (data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            photo: "",
            price: "",
            quantity: "",
            loading: false,
            error: false,
            redirectToProfile: true,
            createProduct: data.name,
          });
        }
      }
    );
  };

  const newPostForm = () => (
    <form className="my-3" onSubmit={clickSubmit}>
      <h4>Post Photo</h4>
      <div className="form-group">
        <label className="btn btn-secondary">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image/*"
          />
        </label>
      </div>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          value={name}
          autoFocus
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Description</label>
        <input
          onChange={handleChange("description")}
          className="form-control"
          value={description}
          autoFocus
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Price</label>
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          value={price}
          autoFocus
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Category</label>
        <select onChange={handleChange("category")} className="form-control">
          <option style={{ color: "black" }}>Please select</option>
          {categories &&
            categories.map((c, i) => (
              <option key={i} value={c._id} style={{ color: "black" }}>
                {c.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <label className="text-muted">Shipping</label>
        <select onChange={handleChange("shipping")} className="form-control">
          <option style={{ color: "black" }}>Please select</option>
          <option value="0" style={{ color: "black" }}>
            No
          </option>
          <option value="1" style={{ color: "black" }}>
            Yes
          </option>
        </select>
      </div>
      <div className="form-group">
        <label className="text-muted">Quantity</label>
        <input
          onChange={handleChange("quantity")}
          type="number"
          className="form-control"
          value={quantity}
        />
      </div>
      <div className="" style={{ textAlign: "center" }}>
        <button className="btn btn-outline-primary">Update Product</button>
      </div>
    </form>
  );
  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );
  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: createProduct ? "" : "none" }}
    >
      <h2>{`${createProduct} is created!`}</h2>
    </div>
  );
  const showLoading = () =>
    loading && (
      <div className="alert alert-success">
        <h2>Loading...</h2>
      </div>
    );
  const redirectUser = () => {
    if (redirectToProfile) {
      if (!error) {
        return <Redirect to="/admin/products" />;
      }
    }
  };
  return (
    <Layout
      title="Update Product"
      description={`Hello ${user.name}, ready to update product?`}
      className=" container"
    >
      <div className="row ">
        <div className="col-md-8 offset-md-2">
          {showLoading()}
          {showSuccess()}
          {showError()}
          {newPostForm()}
          {redirectUser()}
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
