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
      // fields = item;
      // const oldItems = JSON.parse(localStorage.getItem("cart")) || [];
      // console.log(oldItems);
      // if (!oldItems.length) {
      //   console.log("scenario 1 hit");
      //   oldItems.push(item);
      //   localStorage.setItem("cart", JSON.stringify(oldItems));
      // } else {
      //   console.log("scenario 2 hit");
      //   const newItems = [Object.entries(oldItems), item];
      //   localStorage.setItem("cart", JSON.stringify(newItems));
      // }
      const oldItems = JSON.parse(localStorage.getItem("cart")) || [];
      // const newItems = [];
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
      // .finally(localStorage.removeItem("cart"));
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
