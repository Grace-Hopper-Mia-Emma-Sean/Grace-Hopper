import * as React from "react";

import {useState, useEffect} from 'react'
import {Link, Redirect} from "react-router-dom"

import {createProduct} from '../../api'

import {TextField, makeStyles} from '../MUI'

const useStyles = makeStyles((theme) => ({
    addproductform: {
        align: "center"
    },
    addItem: {
        marginBottom: '10'
    }
}))

export function CreateProduct(){
    const classes = useStyles();

    const [name, setName] = useState('') 
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [discount, setDiscount] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const [sku, setSku] = useState('')

    return (
        <div className={classes.addproductform}>
            <div className={classes.addItem}>
                Add a New Product
                <br/>
                <br/>
            </div>
                Name: <TextField onChange={function(event) {setName(event.target.value), console.log(name)}}/>
                <br/>
            <div className={classes.addItem}>
                Category: <TextField onChange={function(event) {setCategory(event.target.value), console.log(category)}}/>
            </div>
                <br/>
            <div className={classes.addItem}>
                Description: <TextField onChange={function(event) {setDescription(event.target.value), console.log(description)}} />
            </div>
                <br/>
            <div className={classes.addItem}>
                Discount: <TextField onChange={function(event) {setDiscount(event.target.value), console.log(discount)}}/>
            </div>
                <br/>
            <div className={classes.addItem}>
                Price: <TextField onChange={function(event) {setPrice(event.target.value), console.log(price)}}/>
            </div>
                <br/>
            <div className={classes.addItem}>
                Quantity: <TextField onChange={function(event) {setQuantity(event.target.value), console.log(quantity)}}/>
            </div>
                <br/>
            <div className={classes.addItem}>
                SKU: <TextField onChange={function(event) {setSku(event.target.value), console.log(sku)}}/>
            </div>
                <br/>
                <Link to ="/admin/products">
                <button>Cancel</button>
                </Link>

                <Link to ="/admin/products">
                <button onClick={function(){createProduct(name, description, sku, category, price, discount, quantity)}}>Create Product</button>
                </Link>
        </div>
    )
}