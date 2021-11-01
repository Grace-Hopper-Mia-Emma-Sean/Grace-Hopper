import { ClassNames } from "@emotion/react";
import { InsertEmoticon } from "@material-ui/icons";
import * as React from "react";
import { Link } from "react-router-dom";

import { delete_user_payment } from "../../api";
import { makeStyles } from "../../MUI";

const useStyles = makeStyles((theme) => ({
  deleteUserPayment: {
    align: "center",
  },
  editItem: {
    marginBottom: "10",
  },
}));

export function DeleteUserPayment({ userPaymentToDelete, token }) {
  const classes = useStyles();
  const id = userPaymentToDelete.id;

  return (
    <div className={classes.deleteUserPayment}>
      <div className={classes.editItem}>
        Deleting User Payment ID: {userPaymentToDelete.id}
        <br />
        <br />
      </div>
      <Link to="/user_payment">
        <button>Cancel</button>
      </Link>

      <Link to="/user_payment">
        <button
          onClick={function () {
            delete_user_payment(id, token);
          }}
        >
          Delete
        </button>
      </Link>
    </div>
  );
}
