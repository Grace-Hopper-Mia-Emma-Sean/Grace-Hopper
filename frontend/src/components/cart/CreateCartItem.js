import { AddShoppingCartIcon, Button } from "../MUI";
import { createCartItem } from "../../api";
import { useState, useEffect } from "react";

export function CreateCartItem() {
  const [cart, setCart] = useState([]);

  // useEffect(async () => {
  //   await createCartItem(productId, quantity, userId)
  //     .then(() => {
  //       setCart([]);
  //     })
  //     .catch((error) => console.log(error))
  //     .finally(localStorage.removeItem("cart"));
  // }, []);

  return (
    <div>
      <Button variant="contained">Add to Cart</Button>
    </div>
  );
}
