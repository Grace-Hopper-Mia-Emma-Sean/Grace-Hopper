import * as React from "react";

import { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";

import { createProduct } from "../../api";

import { TextField, makeStyles, Button } from "../../MUI";

const useStyles = makeStyles((theme) => ({
  body: {
    backgroundColor: "white",
    height: "90vh",
    display: 'flex',
    justifyContent: "center",
    alignContentItems: "center"

  },
  title: {
    backgroundColor: "white",
    paddingTop: '10px',
    // paddingBottom: '20px',
    display: 'flex',
    justifyContent: "center",
    alignContentItems: "center"
  },
  form: {
    paddingTop: '10%',
    
    height: '90vh',
    // width: '50%',
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: "center",
    alignContentItems: "center"
  },
  addItem: {
    marginBottom: "10",
  },
}));

export function CreateProduct() {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [discount, setDiscount] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [sku, setSku] = useState("");

  return (
    <>
      <div className={classes.title}>
        <h1>Create a New Product</h1>
      </div>
      <div className={classes.body}>
        
          <div className={classes.form}>
          
            <div className={classes.addItem}>
              <TextField variant="outlined" label="Enter Name..."
                onChange={function (event) {
                  setName(event.target.value);
                }}
              />
            </div>
              <br />
            <div className={classes.addItem}>
                <TextField variant="outlined" label="Enter Category..."
                  onChange={function (event) {
                    setCategory(event.target.value);
                  }}
                />
            </div>
              <br />
            <div className={classes.addItem}>
                <TextField variant="outlined" label="Enter Description..."
                  onChange={function (event) {
                    setDescription(event.target.value);
                  }}
                />
            </div>
              <br />
            <div className={classes.addItem}>
                <TextField variant="outlined" label="Enter Disc. Category..."
                  onChange={function (event) {
                    setDiscount(event.target.value);
                  }}
                />
            </div>
              <br />
            <div className={classes.addItem}> 
                <TextField variant="outlined" label="Enter Price..."
                  onChange={function (event) {
                    setPrice(event.target.value);
                  }}
                />
            </div>
              <br />
            <div className={classes.addItem}>
                <TextField variant="outlined" label="Enter Quantity..."
                  onChange={function (event) {
                    setQuantity(event.target.value);
                  }}
                />
            </div>
              <br />
            <div className={classes.addItem}>
                <TextField variant="outlined" label = "Enter SKU..."
                  onChange={function (event) {
                    setSku(event.target.value);
                  }}
                />
            </div>
          
            <br />
            <Link to="/admin/products">
            <Button
              onClick={function () {
                createProduct(
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
              Create Product
            </Button>
          </Link>
          <br />
          <Link to="/admin/products">
            <Button>Return To Products Table</Button>
          </Link>
          
          
        </div>
          
      </div>
    </>
  );
}
