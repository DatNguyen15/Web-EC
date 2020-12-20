import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import {
  getBraintreeClientToken,
  processPayment,
} from "../braintree/apiBraintree";
import DropIn from "braintree-web-drop-in-react";
import { emptyCart } from "./cartHelpers";
import { createOrder } from "./../core/apiCore";

const Checkout = ({ products }) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
    address: "",
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then((data) => {
      if (data.error) {
        setData({ ...data, error: data.error });
      } else {
        setData({ clientToken: data.clientToken });
      }
    });
  };

  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const handleAddress = (event) => {
    setData({ ...data, address: event.target.value });
  };

  let deliveryAddress = data.address;

  const buy = () => {
    setData({ loading: true });
    //send the nonce to your server
    // nonce = data.instance.requestPaymentMethod()

    let nonce;
    let getNonce = data.instance
      .requestPaymentMethod()
      .then((data) => {
        //console.log(data);
        nonce = data.nonce;
        //once you have nonce (card type, card number) send nonce as 'paymentMethodNonce'
        //and also total to be charged
        // console.log(
        //   "send nonce and total to process:",
        //   nonce,
        //   getTotal(products)
        // );
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(products),
        };

        processPayment(userId, token, paymentData)
          .then((response) => {
            //console.log(response)
            const createOrderData = {
              products: products,
              transaction_id: response.transaction.id,
              amount: response.transaction.amount,
              address: deliveryAddress,
            };
            createOrder(userId, token, createOrderData)
              .then((response) => {
                emptyCart(() => {
                  console.log("payment success end empty cart");
                  setData({ loading: false, success: true });
                });
              })
              .catch((error) => {
                console.log(error);
                setData({ loading: false });
              });
            //empty cart
            // setData({ ...data, success: response.success });

            //creat oder
          })
          .catch((error) => {
            console.log(error);
            setData({ loading: false });
          });
      })
      .catch((error) => {
        //console.log("dropin error:", error);
        setData({ ...data, error: error.message });
      });
  };

  const showCheckout = () => {
    return (
      <div>
        {isAuthenticated() ? (
          <div>{ShowDropIn()}</div>
        ) : (
          <Link to="/signin">
            <button className="btn btn-primary">Checkout</button>
          </Link>
        )}
      </div>
    );
  };

  const ShowDropIn = () => (
    <div onBlur={() => setData({ ...data, error: "" })}>
      {data.clientToken !== null && products.length > 0 ? (
        <div>
          <div className="form-group">
            <h5 className="text">Delivery address:</h5>
            <textarea
              onChange={handleAddress}
              className="form-control"
              //value={data.address}
              placeholder="Type your delivery address here..."
            />
          </div>
          <DropIn
            options={{
              authorization: data.clientToken,
              paypal: {
                flow: "vault",
              },
            }}
            onInstance={(instance) => (data.instance = instance)}
          />
          <button onClick={buy} className="btn btn-dark btn-block">
            Pay
          </button>
        </div>
      ) : null}
    </div>
  );

  const showError = (error) => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      <i className="fas fa-exclamation-circle"></i> {error}
    </div>
  );

  const showSuccess = (success) => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      <i class="fas fa-check-circle"></i> Thanks ! Your payment was successful!
    </div>
  );

  const showLoading = (loading) => loading && <h3>Loading...</h3>;
  return (
    <div className="center">
      <h3>Your cart summary:</h3>
      <h4 style={{ color: "red", fontWeight: "700" }}>Total: ${getTotal()}</h4>
      {showLoading(data.loading)}
      {showSuccess(data.success)}
      {showError(data.error)}
      {showCheckout()}
    </div>
  );
};
export default Checkout;
