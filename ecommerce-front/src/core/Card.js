import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import "../dist/css/reset.css";
import "../dist/css/cardproduct.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { addItem } from "./../cart/cartHelpers";

const Card = ({ product }) => {
  const [redirect, setRedirect] = useState(false);
  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock</span>
    ) : (
      <span className="badge badge-primary badge-pill">Out of Stock</span>
    );
  };

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };
  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/" />;
    }
  };
  return (
    <div className="col-sm-6 col-lg-4 ">
      <div className="card mb-4">
        <div className="card-header name-product">{product.name}</div>
        <div className="card-body">
          {shouldRedirect(redirect)}
          <div className="hide-img">
            <ShowImage item={product} url="product" />
          </div>
          <div className="desc"></div>
          <p className="pt-3">Description: {product.description}</p>
          <p>
            Price: {product.price}$<i className="fas fa-star"></i>
          </p>
          {showStock(product.quantity)}
          <br />

          <div class="button-card">
            <Link to={`product/${product._id}`}>
              <button className="btns1 btn">View Product</button>
            </Link>

            <button href="/cart" onClick={addToCart} className="btns2 btn">
              Add to card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Card;
