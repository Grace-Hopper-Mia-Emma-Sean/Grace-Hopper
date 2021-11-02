import { IconButton, Badge, ShoppingCartIcon, Button } from "../../MUI";
import { useState, useEffect } from "react";
import { Link } from "react";
import { getCartItems, getCartItemsByUserId } from "../../api";
import { useHistory } from "react-router-dom";

export function CartIcon({ loggedIn }) {
  const [cart, setCart] = useState([]);

  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  useEffect(async () => {
    await getCartItemsByUserId(token, id)
      .then(() => {
        const storage = JSON.parse(localStorage.getItem("cart"));
        storage === "" ? setCart() : setCart(storage);
      })
      .catch((error) => console.log(error));
    // .finally(localStorage.removeItem("cart"));
  }, [loggedIn]);

  const badgeCount = cart == "" ? 0 : cart.length;

  return (
    // <div to="/cart">
    <div>
      {badgeCount > 0 ? (
        <IconButton
          style={{
            textDecoration: "none",
            color: "white",
          }}
        >
          <Badge badgeContent={badgeCount} color="error">
            <ShoppingCartIcon></ShoppingCartIcon>
          </Badge>
        </IconButton>
      ) : (
        <IconButton
          style={{
            textDecoration: "none",
            color: "white",
          }}
        >
          <ShoppingCartIcon></ShoppingCartIcon>
        </IconButton>
      )}
    </div>
  );
}
