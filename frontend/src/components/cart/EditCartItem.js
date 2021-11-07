import { Box, FormControl, InputLabel, MenuItem, Select } from "../../MUI";
import { updateCartItem } from "../../api";
import { useState, useEffect } from "react";

export function EditCartItem({ cart, setCart, sum, setSum }) {
  const localCart = JSON.parse(localStorage.cart);
  const userId = localStorage.id;

  const [quantity, setQuantity] = useState(cart.quantity);
  const [total, setTotal] = useState(cart.total);

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
    changeItem.quantity = quantity;
    changeItem.total = changeItem.price * quantity;
    setTotal(this);
    localStorage.setItem("cart", JSON.stringify(localCart));
  };

  useEffect(async () => {
    if (!userId) {
      guest({ item });
      setSum(
        localCart
          .sort((x, y) => x.id - y.id)
          .reduce((total, array) => {
            return total + JSON.parse(array.total);
          }, 0)
          .toLocaleString("en-US")
      );
    } else {
      await updateCartItem(cart.id, quantity, localStorage.id);
    }
    setCart(localCart);
  }, [quantity]);

  function cartSum() {
    const localCart = JSON.parse(localStorage.cart);
    localCart.map((cartNow) => {
      const num1 = parseInt(cart.price);
      const select = document.getElementById("demo-simple-select");
      const num2 = parseInt(select.textContent);
      const newTotal = num1 * num2;

      return newTotal;
    });
  }

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
