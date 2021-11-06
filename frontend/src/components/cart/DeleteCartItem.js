import { Button } from "../../MUI";
import { deleteCartItem } from "../../api";

export function DeleteCartItem({ cart, setCart }) {
  const localCart = JSON.parse(localStorage.cart);

  const removeItem = async () => {
    const removeLocalItem = () => {
      const localCart = JSON.parse(localStorage.cart);
      for (let i = 0; i < localCart.length; i++) {
        if (localCart[i].id === cart.id) {
          localCart.splice(i, 1);
          localStorage.setItem("cart", JSON.stringify(localCart));
        }
      }
    };
    !localStorage.getItem("id")
      ? removeLocalItem()
      : await deleteCartItem(cart.id).catch((error) => console.log(error));
    setCart([]);
  };

  return (
    <div>
      <Button variant="contained" onClick={removeItem}>
        Remove from Cart
      </Button>
    </div>
  );
}
