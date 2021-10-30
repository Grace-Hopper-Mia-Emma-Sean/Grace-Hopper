import { AddShoppingCartIcon, Button } from "../MUI";
import { createCartItem } from "../../api";
import { useState, useEffect } from "react";

export function CreateCartItem({ product, loggedIn }) {
  const [cart, setCart] = useState([]);
  const quantity = 1;
  const userId = JSON.parse(localStorage.getItem("id"));
  console.log(userId);

  const addItem = async (e) => {
    e.preventDefault();
    if (!loggedIn) {
      let KVPs = [
        { productId: product.id },
        { quantity: quantity },
        { userId: userId },
      ];
      KVPs.forEach((KVP) =>
        localStorage.setItem(Object.keys(KVP), Object.values(KVP))
      );
    }
    try {
      const item = await createCartItem(
        product.id,
        // product.quantity,
        quantity,
        userId
      );
      setCart = useState(item, ...cart);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={addItem}>
        Add to Cart
      </Button>
    </div>
  );
}
