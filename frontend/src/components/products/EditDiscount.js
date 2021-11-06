import { Link, Redirect } from "react-router-dom";
import React, {useState, useEffect} from "react";

import {editDiscount, deleteDiscount} from '../../api'

import {TextField, makeStyles, Button, Typography} from '../../MUI'

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


export function EditDiscount({discountToEdit}){
    const classes = useStyles();

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [discountPercent, setDiscountPercent] = useState('')
  

    const id = discountToEdit.id

    return (
        <>
            <div className={classes.title}>
            <h1>Now Editing: <Typography color='red' fontSize={'25px'}> {discountToEdit.name} | ID: {discountToEdit.id}</Typography> </h1>
            </div>
            <div className={classes.body}>
                <div className={classes.form}>
                    <div className={classes.editItem}>
                        Current Name: {discountToEdit.name}
                        <br/>
                        <br/>
                        <TextField 
                        variant="outlined"
                        label="Edit Name..."
                        onChange={function(event) {setName(event.target.value), console.log(name)}}/>
                    </div>
                    <br />
                    <div className={classes.editItem}>
                        Current Description: {discountToEdit.description}
                        <br/>
                        <br/>
                        <TextField 
                        variant="outlined"
                        label="Edit Description..."
                        onChange={function(event) {setDescription(event.target.value), console.log(description)}} />
                    </div>
                    <br />
                    <div className={classes.editItem}>
                        Current Percent: {discountToEdit.discount_percent}
                        <br/>
                        <br />
                        <TextField 
                        variant="outlined"
                        label="Edit Disc. %..."
                        onChange={function(event) {setDiscountPercent(event.target.value), console.log(description)}} />
                    </div>
                        <br/>
                        <br/>
                        <Link to ="/discounts">
                        <Button onClick={function(){editDiscount(id, name, description, discountPercent)}}>Send</Button>
                        </Link>
                        <br />
                        <Link to ="/discounts">
                        <Button>Cancel</Button>
                        </Link>
                        <br />
                        <br />
                        <Link to="/discounts">
                        <Button onClick={function(){deleteDiscount(id)}}>Delete This Discount</Button>
                        </Link>
                </div>
            </div>
        </>
    )
}