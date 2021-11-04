import { IconButton, Badge, ShoppingCartIcon, Button } from "../../MUI";
import { useState, useEffect } from "react";
import { getCartItems, getCartItemsByUserId } from "../../api";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

export function CartIcon({ loggedIn }) {
  const [cart, setCart] = useState([]);

  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  useEffect(async () => {
    await getCartItemsByUserId(token, id)
      .then(() => {
        if(cart) {
          const storage = JSON.parse(localStorage.getItem("cart"));
          storage === "" ? setCart() : setCart(storage);
        } 
        setCart(0)
        console.log("No Cart Items")
      })
      .catch((error) => console.log(error));
    // .finally(localStorage.removeItem("cart"));
  }, [loggedIn]);

  const badgeCount = cart == "" ? 0 : 0;
  // console.log(cart.length)
  

  return (
    // <div to="/cart">
 
    <div>
      {cart && badgeCount > 0 ? (
        <IconButton
          style={{
            textDecoration: "none",
            color: "white",
          }}
        >
          <Badge badgeContent={badgeCount} color="error">
            <ShoppingCartIcon> </ShoppingCartIcon>
          </Badge>
        </IconButton>
      ) : (
        <IconButton
          style={{
            textDecoration: "none",
            color: "white",
          }}
          component={Link} to="/"
        >
        <Link to="/">
          <ShoppingCartIcon
          />
        </Link>

        </IconButton>
      )}
    </div>
    

  );
}
