import { Link } from "react-router-dom";
import { Logout } from "../../components";

export function Testing({ loggedIn }) {
  return (
    <div className="testing">
      <h2>Start of Testing Component...</h2>
      {loggedIn ? (
        <p>
          <b>User is logged in and can see the following links:</b>
          <br />
          <Link to="/">Home</Link>
          <br />
          <Link to="*">404</Link>
          <br />
          <Link to="/admin">Admin</Link>
          <br />
          <Link to="/admin/users">Admin - Users</Link>
          <br />
          <Link to="/admin/cart">Admin - Cart</Link>
        </p>
      ) : (
        <p>
          <b>User is NOT logged in and can see the following links:</b>
          <br />
          <Link to="/">Home</Link>
          <br />
          <Link to="*">404</Link>
          <br />
          <Link to="/register">Register</Link>
          <br />
          <Link to="/login">Login</Link>
        </p>
      )}
      <h2>End of Testing Component...</h2>
    </div>
  );
}
