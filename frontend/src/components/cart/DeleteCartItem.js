import { Button } from "../../MUI";
import { deleteCartItem } from "../../api";
import { useState, useEffect } from "react";

export function DeleteCartItem({ cart }) {
  const removeItem = async () => {
    const removeLocalItem = () => {
      const localCart = JSON.parse(localStorage.cart);
      for (let i = 0; i < localCart.length; i++) {
        if (localCart[i].id === cart.id) {
          localCart.splice(i, 1);
          localStorage.setItem("cart", JSON.stringify(localCart));
        }
      }
    };
    !localStorage.getItem("id")
      ? removeLocalItem()
      : await deleteCartItem(cart.id)
          .then(() => {
            console.log("cart item removed successfully");
          })
          .catch((error) => console.log(error));
  };

  return (
    <div>
      <Button variant="contained" onClick={removeItem}>
        REMOVE FROM CART
      </Button>
    </div>
  );
}
