import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../auth/index";
import { itemTotal } from "../cart/cartHelpers";
import "../dist/css/subcart.css";
const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#1db954" };
  } else {
    return { color: "whitesmoke" };
  }
};

const Menu = ({ history }) => (
  <div className="" style={{ background: "black", padding: "10px" }}>
    <ul className="nav container  ">
      <li className="nav-item">
        <Link className="nav-link" style={isActive(history, "/")} to="/">
          <h2>HDSHOP</h2>
        </Link>
      </li>
      {/* <li className="nav-item">
        <Link className="nav-link" style={isActive(history, "/")} to="/">
          Home
        </Link>
      </li> */}

      <li
        className="nav-item "
        style={{ display: "flex", alignItems: "center" }}
      >
        <Link
          className="nav-link"
          style={isActive(history, "/shop")}
          to="/shop"
        >
          Shop
        </Link>
      </li>

      {isAuthenticated() && isAuthenticated().user.role === 0 && (
        <li
          className="nav-item"
          style={{ display: "flex", alignItems: "center" }}
        >
          <Link
            className="nav-link"
            style={isActive(history, "/user/dashboard")}
            to="/user/dashboard"
          >
            Dashboard
          </Link>
        </li>
      )}
      {isAuthenticated() && isAuthenticated().user.role === 1 && (
        <li
          className="nav-item"
          style={{ display: "flex", alignItems: "center" }}
        >
          <Link
            className="nav-link"
            style={isActive(history, "/admin/dashboard")}
            to="/admin/dashboard"
          >
            Dashboard
          </Link>
        </li>
      )}

      {!isAuthenticated() && (
        <Fragment>
          <li
            className="nav-item"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Link
              className="nav-link"
              style={isActive(history, "/signin")}
              to="/signin"
            >
              Signin
            </Link>
          </li>
          <li
            className="nav-item"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Link
              className="nav-link"
              style={isActive(history, "/signup")}
              to="/signup"
            >
              Signup
            </Link>
          </li>
        </Fragment>
      )}
      {isAuthenticated() && (
        <li
          className="nav-item"
          style={{ display: "flex", alignItems: "center" }}
        >
          <span
            className="nav-link"
            style={{ cursor: "pointer", color: "#ffffff" }}
            onClick={() =>
              signout(() => {
                history.push("/");
              })
            }
          >
            Signout
          </span>
        </li>
      )}
      <li
        className="nav-item"
        style={{ display: "flex", alignItems: "center" }}
      >
        <Link
          className="nav-link"
          style={isActive(history, "/cart")}
          to="/cart"
        >
          <i class="fas fa-shopping-cart"></i>
          <sup>
            <small className="badge">{itemTotal()}</small>
          </sup>
        </Link>
      </li>
    </ul>
  </div>
);
export default withRouter(Menu);
