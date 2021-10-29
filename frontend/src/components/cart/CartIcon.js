import { IconButton, Badge, ShoppingCartIcon } from "../MUI";
import { useState, useEffect } from "react";
import { getCartItems, getCartItemsByUserId } from "../../api";

export function CartIcon() {
  const [cart, setCart] = useState([]);

  useEffect(async () => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    await getCartItemsByUserId(token, id)
      .then(() => {
        const storage = JSON.parse(localStorage.getItem("cart"));
        storage === "" ? setCart([]) : setCart([storage]);
      })
      .catch((error) => console.log(error))
      .finally(localStorage.removeItem("cart"));
  }, []);

  const badgeCount = cart == [""] ? 0 : cart.length;

  return (
    <div>
      {badgeCount > 0 ? (
        <IconButton size="large" color="inherit">
          <Badge badgeContent={badgeCount} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      ) : (
        <IconButton size="large" color="inherit">
          <ShoppingCartIcon />
        </IconButton>
      )}
    </div>
  );
}
