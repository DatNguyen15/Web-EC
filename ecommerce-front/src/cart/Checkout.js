import React, { useEffect, useState } from "react";

const Checkout = ({ products }) => {
  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  return <td style={{ color: "red", fontWeight: "700" }}>${getTotal()}</td>;
};
export default Checkout;
