import { ClassNames } from "@emotion/react";
import { InsertEmoticon } from "@material-ui/icons";
import * as React from "react";
import { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";

import { delete_order_details } from "../../api";

import { makeStyles } from "../../MUI";

const useStyles = makeStyles((theme) => ({
  orderToDelete: {
    align: "center",
  },
  editItem: {
    marginBottom: "10",
  },
}));

export function DeleteOrderDetails({ orderToDelete }) {
  const classes = useStyles();
  // const id = orderToDelete.id;
  const id = JSON.parse(localStorage.getItem("Order To Delete"))

  return (
    <div className={classes.orderToDelete}>
      <div className={classes.editItem}>
        Deleting Order Detail ID: {id}

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
            localStorage.removeItem("Order To Delete")
          }}
        >
          Delete
        </button>
      </Link>
    </div>
  );
}
