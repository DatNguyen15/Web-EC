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
            style={{
              width: "40%",
              pading: "5px",
              borderRadius: "3px",
              marginLeft: "10px",
            }}
            placeholder="1"
            type="number"
            //value={count}
            min="1"
            max={product.quantity}
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

      <td style={{ color: "red", fontWeight: "800" }}>{product.price} $</td>
      <td></td>
      <td></td>
      <td></td>
      <td className="size">
        <ShowImage item={product} url="product" />
      </td>
      <td>{showCartUpdateOption(cartUpdate)}</td>
      <td style={{ color: "red", fontWeight: "800" }}>
        {product.price * product.count} $
      </td>
    </tr>
  );
};
export default FormCart;
