import React from "react";
import { Link } from "react-router-dom";
import ShowImage from "./ShowImage";
import "../dist/css/reset.css";
import "../dist/css/cardproduct.css";
import "@fortawesome/fontawesome-free/css/all.css";
const Card = ({ product }) => {
  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock</span>
    ) : (
      <span className="badge badge-primary badge-pill">Out of Stock</span>
    );
  };
  return (
    <div className="col-sm-6 col-lg-4 ">
      <div className="card mb-4">
        <div className="card-header name-product">{product.name}</div>
        <div className="card-body">
          {/* <span></span> */}
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
          <Link to={`/product/${product._id}`}>
            <div class="button-card">
              <button className="btns1 btn">View Product</button>
              <button className="btns2 btn">Add To Card</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Card;
