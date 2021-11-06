import * as React from "react";

import {useState, useEffect} from 'react'
import {Link, Redirect} from "react-router-dom"

import {createCategory, getProductDiscounts, getProductCategories} from '../../api'

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

export function CreateCategory(){
    const classes = useStyles();

    const [name, setName] = useState('') 
    const [description, setDescription] = useState('')
    

    return (
        <>
            <div className={classes.title}>
                <h1>Add a New Category</h1>
            </div>
            <div className={classes.body}>
                <div className={classes.form}>
                    <div className={classes.addItem}>
                    <TextField 
                    variant="outlined"
                    label="Enter Name"
                    onChange={function(event) {setName(event.target.value)}}/>  
                    </div>
                    <br />
                    <div className={classes.addItem}>
                    <TextField 
                    variant="outlined"
                    label="Enter Description..."
                    onChange={function(event) {setDescription(event.target.value)}} />
                    </div>
                    <br />
                    <br />
                    <Link to ="/Categories">
                        <Button onClick={function(){createCategory(name, description)}}>Create Category</Button>
                    </Link>
                    <br />
                    <Link to ="/Categories">
                        <Button>Cancel</Button>
                    </Link>
                    
                    </div>
            </div>
        </>
    )
}