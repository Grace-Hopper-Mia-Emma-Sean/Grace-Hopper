import { IconButton, Badge, ShoppingCartIcon, Button } from "../MUI";
import { useState, useEffect } from "react";
import { Link } from "react";
import { getCartItems, getCartItemsByUserId } from "../../api";
import { useHistory } from "react-router-dom";

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

  // {
  //   loggedIn ? <Redirect to="/" /> : null;
  // }

  return (
    <div>
      {badgeCount > 0 ? (
        <IconButton size="large" color="inherit" component={Link} to="cart">
          <Badge badgeContent={badgeCount} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      ) : (
        <IconButton size="large" color="inherit" component={Link} to="/cart">
          <ShoppingCartIcon />
        </IconButton>
      )}
    </div>
  );
}
