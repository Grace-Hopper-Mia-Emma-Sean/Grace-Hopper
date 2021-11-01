import { ClassNames } from "@emotion/react";
import { InsertEmoticon } from "@material-ui/icons";
import * as React from "react";
import { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";

import { delete_order_details } from "../../api";

import { makeStyles } from "../../MUI";

const useStyles = makeStyles((theme) => ({
  deleteOrderDetails: {
    align: "center",
  },
  editItem: {
    marginBottom: "10",
  },
}));

export function DeleteOrderDetails({ orderDetailsToDelete }) {
  const classes = useStyles();
  const id = orderDetailsToDelete.id;

  return (
    <div className={classes.deleteOrderDetails}>
      <div className={classes.editItem}>
        Deleting Order Detail ID: {orderDetailsToDelete.id}
        <br />
        <br />
      </div>
      <Link to="/order_details">
        <button>Cancel</button>
      </Link>

      <Link to="/order_details">
        <button
          onClick={function () {
            delete_order_details(id);
          }}
        >
          Delete
        </button>
      </Link>
    </div>
  );
}
