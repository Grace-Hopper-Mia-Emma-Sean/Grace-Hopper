import { ClassNames } from "@emotion/react";
import { InsertEmoticon } from "@material-ui/icons";
import * as React from "react";
import { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";

import { edit_payment_details } from "../../api";

import { TextField, makeStyles } from "../../MUI";

const useStyles = makeStyles((theme) => ({
  editUserPaymentDetails: {
    align: "center",
  },
  editItem: {
    marginBottom: "10",
  },
}));

export function EditPaymentDetails({ paymentToEdit }) {
  const classes = useStyles();

  const [orderId, setOrderId] = useState("");
  const [amountPay, setAmountPay] = useState("");
  const [paymentProvider, setPaymentProvider] = useState("");
  const [statusPay, setStatusPay] = useState(false);

  const id = paymentToEdit.id;

  return (
    <div className={classes.editUserPaymentDetails}>
      <div className={classes.editItem}>
        Now Editing Payment ID: {paymentToEdit.id}
        <br />
        <br />
        Edit Amount:{" "}
        <TextField
          onChange={function (event) {
            setAmountPay(event.target.value);
          }}
        />
      </div>

      <div className={classes.editItem}>
        Now Editing Order ID: {paymentToEdit.order_id}
        <br />
        <br />
        Edit Order ID:{" "}
        <TextField
          onChange={function (event) {
            setOrderId(event.target.value);
          }}
        />
      </div>

      <br />
      <div className={classes.editItem}>
        Current Payment Provider: {paymentToEdit.provider}
        <br />
        Edit Payment Provider:{" "}
        <TextField
          onChange={function (event) {
            setPaymentProvider(event.target.value);
          }}
        />
      </div>
      <br />
      <div className={classes.editItem}>
        Current Status: {paymentToEdit.account_no}
        <br />
        True:{" "}
        <TextField
          type="checkbox"
          name="statusPay"
          onChange={function (event) {
            setStatusPay(event.target.value);
          }}
        />
      </div>

      <Link to="/payment_details">
        <button>Cancel</button>
      </Link>

      <Link to="/payment_details">
        <button
          onClick={function () {
            edit_payment_details(
              id,
              orderId,
              amountPay,
              paymentProvider,
              statusPay
            );
          }}
        >
          Edit Payment Details
        </button>
      </Link>
    </div>
  );
}
