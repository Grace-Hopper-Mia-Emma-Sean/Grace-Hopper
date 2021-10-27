import { LogoutIcon, Button } from "../MUI";
import { Redirect } from "react-router";

export function Logout() {
  return (
    <Button
      underline="hover"
      onClick={() => {
        let keys = ["username", "token"];
        keys.forEach((k) => localStorage.removeItem(k));
        <Redirect to="/" />;
        // Temp workaround to re-render after logging out:
        window.location.href = "/";
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
