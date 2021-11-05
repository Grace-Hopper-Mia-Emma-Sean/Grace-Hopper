import * as React from "react";

import {useState, useEffect} from 'react'
import {Link, Redirect} from "react-router-dom"

import {createDiscount} from '../../api'

import {TextField, makeStyles, Button} from '../../MUI'

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

export function CreateDiscount(){
    const classes = useStyles();

    const [name, setName] = useState('') 
    const [description, setDescription] = useState('')
    const [discountPercent, setDiscountPercent] = useState('')
    

    return (
        <>
            <div className={classes.title}>
                <h1>Add a New Discount</h1>
            </div>
                <div className={classes.body}>
                    <div className={classes.form}>
                    <div className={classes.addItem}>
                        <TextField 
                        variant="outlined"
                        label="Enter Name"
                        onChange={function(event) {setName(event.target.value)}}/>
                    </div>
                        <br/>
                        <div className={classes.addItem}>
                        <TextField 
                        variant="outlined"
                        label="Enter Description..."
                        onChange={function(event) {setDescription(event.target.value)}} />
                        </div>
                        <br />
                        <div className={classes.addItem}>
                        <TextField 
                        variant="outlined"
                        label="Enter Disc. %"
                        onChange={function(event) {setDiscountPercent(event.target.value)}} />
                        </div>
                            <br/>
                            <br/>
                            <Link to ="/Discounts">
                            <Button onClick={function(){createDiscount(name, description, discountPercent)}}>Create Discount</Button>
                            </Link>
                            <br/>
                            <Link to ="/Discounts">
                            <Button>Cancel</Button>
                            </Link>

                           
                    </div>
                </div>

        </>
    )
}