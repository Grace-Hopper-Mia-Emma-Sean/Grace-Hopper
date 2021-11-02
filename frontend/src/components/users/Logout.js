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
          ];
          keys.forEach((k) => localStorage.removeItem(k));
          setLoggedIn(false);
        }}
        style={{
          textDecoration: "none",
          color: "white",
          fontFamily: "Arvo",
        }}
      >
        <LogoutIcon></LogoutIcon>
      </IconButton>
    </Link>
  );
}

{
  /* <IconButton
  size="large"
  edge="end"
  aria-label="logout of current user"
  aria-haspopup="true"
  // onClick={handleProfileMenuOpen}
  color="inherit"
>
  <Logout />
</IconButton>; */
}
