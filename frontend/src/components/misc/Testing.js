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
          <Link to="/cart">Cart</Link>
          <br />
          <Link to="/admin">Admin</Link>
          <br />
          <Link to="/admin/users">Admin - Users</Link>
          <br />
          <Link to="/admin/cart">Admin - Cart</Link>
          <br />
          <Link to="/admin/products">Admin - Products</Link>
          <br />
          <Link to="/admin/user_payment">Admin - User Payment</Link>
          <br />
          <Link to="/payment_details">Testing - Payment Details</Link>
          <br />
          <Link to="/order_items">Testing - Order Items</Link>
          <br />
          <Link to="/order_details">Testing - Order Details</Link>
          <br />
          <Link to="/checkout">Testing - Checkout</Link>

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
          <br/>
          <Link to="/payment_details">Payment Details</Link>
          <br />
          <Link to="/order_items">Order Items</Link>
          <br />
          <Link to="/order_details">Order Details</Link>
          <br />
          <Link to="/checkout">Checkout</Link>
        </p>
      )}
      <h2>End of Testing Component...</h2>
    </div>
  );
}
