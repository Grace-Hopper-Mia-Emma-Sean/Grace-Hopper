import { AddShoppingCartIcon, Button } from "../MUI";
import { createCartItem } from "../../api";
import { useState, useEffect } from "react";

export function CreateCartItem({ product }) {
  const quantity = 1;
  const userId = JSON.parse(localStorage.getItem("id"));

  const addItem = async () => {
    const item = {
      id: product.id,
      user_id: null,
      name: product.name,
      quantity: quantity,
      price: product.price,
      total: quantity * product.price,
    };
    const guest = ({ fields }) => {
      fields = item;
      const oldItems = JSON.parse(localStorage.getItem("cart")) || [];
      oldItems.push(fields);
      localStorage.setItem("cart", JSON.stringify(oldItems));
    };
    const user = async () => {
      await createCartItem(product.id, quantity, userId)
        .then(() => {
          console.log(product.id, quantity, userId);
        })
        .catch((error) => console.log(error));
      // .finally(localStorage.removeItem("cart"));
    };
    !userId ? guest({ item }) : user();
  };

  return (
    <div>
      <Button variant="contained" onClick={addItem}>
        Add to Cart
      </Button>
    </div>
  );
}
