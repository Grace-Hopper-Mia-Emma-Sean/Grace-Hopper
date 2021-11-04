import { AddShoppingCartIcon, Button } from "../../MUI";
import { createCartItem } from "../../api";

export function CreateCartItem({ product }) {
  const quantity = 1;
  const userId = JSON.parse(localStorage.getItem("id"));

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
    };
    const user = async () => {
      await createCartItem(product.id, quantity, userId)
        .then(() => {
          console.log(product.id, quantity, userId);
        })
        .catch((error) => console.log(error));
    };
    !userId ? guest(item) : user();
  };

  return (
    <div>
      <Button variant="contained" onClick={addItem}>
        Add to Cart
      </Button>
    </div>
  );
}
