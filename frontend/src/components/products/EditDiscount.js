import { Link, Redirect } from "react-router-dom";
import React, {useState, useEffect} from "react";

import {editDiscount, deleteDiscount} from '../../api'

import {TextField, makeStyles} from '../../MUI'

const useStyles = makeStyles((theme) => ({
    editdiscountform: {
        align: "center"
    },
    editItem: {
        marginBottom: '10'
    }
}))


export function EditDiscount({discountToEdit}){
    const classes = useStyles();

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [discountPercent, setDiscountPercent] = useState('')
  

    const id = discountToEdit.id

    return (
        <div className={classes.editdiscountform}>
            <div className={classes.editItem}>
                Now Editing: {discountToEdit.name} | ID: {discountToEdit.id}
                <br/>
                <br/>
                Edit Name: <TextField onChange={function(event) {setName(event.target.value), console.log(name)}}/>
            </div>
                <br/>
            <div className={classes.editItem}>
                Current Description: {discountToEdit.description}
                <br/>
                Edit Description: <TextField onChange={function(event) {setDescription(event.target.value), console.log(description)}} />
            </div>
                <br/>
                <div className={classes.editItem}>
                Current Percent: {discountToEdit.discount_percent}
                <br/>
                Edit Percent: <TextField onChange={function(event) {setDiscountPercent(event.target.value), console.log(description)}} />
            </div>
                <br/>
                <br/>
                <Link to ="/discounts">
                <button>Cancel</button>
                </Link>

                <Link to ="/discounts">
                <button onClick={function(){editDiscount(id, name, description, discountPercent)}}>Send</button>
                </Link>
                <br />
                <br />
                <Link to="/discounts">
                <button onClick={function(){deleteDiscount(id)}}>Delete This Discount</button>
                </Link>
        </div>
    )
}