import * as React from "react";

import {useState, useEffect} from 'react'
import {Link, Redirect} from "react-router-dom"

import {createCategory} from '../../api'

import {TextField, makeStyles} from '../../MUI'

const useStyles = makeStyles((theme) => ({
    addcategoryform: {
        align: "center"
    },
    addItem: {
        marginBottom: '10'
    }
}))

export function CreateCategory(){
    const classes = useStyles();

    const [name, setName] = useState('') 
    const [description, setDescription] = useState('')
    

    return (
        <div className={classes.addcategoryform}>
            <div className={classes.addItem}>
                Add a New Category
                <br/>
                <br/>
            </div>
                Name: <TextField onChange={function(event) {setName(event.target.value)}}/>
                <br/>
            <div className={classes.addItem}>
                Description: <TextField onChange={function(event) {setDescription(event.target.value)}} />
            </div>
                <br/>
                <br/>
                <Link to ="/Categories">
                <button>Cancel</button>
                </Link>

                <Link to ="/Categories">
                <button onClick={function(){createCategory(name, description)}}>Create Category</button>
                </Link>
        </div>
    )
}