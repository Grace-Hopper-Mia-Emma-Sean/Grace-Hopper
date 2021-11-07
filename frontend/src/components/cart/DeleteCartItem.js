import { Button } from "../../MUI";
import { deleteCartItem } from "../../api";
import { CartSum } from "..";

export function DeleteCartItem({ cart, setCart}) {
  // const localCart = JSON.parse(localStorage.cart);

  // const removeItem = async () => {
  //   const removeLocalItem = () => {
  //     const localCart = JSON.parse(localStorage.cart);

  //     for (let i = 0; i < localCart.length; i++) {
  //       if (localCart[i].id === cart.id) {
  //         localCart.splice(i, 1);
  //         localStorage.setItem("cart", JSON.stringify(localCart));
  //       }
  //     }
  //   }

  //   !localStorage.getItem("id")
  //     ? removeLocalItem()
  //     : await deleteCartItem(cart.id).catch((error) => console.log(error));
  //     window.location.reload(true)
  //   setCart([]);
    
    
  // }


  const removeItem = async () => {
    const localCart = JSON.parse(localStorage.cart);

    if (localStorage.getItem("id")) {
        localCart.forEach((cartNow) => {
          if (cartNow.id === cart.id)
            deleteCartItem(cartNow.id)
        }) 

    } else if (!localStorage.getItem("id")) {
     localCart.forEach((cartNow) => {
      if (cartNow.id === cart.id) {
        
        const index = localCart.findIndex(cartNow => cartNow.id === cart.id)
        console.log(cartNow.id, cart.id, index)

        localCart.splice(index, 1)
        localStorage.setItem("cart", JSON.stringify(localCart))
        window.location.reload(true)
        }
      })
    } 
  }


  
  return (
    <div>
      <Button variant="contained" onClick={removeItem}>
        Remove from Cart
      </Button>
    </div>
  );
}
