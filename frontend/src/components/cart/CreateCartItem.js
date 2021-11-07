import {
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "../../MUI";
import { createCartItem, getCartItemsByUserId } from "../../api";
import { useEffect, useState } from "react";

export function CreateCartItem({ product, setCart, cart }) {
  const [quantity, setQuantity] = useState(1);
  const [itemCheck, setItemCheck] = useState([]);
  const userId = JSON.parse(localStorage.getItem("id"));
  const localCart = JSON.parse(localStorage.getItem("cart")) || [];
  const id = localStorage.id;
  const token = localStorage.token;

  const addItem = async () => {
    const item = {
      id: product.id,
      user_id: null,
      name: product.name,
      quantity: quantity,
      price: product.price,
      total: quantity * product.price,
    };
    const guest = (item) => {
      const oldItems = JSON.parse(localStorage.getItem("cart")) || [];
      if (!oldItems.some((obj) => obj.id)) {
        oldItems.push(item);
        localStorage.setItem("cart", JSON.stringify(oldItems));
      } else {
        const newItems = [...oldItems, item];
        localStorage.setItem("cart", JSON.stringify(newItems));
      }
      setCart(localStorage.cart);
    };
    const user = async () => {
      await createCartItem(product.id, quantity, userId).catch((error) =>
        console.log(error)
      );
    };
    !userId ? guest(item) : user();
  };

  const cartHasItem = localCart.some((prod) => prod.name === product.name);

  return (
    <div>
      {cartHasItem ? (
        <div>
          <Button variant="contained" disabled>
            In Cart
          </Button>
          <Button color="#457B9D">
            <Select
              disabled
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => {
                return <MenuItem value={number}>{number}</MenuItem>;
              })}
            </Select>
          </Button>
        </div>
      ) : (
        <div>
          <Button variant="contained" onClick={addItem}>
            Add to Cart
          </Button>
          <Button color="#457B9D">
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => {
                return <MenuItem value={number}>{number}</MenuItem>;
              })}
            </Select>
          </Button>
        </div>
      )}
    </div>
  );
}
