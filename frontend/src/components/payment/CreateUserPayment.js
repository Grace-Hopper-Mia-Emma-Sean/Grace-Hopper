import { ClassNames } from "@emotion/react";
import { InsertEmoticon } from "@material-ui/icons";
import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { create_user_payment } from "../../api";

import { TextField, makeStyles } from "../../MUI";

const useStyles = makeStyles((theme) => ({
  createUserPayment: {
    align: "center",
  },
  editItem: {
    marginBottom: "10",
  },
}));

export function CreateUserPayment(token) {
  const classes = useStyles();
  const userId = localStorage.getItem("id");
  const [paymentId, setPaymentId] = useState("");
  const [paymentProvider, setPaymentProvider] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [expireDate, setExpireDate] = useState("");

  // method: "POST",
  // url: "/user-payment",
  // data: {
  //   id: id,
  //   user_id:user_id ,
  //   payment_type: payment_type,
  //   provider: provider,
  //   account_no: account_no,
  //   expiry:expiry,
  // },

  return (
    <div className={classes.createUserPayment}>
      <div className={classes.editItem}>
        Payment ID:{" "}
        <TextField
          onChange={function (event) {
            setPaymentId(event.target.value);
          }}
        />
      </div>

      <div className={classes.editItem}>
        Payment Provider:{" "}
        <TextField
          onChange={function (event) {
            setPaymentProvider(event.target.value);
          }}
        />
      </div>

      <br />
      <div className={classes.editItem}>
        Account Number:{" "}
        <TextField
          onChange={function (event) {
            setAccountNo(event.target.value);
          }}
        />
      </div>
      <br />
      <div className={classes.editItem}>
        Expiration Date:{" "}
        <TextField
          onChange={function (event) {
            setExpireDate(event.target.value);
          }}
        />
      </div>

      <Link to="/user_payment">
        <button>Cancel</button>
      </Link>

      <Link to="/user_payment">
        <button
          onClick={function () {
            create_user_payment(
              token,
              userId,
              paymentId,
              paymentProvider,
              accountNo,
              expireDate
            );
          }}
        >
          Create User Payment
        </button>
      </Link>
    </div>
  );
}
