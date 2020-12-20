import React, { useState } from "react";

import { Link, Redirect } from "react-router-dom";
import Footer from "../core/Footer";
import Menu from "../core/Menu";
import "../dist/css/login.css";
import { signin, authenticate, isAuthenticated } from "./../auth/index";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });
  const { email, password, loading, error, redirectToReferrer } = values;
  const { user } = isAuthenticated();
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true,
          });
        });
      }
    });
  };

  const signInForm = () => (
    <div className="">
      {/* <form>
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
      <form className="loginf">
        <div className="head mb-5">
          <h3>
            Sign In <i class="fas fa-user-circle"></i>
          </h3>
        </div>

        <div className="form-group mb-4">
          <label>Email:</label>

          <input
            placeholder="Enter email"
            onChange={handleChange("email")}
            type="email"
            className="form-control"
            value={email}
          />
        </div>

        <div className="form-group mb-5">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            onChange={handleChange("password")}
            placeholder="Enter password"
            value={password}
          />
        </div>

        <div className="form-group">
          <div className="custom-control custom-checkbox  conditions">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>

        <button
          onClick={clickSubmit}
          type="submit"
          className=" btn-block hover-btn"
        >
          Login
        </button>
        <div className="copy-right text-center">
          <p>© 2020 Invent Signup. All rights reserved | Design by DatNguyen</p>
          <a href="/" target="_blank">
            HDShop
          </a>
        </div>
      </form>
    </div>
  );
  const showError = () => (
    <div className="error" style={{ display: error ? "" : "none" }}>
      <i className="fa fa-times-circle"></i>
      {error}
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="loading">
        <h5>Loading...</h5>
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };
  return (
    <div>
      <Menu />
      <div className="row">
        <div className="col-8">
          <div className="content">
            <div className="main-content">
              <h2>WELLCOME TO ZAZOU</h2>
              <p>
                HDShop is the best choose for you. Please login for order
                product. If you don't have account. Press the button REGISTER
                for create new account!!!
              </p>

              <Link to="/signup">
                <button href="/signup" className="res">
                  Register
                  <i
                    style={{ fontSize: "25px", paddingLeft: "10px" }}
                    class="fas fa-paper-plane"
                  ></i>
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-4 ">
          <div className="infor">
            {showLoading()}
            {showError()}
          </div>
          <div className="login">
            {signInForm()}
            {redirectUser()}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signin;
