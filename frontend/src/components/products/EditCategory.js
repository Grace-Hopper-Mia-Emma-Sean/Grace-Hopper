import { Link, Redirect } from "react-router-dom";
import React, {useState, useEffect} from "react";

import {editCategory, deleteCategory} from '../../api'

import {TextField, makeStyles} from '../../MUI'

const useStyles = makeStyles((theme) => ({
    editcategoryform: {
        align: "center"
    },
    editItem: {
        marginBottom: '10'
    }
}))


export function EditCategory({categoryToEdit}){
    const classes = useStyles();

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
  

    const id = categoryToEdit.id

    return (
        <div className={classes.editcategoryform}>
            <div className={classes.editItem}>
                Now Editing: {categoryToEdit.name} | ID: {categoryToEdit.id}
                <br/>
                <br/>
                Edit Name: <TextField onChange={function(event) {setName(event.target.value), console.log(name)}}/>
            </div>
                <br/>
            <div className={classes.editItem}>
                Current Description: {categoryToEdit.description}
                <br/>
                Edit Description: <TextField onChange={function(event) {setDescription(event.target.value), console.log(description)}} />
            </div>
                <br/>
                <br/>
                <Link to ="/categories">
                <button>Cancel</button>
                </Link>

                <Link to ="/categories">
                <button onClick={function(){editCategory(id, name, description),console.log(id)}}>Send</button>
                </Link>
                <br />
                <br />
                <Link to="/categories">
                <button onClick={function(){deleteCategory(id)}}>Delete This Category</button>
                </Link>
        </div>
    )
}