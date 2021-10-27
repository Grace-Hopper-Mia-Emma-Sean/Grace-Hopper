import { LogoutIcon, Button } from "../MUI";
import { Redirect } from "react-router";

export function Logout({ setLoggedIn }) {
  return (
    <Button
      underline="hover"
      onClick={() => {
        let keys = ["username", "token", "admin", "id"];
        keys.forEach((k) => localStorage.removeItem(k));
        setLoggedIn(false);
      }}
      style={{
        textDecoration: "none",
        color: "white",
        fontFamily: "Lato",
      }}
    >
      Logout
    </Button>
  );
}
