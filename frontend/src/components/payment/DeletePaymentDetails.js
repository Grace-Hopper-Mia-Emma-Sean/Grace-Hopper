import { ClassNames } from "@emotion/react";
import { InsertEmoticon } from "@material-ui/icons";
import * as React from "react";
import { Link } from "react-router-dom";

import {delete_payment_details} from '../../api'
import { makeStyles} from '../MUI'

const useStyles = makeStyles((theme) => ({
    deletePaymentDetails: {
        align: "center"
    },
    editItem: {
        marginBottom: '10'
    }
}))


export function DeletePaymentDetails({paymentToDelete}){
    const classes = useStyles();
    const id = paymentToDelete.id

    return (
        <div className={classes.deletePaymentDetails}>
            <div className={classes.editItem}>
                Deleting Payment ID: {paymentToDelete.id}
                <br/>
                <br/>
            </div>
                <Link to ="/payment_details">
                <button>Cancel</button>
                </Link>

                <Link to ="/payment_details">
                <button onClick={function()
                    {delete_payment_details(id)}
                    }>Delete</button>
                </Link>
        </div>
    )
}