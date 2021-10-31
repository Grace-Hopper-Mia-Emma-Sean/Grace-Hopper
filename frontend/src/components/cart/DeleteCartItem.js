import { Button } from "../MUI";
import { deleteCartItem } from "../../api";
import { useState, useEffect } from "react";

export function DeleteCartItem({ product, loggedIn }) {
  const removeItem = async () => {
    await deleteCartItem(JSON.parse(localStorage.getItem("id")))
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
