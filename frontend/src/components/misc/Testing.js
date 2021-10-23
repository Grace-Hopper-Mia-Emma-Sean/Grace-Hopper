import { Link } from "react-router-dom";

export function Testing() {
  return (
    <div className="testing">
      <h2>Start of Testing Component...</h2>
      <p>
        <Link to="/">Home</Link>
        <br />
        <Link to="/register">Register</Link>
        <br />
        <Link to="/login">Login</Link>
        <br />
        <Link to="*">404</Link>
      </p>
      <h2>End of Testing Component...</h2>
    </div>
  );
}
