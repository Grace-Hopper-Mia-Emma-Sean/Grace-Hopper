import { ClassNames } from "@emotion/react";
import { InsertEmoticon } from "@material-ui/icons";
import * as React from "react";
import { useState, useEffect } from 'react'
import { Link, Redirect } from "react-router-dom";

import {editProduct, deleteProduct, getProductCategories, getProductDiscounts} from '../../api'
// import { deleteProduct } from "../../api/products";

import { TextField, makeStyles, Button, Typography, MenuItem } from "../../MUI";

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
    editItem: {
      marginBottom: "10",
    },
  }));

export function EditProduct({productToEdit}){
  const classes = useStyles();

  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [discount, setDiscount] = useState('')
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')
  const [sku, setSku] = useState('')
  const [categories, setCategories] = useState([])
  const [discounts, setDiscounts] = useState([])

  const id = productToEdit.id

  useEffect(()=> {
    const fetchCategories = async () => {
      const resp = await getProductCategories()
      setCategories(resp)
    }
    fetchCategories();
  }, [])

  useEffect(()=> {
    const fetchDiscounts = async () => {
      const resp = await getProductDiscounts()
      setDiscounts(resp)
    }
    fetchDiscounts();
  }, [])

  const handleCatSelect = (event) => {
    setCategory(event.target.value)
    console.log(categories)
  }

  const handleDiscSelect = (event) => {
    setDiscount(event.target.value)
    console.log(discounts)
  }

  return (
    <>  
        <div className={classes.title}>
            <h1>Now Editing: <Typography color='red' fontSize={'25px'}> {productToEdit.name} | ID: {productToEdit.id}</Typography> </h1> 
        </div>
        <div className={classes.body}> 
            <div className={classes.form}>
                <div className={classes.editItem}>
                        Current Category: {productToEdit.category_id}
                        <br />
                        <br/>
                        <TextField 
                    variant="outlined" 
                    label="Enter Category..."
                    select
                    onChange={
                    handleCatSelect
                    }
                    helperText="Please Select A Category"
                    >
                    {categories.map((category)=>(
                    <MenuItem key={category.name} value={category.id}>
                        {category.id} - ({category.name})
                    </MenuItem>
                    )
                    )}
                    </TextField>
                </div>
                    <br/>
                <div className={classes.editItem}>
                    Current Description: {productToEdit.description}
                    <br />
                    <br/>
                    <TextField 
                    variant="outlined"
                    label="Edit Description"
                    onChange={function(event) {setDescription(event.target.value), console.log(description)}} />
                </div>
                    <br/>
                <div className={classes.editItem}>
                    Current Discount: {productToEdit.discount_id}
                    <br/>
                    <br/>
                        <TextField 
                    variant="outlined" 
                    label="Enter Discount..."
                    select
                    onChange={
                    handleDiscSelect
                    }
                    helperText="Please Select A Category"
                    >
                    {discounts.map((discount)=>(
                    <MenuItem key={discount.name} value={discount.id}>
                        {discount.id} - ({discount.name})
                    </MenuItem>
                    )
                    )}
                    </TextField>
                </div>
                    <br/>
                <div className={classes.editItem}>
                    Current Price: {productToEdit.price} 
                    <br/>
                    <br/>
                    <TextField 
                    variant="outlined"
                    label="Edit Price"
                    onChange={function(event) {setPrice(event.target.value), console.log(price)}}/>
                </div>
                    <br/>
                <div className={classes.editItem}>
                    Current Quantity: {productToEdit.quantity} 
                    <br/>
                    <br/>
                    <TextField 
                    variant="outlined"
                    label="Edit Quantity"
                    onChange={function(event) {setQuantity(event.target.value), console.log(quantity)}}/>
                </div>
                    <br/>
                    <br/>
                <div className={classes.editItem}>
                    Current SKU: {productToEdit.sku}
                    <br/>
                    <br/>
                    <TextField 
                    variant="outlined"
                    label="Edit SKU"
                    onChange={function(event) {setSku(event.target.value), console.log(sku)}}/>
                </div>
                    <br/>

                    <Link to ="/admin/products">
                    <Button onClick={function(){editProduct(id, name, description, sku, category, price, discount, quantity)}}>Send</Button>
                    </Link>
                    <Link to ="/admin/products">
                    <Button>Cancel</Button>
                    </Link>

                    <br />
                    <br />
                    <Link to="/admin/products">
                    <Button onClick={function(){deleteProduct(id)}}>Delete This Product</Button>
                    </Link>
            </div>
        </div> 
    </>  
  )
}