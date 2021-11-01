import { ClassNames } from "@emotion/react";
import { InsertEmoticon } from "@material-ui/icons";
import * as React from "react";
import { useState, useEffect } from 'react'
import { Link, Redirect } from "react-router-dom";

import {edit_order_items} from '../../api'

import {TextField, makeStyles} from '../MUI'



const useStyles = makeStyles((theme) => ({
    editOrderItems: {
        align: "center"
    },
    editItem: {
        marginBottom: '10'
    }
}))

// method: "PATCH",
// url: `/order-items/${id}`,
// data: {
// order_id: order_id,
// product_id: product_id,
// quantity: quantity,
// },

export function EditOrderItems({orderItemsToEdit, orderDetailsToEdit, productToEdit}){
    const classes = useStyles();

    const productId = productToEdit.id
    console.log(productToEdit.id)
    const id = orderItemsToEdit.id
    const orderId = orderDetailsToEdit.id
    const [quantityOf, setQuantityOf] = useState('')


    return (
        <div className={classes.editOrderItems}>
            <div className={classes.editItem}>
                Now Editing Order ID: {orderItemsToEdit.id}
                <br/>
                <br/>
                Now Editing Detail ID: {orderDetailsToEdit.id}
            </div>

            <div className={classes.editItem}>
                Product ID Editting: {productToEdit.id}
            </div>

            <div className={classes.editItem}>
                Current Quantity: {orderItemsToEdit.quantity}
                <br/>
                Edit Quantity: <TextField onChange={function(event) {setQuantityOf(event.target.value)}}/>
            </div>
                <br/>
                
                <Link to ="/order_items">
                <button>Cancel</button>
                </Link>

                <Link to ="/order_items">
                <button onClick={function()
                    {edit_order_items(id, orderId, productId, quantityOf)} 
                    }>Edit Order Item</button>
                </Link>
        </div>
    )
}
