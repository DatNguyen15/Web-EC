import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

const LoginCheckout = () => {
  return (
    <div>
      {isAuthenticated() ? (
        <button className="btn btn-success">Checkout</button>
      ) : (
        <Link to="/signin">
          <button className="btn btn-primary">Checkout</button>
        </Link>
      )}
    </div>
  );
};

export default LoginCheckout;
