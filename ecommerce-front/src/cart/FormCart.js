import React, { useState } from "react";
import ShowImage from "../core/ShowImage";
import "@fortawesome/fontawesome-free/css/all.css";
import { updateItem, removeItem } from "./cartHelpers";

const FormCart = ({
  product,
  cartUpdate = false,
  showRemomeProduct = false,
}) => {
  const [count, setCount] = useState(product.count);

  const handleChange = (productId) => (event) => {
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };
  const showCartUpdateOption = (cartUpdate) => {
    return (
      cartUpdate && (
        <div>
          <input
            style={{ width: "20%", pading: "3px", borderRadius: "3px" }}
            type="number"
            value={count}
            onChange={handleChange(product._id)}
          />
        </div>
      )
    );
  };
  const showRemove = (showRemomeProduct) => {
    return (
      showRemomeProduct && (
        <td>
          <button onClick={() => removeItem(product._id)}>
            <i
              style={{ background: "red", padding: "4px", color: "whitesmoke" }}
              class="far fa-trash-alt"
            ></i>
          </button>
        </td>
      )
    );
  };
  return (
    <tr>
      {showRemove(showRemomeProduct)}

      <td>{product.name}</td>

      <td>{product.price} $</td>
      <td></td>
      <td></td>
      <td></td>
      <td>
        <ShowImage item={product} url="product" />
      </td>
      <td>{showCartUpdateOption(cartUpdate)}</td>
      <td>{product.price * product.count} $</td>
    </tr>
  );
};
export default FormCart;
