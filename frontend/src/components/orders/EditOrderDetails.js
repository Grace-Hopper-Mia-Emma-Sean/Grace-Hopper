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


  const [totalOf, setTotalOf] = useState('');
  const [userId, setUserId] = useState('');
  const [paymentId, setPayment] = useState('');

  const id = JSON.parse(localStorage.getItem("Order To Edit"))


  return (
    <div className={classes.editOrderDetails}>
      <div className={classes.editItem}>
        Edit User Id:
        <TextField
          onChange={function (event) {
            setUserId(event.target.value);
          }}
        />

        <br />
        Edit Payment ID:
        <TextField
          onChange={function (event) {
            setPayment(event.target.value);
          }}
        />
        
        <br />
        Edit Total:
        <TextField
          onChange={function (event) {
            setTotalOf(event.target.value);
          }}
        />
      </div>

      <Link to="/order_details">
        <button>Cancel</button>
      </Link>

      <Link to="/edit_order_details">
        <button
          onClick={function () {
            console.log(id, userId, totalOf, paymentId)
            edit_order_details(id, userId, totalOf, paymentId);
          }}
        >
          Edit Order Details
        </button>
      </Link>
    </div>
  );
}
