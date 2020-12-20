import React, { useState, useEffect } from "react";
import Layout from "./../core/Layout";
import { isAuthenticated } from "../auth";
import { Link, Redirect } from "react-router-dom";
import { read, update, updateUser } from "./apiUser";

const Profile = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });
  const { token } = isAuthenticated();
  const { name, email, password, error, success } = values;

  const init = (userId) => {
    //console.log(userId);
    read(userId, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: true });
      } else {
        setValues({
          ...values,
          name: data.name,
          email: data.email,
          // password: data.password,
        });
      }
    });
  };

  useEffect(() => {
    init(match.params.userId);
  }, []);

  const handelChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    update(match.params.userId, token, { name, email, password }).then(
      (data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          updateUser(data, () => {
            setValues({
              ...values,
              name: data.name,
              email: data.email,
              success: true,
            });
          });
        }
      }
    );
  };

  const redirectUser = (success) => {
    if (success) {
      return <Redirect to="/user/dashboard" />;
    }
  };
  const profileUpdate = (name, email, password) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          onChange={handelChange("name")}
          className="form-control"
          value={name}
        ></input>
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          type="email"
          onChange={handelChange("email")}
          className="form-control"
          value={email}
        ></input>
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          type="password"
          onChange={handelChange("password")}
          className="form-control"
          value={password}
        ></input>
        <div className="mt-4 center">
          <button onClick={clickSubmit} className="btn btn-primary">
            Update Profile
          </button>
        </div>
      </div>
    </form>
  );
  return (
    <Layout
      title="Profile"
      description="Update your profile"
      className=" container "
    >
      <div className="row my-5">
        <div className="col-4"></div>
        <div
          className="col-4"
          style={{
            boxShadow: "0px 0px 4px -1px #333",
          }}
        >
          <h2 className="my-4 center">Profile Update</h2>
          {profileUpdate(name, email, password)}
          {redirectUser(success)}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
