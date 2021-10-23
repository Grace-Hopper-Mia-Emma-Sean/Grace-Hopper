import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div>
      Page not found... sad face.
      <Link to="/"> Click here to go back to our home page.</Link>
    </div>
  );
}
