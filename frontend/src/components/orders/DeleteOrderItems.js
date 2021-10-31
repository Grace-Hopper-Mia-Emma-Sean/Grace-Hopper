import { ClassNames } from "@emotion/react";
import { InsertEmoticon } from "@material-ui/icons";
import * as React from "react";
import { useState, useEffect } from 'react'
import { Link, Redirect } from "react-router-dom";

import {delete_order_items} from '../../api'
import { makeStyles} from '../MUI'

const useStyles = makeStyles((theme) => ({
    deleteOrderItems: {
        align: "center"
    },
    editItem: {
        marginBottom: '10'
    }
}))

export function DeleteOrderItems({orderItemsToDelete}){
    const classes = useStyles();
    const id = orderItemsToDelete.id

    return (
        <div className={classes.deleteOrderItems}>
            <div className={classes.editItem}>
                Deleting Order Item ID: {orderItemsToDelete.id}
                <br/>
                <br/>
            </div>
                <Link to ="/order_items">
                <button>Cancel</button>
                </Link>

                <Link to ="/order_items">
                <button onClick={function()
                    {delete_order_items(id)} 
                    }>Delete</button>
                </Link>
        </div>
    )
}