import {
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "../../MUI";
import { updateCartItem, getCartItemsByUserId } from "../../api";
import { useState, useEffect } from "react";

export function EditCartItem({ cart, product }) {
  const [quantity, setQuantity] = useState(cart.quantity);

  const item = {
    id: product.id,
    user_id: null,
    name: product.name,
    quantity: quantity,
    price: product.price,
    total: quantity * product.price,
  };
  const guest = ({ fields }) => {
    fields = item;
    const oldItems = JSON.parse(localStorage.getItem("cart")) || [];
    oldItems.push(fields);
    localStorage.setItem("cart", JSON.stringify(oldItems));
  };

  useEffect(async () => {
    await updateCartItem(cart.id, quantity, localStorage.getItem("id"));
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
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
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
