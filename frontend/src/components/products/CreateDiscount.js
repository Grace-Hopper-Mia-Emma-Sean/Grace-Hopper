import * as React from "react";

import {useState, useEffect} from 'react'
import {Link, Redirect} from "react-router-dom"

import {createDiscount} from '../../api'

import {TextField, makeStyles} from '../../MUI'

const useStyles = makeStyles((theme) => ({
    adddiscountform: {
        align: "center"
    },
    addItem: {
        marginBottom: '10'
    }
}))

export function CreateDiscount(){
    const classes = useStyles();

    const [name, setName] = useState('') 
    const [description, setDescription] = useState('')
    const [discountPercent, setDiscountPercent] = useState('')
    

    return (
        <div className={classes.adddiscountform}>
            <div className={classes.addItem}>
                Add a New Discount
                <br/>
                <br/>
            </div>
                Name: <TextField onChange={function(event) {setName(event.target.value)}}/>
                <br/>
            <div className={classes.addItem}>
                Description: <TextField onChange={function(event) {setDescription(event.target.value)}} />
            </div>
            <div className={classes.addItem}>
                Discount Percent: <TextField onChange={function(event) {setDiscountPercent(event.target.value)}} />
            </div>
                <br/>
                <br/>
                <Link to ="/Discounts">
                <button>Cancel</button>
                </Link>

                <Link to ="/Discounts">
                <button onClick={function(){createDiscount(name, description, discountPercent)}}>Create Discount</button>
                </Link>
        </div>
    )
}