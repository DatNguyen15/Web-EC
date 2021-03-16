import React, { useState, useEffect } from "react";
import Layout from "./../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getPurchaseHistory } from "./apiUser";
import { moment } from "moment";

const Dashboard = () => {
  const [history, setHistory] = useState([]);
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();
  const token = isAuthenticated().token;
  const init = (userId, token) => {
    getPurchaseHistory(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setHistory(data);
      }
    });
  };

  useEffect(() => {
    init(_id, token);
  }, []);

  const userLinks = () => {
    return (
      <div className="card">
        <h4
          className="card-header"
          style={{ background: "#333", color: "white" }}
        >
          User Links
        </h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/cart">
              My Cart
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to={`/profile/${_id}`}>
              Update Profile
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const userInfo = () => {
    return (
      <div className="card mb-5">
        <h3
          className="card-header"
          style={{ background: "#333", color: "white" }}
        >
          User Information
        </h3>
        <ul className="list-group">
          <li className="list-group-item">Name: {name}</li>
          <li className="list-group-item">Email: {email}</li>
          <li className="list-group-item">
            Role: {role === 1 ? "Admin" : "Registered User"}
          </li>
        </ul>
      </div>
    );
  };
  const purchaseHistory = (history) => {
    return (
      <div className="card mb-5">
        <h3
          className="card-header"
          style={{ background: "#333", color: "white" }}
        >
          Purchare history
        </h3>
        <ul className="list-group">
          <li className="list-group-item">
            {history.map((h, i) => {
              return (
                <div>
                  <hr />
                  <h2 className="center list-group">Status: {h.status}</h2>
                  {h.products.map((p, i) => {
                    return (
                      <ul key={i}>
                        <li className=" list-group-item">
                          Product name: {p.name}
                        </li>
                        <li className="list-group-item">
                          Product price: {p.price}
                        </li>
                        <li className="list-group-item">
                          Product count: {p.count}
                        </li>
                        <li className="list-group-item">
                          Purchase date: {Date(p.createdAt)}
                        </li>
                      </ul>
                    );
                  })}
                </div>
              );
            })}
          </li>
        </ul>
        {/* {JSON.stringify(history)} */}
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
        <div className="col-3">{userLinks()}</div>
        <div className="col-9">
          {userInfo()}
          {purchaseHistory(history)}
        </div>
      </div>
    </Layout>
  );
};
export default Dashboard;
