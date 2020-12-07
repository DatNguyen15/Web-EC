import React, { useEffect, useState } from "react";
import { getCart } from "./cartHelpers";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import FormCart from "./FormCart";
import Checkout from "./Checkout";
import LoginCheckout from "./LoginCheckout";
import "../dist/css/cart.css";
const Cart = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getCart());
  }, [items]);

  const showItems = (items) => {
    return (
      <div>
        <h2>Your cart has {`${items.length}`} items</h2>
        <hr />
        <div className="row">
          <div className="col-md-12">
            <table className="table">
              <thead style={{ background: "black", color: "whitesmoke" }}>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Price</th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th>Picture</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {items.map((product, i) => (
                  <FormCart
                    key={i}
                    product={product}
                    cartUpdate={true}
                    showRemomeProduct={true}
                  />
                ))}
                <tr>
                  <td colSpan="7"></td>
                  <td>Total Carts</td>
                  <Checkout products={items} />
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <LoginCheckout />
      </div>
    );
  };
  const noItemsMessage = () => (
    <h2>
      Your cart is empty. <br />
      <Link to="/shop">Continue Shopping</Link>
    </h2>
  );

  return (
    <Layout
      title="Shop Cart"
      description="Manage your cart items. Add remove checkout or continue shopping."
      className=" container "
    >
      {items.length > 0 ? showItems(items) : noItemsMessage()}
    </Layout>
  );
};
export default Cart;