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
          <p>
            Logout <Logout />
          </p>
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

// <div className="testing">
//   <h2>Start of Testing Component...</h2>

//     {loggedIn ?

//       (Link to="/">Home</Link>
//               <p>

//       <br />
//       <Link to="*">404</Link>
//       <p>
//         Logout <Logout />
//       </p></p>
//       ) : ( <p>
//       <Link to="/register">Register</Link>
//       <br />
//       <Link to="/login">Login</Link>
//       <br />
//             </p>

//       )}
//   <h2>End of Testing Component...</h2>
// </div>
