import { IconButton, Badge, ShoppingCartIcon } from "../../MUI";
import { useState, useEffect } from "react";
import { getCartItemsByUserId } from "../../api";

export function CartIcon({ loggedIn }) {
  const [cart, setCart] = useState([]);
  const localCart = localStorage.cart;

  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  useEffect(async () => {
    await getCartItemsByUserId(token, id)
      .then(() => {
        if (cart) {
          const storage = JSON.parse(localStorage.getItem("cart"));
          storage === "" ? setCart() : setCart(storage);
        }
        setCart(0);
      })
      .catch((error) => console.log(error));
  }, [loggedIn]);

  const badgeCount =
    localCart === null ||
    localCart === undefined ||
    localCart.length === 0 ||
    localCart === ""
      ? null
      : JSON.parse(localStorage.cart).filter((x) => x.id).length;

  return (
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
