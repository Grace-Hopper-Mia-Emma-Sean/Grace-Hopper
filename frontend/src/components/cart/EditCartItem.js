import { Box, FormControl, InputLabel, MenuItem, Select } from "../../MUI";
import { updateCartItem } from "../../api";
import { useState, useEffect } from "react";

export function EditCartItem({ cart, setCart }) {
  const localCart = JSON.parse(localStorage.cart);
  const userId = localStorage.id;

  const [quantity, setQuantity] = useState(cart.quantity);
  const [total, setTotal] = useState(cart.total);

  console.log(quantity);

  const item = {
    id: cart.id,
    user_id: null,
    name: cart.name,
    quantity: quantity,
    price: cart.price,
    total: total,
  };

  const changeItem = localCart.find(({ id }) => id === item.id);

  const guest = ({ item }) => {
    if (changeItem === undefined) return;
    console.log(changeItem);
    changeItem.quantity = quantity;
    changeItem.total = changeItem.price * quantity;
    setTotal(this);
    localStorage.setItem("cart", JSON.stringify(localCart));
  };

  useEffect(async () => {
    !userId
      ? guest({ item })
      : await updateCartItem(cart.id, quantity, localStorage.id);
    setCart(localCart);
  }, [quantity]);

  return (
    <div>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Quantity</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={quantity}
            label="Quantity"
            onChange={(e) => setQuantity(e.target.value)}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => {
              return <MenuItem value={number}>{number}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}
