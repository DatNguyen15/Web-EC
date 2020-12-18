import React, { useState } from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";

import { signup } from "./../auth/index";
import "../dist/css/register.css";
import Menu from "../core/Menu";
import Footer from "../core/Footer";
const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });
  const { name, email, password, success, error } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  // const signup = (user) =>{
  //     return fetch(`${API}/signup`, {
  //         method:"POST",
  //         headers: {
  //             Accept:'application/json',
  //             "Content-Type":"application/json"
  //         },
  //         body: JSON.stringify(user)
  //     })
  //     .then(response=>{
  //         return response.json()
  //     })
  //     .catch(err =>{
  //         console.log(err)
  //     })
  // };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          success: true,
        });
      }
    });
  };

  const signUpForm = () => (
    <div className="contents ">
      {/* <form>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            onChange={handleChange("name")}
            type="text"
            className="form-control"
            value={name}
          />
        </div>

        <div className="form-group">
          <label className="text-muted">Email</label>
          <input
            onChange={handleChange("email")}
            type="email"
            className="form-control"
            value={email}
          />
        </div>

        <div className="form-group">
          <label className="text-muted">Password</label>
          <input
            onChange={handleChange("password")}
            type="password"
            className="form-control"
            value={password}
          />
        </div>
        <button onClick={clickSubmit} className="btn btn-primary">
          Submit
        </button>
      </form> */}
      <form action>
        <h2 className="center">Create Account</h2>
        <h2 className="center">
          <i className="fas fa-user-circle" />
        </h2>
        <div className="main-field">
          <span>
            <i className="far fa-user" />
          </span>
          <input
            onChange={handleChange("name")}
            type="text"
            placeholder="Username"
            value={name}
          />
        </div>
        <div className="main-field ">
          <span>
            <i className="far fa-envelope" />
          </span>
          <input
            onChange={handleChange("email")}
            type="email"
            placeholder="Email"
            value={email}
          />
        </div>
        <div className="main-field password">
          <span>
            <i className="fas fa-unlock-alt"></i>
          </span>
          <input
            onChange={handleChange("password")}
            type="password"
            placeholder="Password"
            value={password}
          />
        </div>
        <div className="flexs j-between a-center">
          <div className="conditions">
            <input id="check" type="checkbox" />
            <label htmlFor="check">Remember me</label>
          </div>
          <button onClick={clickSubmit}>Signup</button>
        </div>
        <div className="or">
          <span>Or</span>
        </div>
        <div className="sosial">
          <a href>
            <i className="fab fa-facebook-f" />
          </a>
          <a href>
            <i className="fab fa-google-plus-g" />
          </a>
        </div>
        <div className="line" />
        <div className="footers" style={{ padding: "10px 0px" }}>
          <p className="signup">
            Already a member?{" "}
            <a href="/signin" className="signuplink">
              Login
            </a>
          </p>
        </div>
      </form>
    </div>
  );
  const showError = () => (
    <div
      className="alert alert-danger error"
      style={{ display: error ? "" : "none" }}
    >
      <i className="fa fa-times-circle" style={{ marginRight: "5px" }}></i>{" "}
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info loading"
      style={{ display: success ? "" : "none" }}
    >
      <i className="fas fa-check"></i> New account is created. Pleased{" "}
      <Link to="/signin">Signin</Link> !!!
    </div>
  );
  return (
    <div className="mains">
      <Menu />
      <div className=" container">
        <div className="row">
          <div className="col center w-error">
            {showError()}
            {showSuccess()}
          </div>
        </div>
        <div className="row">
          <div className="col-12 t-center">{signUpForm()}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
