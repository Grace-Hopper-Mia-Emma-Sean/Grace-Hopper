import { IconButton, Badge, ShoppingCartIcon } from "../MUI";
import { useState, useEffect } from "react";
import { getCartItems, getCartItemsByUserId } from "../../api";

export function CartIcon() {
  const [cart, setCart] = useState([]);

  // useEffect(async () => {
  //   await getProducts(localStorage.getItem("token"))
  //     .then(() => {
  //       console.log(localStorage.getItem("product"));
  //       setProduct(JSON.parse(localStorage.getItem("product")));
  //     })
  //     .catch((error) => console.log(error))
  //     .finally(localStorage.removeItem("product"));
  // }, []);

  useEffect(async () => {
    await getCartItemsByUserId(
      localStorage.getItem("token"),
      localStorage.getItem("id")
    )
      .then(() => {
        console.log(localStorage.getItem("cart"));
        setCart(JSON.parse(localStorage.getItem("cart")));
      })
      .catch((error) => console.log(error))
      .finally(localStorage.removeItem("cart"));
  }, []);

  const badgeCount = cart === null ? 0 : cart.length;

  // product.forEach((product, i) => Object.assign(product, { id: i + 1 }));

  // const rows = [...product];
  // console.log(rows);

  return (
    <div>
      <IconButton size="large" aria-label="show 4 new mails" color="inherit">
        <Badge badgeContent={badgeCount} color="error">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </div>
  );
}
