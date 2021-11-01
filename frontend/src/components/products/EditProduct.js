import { ClassNames } from "@emotion/react";
import { InsertEmoticon } from "@material-ui/icons";
import * as React from "react";
import { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";

import { editProduct } from "../../api";

import { TextField, makeStyles } from "../../MUI";

const useStyles = makeStyles((theme) => ({
  editproductform: {
    align: "center",
  },
  editItem: {
    marginBottom: "10",
  },
}));

export function EditProduct({ productToEdit }) {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [sku, setSku] = useState("");

  const id = productToEdit.id;

  return (
    <div className={classes.editproductform}>
      <div className={classes.editItem}>
        Now Editing: {productToEdit.name} | ID: {productToEdit.id}
        <br />
        <br />
        Edit Name:{" "}
        <TextField
          onChange={function (event) {
            setName(event.target.value), console.log(name);
          }}
        />
      </div>
      <br />
      <div className={classes.editItem}>
        Current Category: {productToEdit.category_id}
        <br />
        Edit Category:{" "}
        <TextField
          onChange={function (event) {
            setCategory(event.target.value), console.log(category);
          }}
        />
      </div>
      <br />
      <div className={classes.editItem}>
        Current Description: {productToEdit.description}
        <br />
        Edit Description:{" "}
        <TextField
          onChange={function (event) {
            setDescription(event.target.value), console.log(description);
          }}
        />
      </div>
      <br />
      <div className={classes.editItem}>
        Current Discount: {productToEdit.discount_id}
        <br />
        Edit Discount:{" "}
        <TextField
          onChange={function (event) {
            setDiscount(event.target.value), console.log(discount);
          }}
        />
      </div>
      <br />
      <div className={classes.editItem}>
        Current Price: {productToEdit.price}
        <br />
        Edit Price:{" "}
        <TextField
          onChange={function (event) {
            setPrice(event.target.value), console.log(price);
          }}
        />
      </div>
      <br />
      <div className={classes.editItem}>
        Current Quantity: {productToEdit.quantity}
        <br />
        Edit Quantity:{" "}
        <TextField
          onChange={function (event) {
            setQuantity(event.target.value), console.log(quantity);
          }}
        />
      </div>
      <br />
      <div className={classes.editItem}>
        Current SKU: {productToEdit.sku}
        <br />
        Edit SKU:{" "}
        <TextField
          onChange={function (event) {
            setSku(event.target.value), console.log(sku);
          }}
        />
      </div>
      <br />
      <Link to="/admin/products">
        <button>Cancel</button>
      </Link>

      <Link to="/admin/products">
        <button
          onClick={function () {
            editProduct(
              id,
              name,
              description,
              sku,
              category,
              price,
              discount,
              quantity
            );
          }}
        >
          Send
        </button>
      </Link>
    </div>
  );
}
