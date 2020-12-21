import React, { useEffect, useState } from "react";
import { getCart, updateItem } from "./cartHelpers";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import FormCart from "./FormCart";
import Checkout from "./Checkout";
import "../dist/css/cart.css";
import Footer from "../core/Footer";
const Cart = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getCart());
  }, [items]);

  const showItems = (items) => {
    return (
      <div>
        <div className="center">
          <h3>
            <i style={{ color: "#1db954" }} className="fas fa-cart-plus"></i>:
            <span style={{ fontSize: "22px" }}>{`${items.length}`} items</span>
          </h3>
        </div>
        <hr />
        <div className="">
          <div className="">
            <table className="table">
              <thead style={{ background: "black", color: "whitesmoke" }}>
                <tr>
                  <th></th>
                  <th>Name:</th>
                  <th>Price: </th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th>Picture:</th>
                  <th>Quantity:</th>
                  <th>Total:</th>
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
                  <td colSpan="12"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };
  const noItemsMessage = () => (
    <h3>
      Your cart is empty. <br />
      <Link to="/shop">Continue Shopping</Link>
    </h3>
  );

  return (
    <div>
      <Layout
        title="Shop Cart"
        description="Manage your cart items. Add remove checkout or continue shopping."
        className=" container mb-3"
      >
        <div className="row mt-3">
          <div className="col-8">
            {items.length > 0 ? showItems(items) : noItemsMessage()}
          </div>
          <div className="col-4 ">
            <Checkout products={items} />
          </div>
        </div>
      </Layout>
      <Footer />
    </div>
  );
};
export default Cart;
