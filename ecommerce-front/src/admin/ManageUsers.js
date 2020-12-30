import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "./../auth/index";
import { Link } from "react-router-dom";
import { getUsers, updateAcitve } from "./apiAdmin";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [values, setActive] = useState({ isActive: true });

  const { user, token } = isAuthenticated();
  console.log(user);
  const loadUsers = () => {
    getUsers().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setUsers(data);
      }
    });
  };

  const updateActives = (userId) => {
    const isActive = !user.isActive;
    updateAcitve(userId, token, isActive).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setActive({ ...values, isActive: false });
        loadUsers();
      }
    });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <Layout
      title="Manage User"
      description="Block or Active User"
      className="container"
    >
      <div className="row mt-5">
        <div className="col">
          <h2 className=" mb-4" style={{ color: "red", fontWeight: "600" }}>
            MANAGE USER
          </h2>
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
            {users.map((c, i) => (
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <strong>{c.name}</strong>
                <div>
                  <span
                    onClick={() => updateActives(c._id)}
                    className="pl-3"
                    style={{ cursor: "pointer" }}
                  >
                    {c.isActive === false ? (
                      <button className="btn btn-danger">
                        <i className="fas fa-lock"></i>
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary"
                        // style={{ color: "red" }}
                      >
                        <i className="fas fa-unlock-alt"></i>
                      </button>
                    )}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* {JSON.stringify(users)} */}
      </div>
    </Layout>
  );
};
export default ManageUsers;
