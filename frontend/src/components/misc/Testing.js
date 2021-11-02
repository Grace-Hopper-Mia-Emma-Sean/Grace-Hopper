import { Link } from "react-router-dom";
import { Logout } from "../../components";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  ExpandMoreIcon,
} from "../../MUI";

export function Testing({ loggedIn }) {
  return (
    <div className="testing">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{ fontSize: "1.5rem", fontWeight: 500 }}>
            Testing Links
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
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
                <br />
                <Link to="/financial_dashboard">
                  Testing - Financial Dashboard
                </Link>
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
                <br />
                <Link to="/payment_details">Payment Details</Link>
                <br />
                <Link to="/order_items">Order Items</Link>
                <br />
                <Link to="/order_details">Order Details</Link>
                <br />
                <Link to="/checkout">Checkout</Link>
              </p>
            )}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
