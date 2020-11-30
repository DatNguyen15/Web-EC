import React from "react";
import { API } from "./../config";

const ShowImage = ({ item, url }) => (
  <div className="product-img">
    <div class="img-hover" style={{ width: "300px", height: "300px" }}>
      <img
        src={`${API}/${url}/photo/${item._id}`}
        alt={item.name}
        className="mb-3"
        style={{ maxHeight: "100%", maxWidth: "100%" }}
      ></img>
    </div>
  </div>
);
export default ShowImage;
