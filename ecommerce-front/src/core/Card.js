import React from "react";
import { Link } from "react-router-dom";
import ShowImage from "./ShowImage";
import "../dist/css/reset.css";
import "../dist/css/cardproduct.css";
import "@fortawesome/fontawesome-free/css/all.css";
const Card = ({ product }) => {
  return (
    <div className="col-sm-2 col-md-4 mb-3">
      <div className="card">
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
          <Link to="/">
            <div class="button-card">
              <button className="btns1">View Product</button>
              <button className="btns2">Add to card</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Card;
