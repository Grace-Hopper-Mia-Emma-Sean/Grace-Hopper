import { LogoutIcon, IconButton, Button } from "../../MUI";
import { Link } from "react-router-dom";

export function Logout({ setLoggedIn }) {
  return (
    <Link to="/">
      <IconButton
        underline="hover"
        onClick={() => {
          let keys = [
            "username",
            "token",
            "admin",
            "userPayments",
            "userPaymentId",
            "payment_details_Id",
            "payment_details",
            "orderItems",
            "orderDetails",
            "orderDetailId",
            "users",
            "orderItemId",
            "id",
            "cart",
            "Cart Total",
          ];
          keys.forEach((k) => localStorage.removeItem(k));
          setLoggedIn(false);
          window.location.href = "/";
        }}
        style={{
          textDecoration: "none",
          color: "white",
        }}
      >
        <LogoutIcon></LogoutIcon>
      </IconButton>
    </Link>
  );
}
