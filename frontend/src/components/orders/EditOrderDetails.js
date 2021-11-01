import { ClassNames } from "@emotion/react";
import { InsertEmoticon } from "@material-ui/icons";
import * as React from "react";
import { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";

import { edit_order_details } from "../../api";

import { TextField, makeStyles } from "../../MUI";

const useStyles = makeStyles((theme) => ({
  editOrderDetails: {
    align: "center",
  },
  editItem: {
    marginBottom: "10",
  },
}));

// method: "PATCH",
//       url: `/order-details/${id}`,
//       data: {
//         user_id: user_id,
//         payment_id: payment_id,
//         total: total,
//       },

export function EditOrderDetails({ orderDetailsToEdit, paymentToEdit }) {
  const classes = useStyles();
  const userId = localStorage.getItem("id");
  const paymentId = paymentToEdit.id;
  const [totalOf, setTotalOf] = useState("");

  const id = orderDetailsToEdit.id;

  return (
    <div className={classes.editOrderDetails}>
      <div className={classes.editItem}>
        Now Order Detail ID: {orderDetailsToEdit.id}
        <br />
        <br />
        {/* Edit Payment ID: <TextField onChange={function(event) {setPaymentId(event.target.value)}}/> */}
      </div>

      <div className={classes.editItem}>
        Now Editting Total: {orderDetailsToEdit.total}
        <br />
        <br />
        Edit total:{" "}
        <TextField
          onChange={function (event) {
            setTotalOf(event.target.value);
          }}
        />
      </div>

      <Link to="/order_details">
        <button>Cancel</button>
      </Link>

      <Link to="/order_details">
        <button
          onClick={function () {
            edit_order_details(id, userId, paymentId, totalOf);
          }}
        >
          Edit Order Details
        </button>
      </Link>
    </div>
  );
}
