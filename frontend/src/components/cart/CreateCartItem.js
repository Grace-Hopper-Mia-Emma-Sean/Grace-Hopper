import { AddShoppingCartIcon, Button } from "../MUI";
import { createCartItem } from "../../api";
import { useState, useEffect } from "react";

export function CreateCartItem({ product, loggedIn }) {
  const quantity = 1;
  const userId = localStorage.getItem("id");

  const addItem = async () => {
    await createCartItem(product.id, quantity, userId)
      .then(() => {
        console.log(product.id, quantity, userId);
      })
      .catch((error) => console.log(error))
      .finally(localStorage.removeItem("cart"));
  };

  return (
    <div>
      <Button variant="contained" onClick={addItem}>
        Add to Cart
      </Button>
    </div>
  );
}
