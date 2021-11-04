import { Link, Redirect } from "react-router-dom";
import React, {useState, useEffect} from "react";

import {editCategory, deleteCategory} from '../../api'

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


export function EditCategory({categoryToEdit}){
    const classes = useStyles();

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
  

    const id = categoryToEdit.id

    return (
        <>
            <div className={classes.title}>
            <h1>Now Editing: {categoryToEdit.name} | ID: {categoryToEdit.id} </h1>
            </div>
            <div className={classes.body}>
                <div className={classes.form}>
                    <div className={classes.editItem}>
                        Current Name: {categoryToEdit.name}
                        <br />
                        <br />
                        <TextField 
                        variant="outlined"
                        label="Edit Name"
                        onChange={function(event) {setName(event.target.value), console.log(name)}}/>
                    </div>
                        <br/>
                    <div className={classes.editItem}>
                        Current Description: {categoryToEdit.description}
                        <br/>
                        <br />
                        <TextField 
                        variant="outlined"
                        label="Edit Description..."
                        onChange={function(event) {setDescription(event.target.value), console.log(description)}} />
                    </div>
                        <br/>
                        <br/>
                        <Link to ="/categories">
                        <Button onClick={function(){editCategory(id, name, description),console.log(id)}}>Send Edit</Button>
                        </Link>
                        <Link to ="/categories">
                        <Button>Cancel</Button>
                        </Link>
                        <br />
                        <br />
                        <Link to="/categories">
                        <Button onClick={function(){deleteCategory(id)}}>Delete This Category</Button>
                        </Link>
                </div>
            </div>
        </>
    )
}