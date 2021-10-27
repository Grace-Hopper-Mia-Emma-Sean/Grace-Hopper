import { LogoutIcon } from "../MUI";
import { Redirect } from "react-router";

export function Logout() {
  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    <Redirect to="/" />;
    // Temp workaround to re-render after logging out:
    window.location.href = "/";
  };

  return (
    <LogoutIcon className={"IconHover"} onClick={() => logoutUser()}>
      Log out
    </LogoutIcon>
  );
}
