import React from "react";
import Layout from "./../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();
  const adminLinks = () => {
    return (
      <div className="card">
        <h4
          className="card-header"
          style={{ background: "#333", color: "white" }}
        >
          Admin Links
        </h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/create/category">
              Create Category
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/create/product">
              Create Product
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/admin/orders">
              View Orders
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/admin/products">
              Manage Product
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/admin/categories">
              Manage Category
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/admin/users">
              Manage User
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminInfo = () => {
    return (
      <div className="card mb-5">
        <h3
          className="card-header"
          style={{ background: "#333", color: "white" }}
        >
          User Information
        </h3>
        <ul className="list-group">
          <li className="list-group-item">
            Name:<span className="pl-3">{name}</span>
          </li>
          <li className="list-group-item">
            Email:<span className="pl-3">{email}</span>
          </li>
          <li className="list-group-item">
            Role:
            <span className="pl-3">
              {role === 1 ? "Admin" : "Registered User"}
            </span>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Layout
      title="Dashboard"
      description={`Hello ${name}.`}
      className="container"
    >
      <div className="row my-4">
        <div className="col-3">{adminLinks()}</div>
        <div className="col-9">{adminInfo()}</div>
      </div>
    </Layout>
  );
};
export default AdminDashboard;
