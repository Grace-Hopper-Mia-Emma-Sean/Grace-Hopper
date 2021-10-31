import { ClassNames } from "@emotion/react";
import { InsertEmoticon } from "@material-ui/icons";
import * as React from "react";
import { useState, useEffect } from 'react'
import { Link, Redirect } from "react-router-dom";

import {edit_user_payment} from '../../api'

import {TextField, makeStyles} from '../MUI'



const useStyles = makeStyles((theme) => ({
    editUserPayment: {
        align: "center"
    },
    editItem: {
        marginBottom: '10'
    }
}))

export function EditUserPayment({userPaymentToEdit}){
    const classes = useStyles();

    const userId = localStorage.getItem('id')
    const [paymentType, setPaymentType] = useState('')
    const [paymentProvider, setPaymentProvider] = useState('')
    const [accountNo, setAccountNo] = useState('')
    const [expireDate, setExpireDate] = useState('')

    const id = paymentToEdit.id

//   return axios({
//     method: "PATCH",
//     url: `/user-payment/${id}`,
//     data: {
//       user_id: user_id,
//       payment_type: payment_type,
//       provider: provider,
//       account_no: account_no,
//       expiry: expiry,
//     },

    return (
        <div className={classes.userPaymentToEdit}>
            <div className={classes.editItem}>
                Now Editing User Payment ID: {paymentToEdit.id}
                <br/>
                <br/>
                Edit Payment Type: <TextField onChange={function(event) {setPaymentType(event.target.value)}}/>
            </div>

            <div className={classes.editItem}>
                Now Editing Payment Provide: {paymentToEdit.provider}
                <br/>
                <br/>
                Edit Payment Provider: <TextField onChange={function(event) {setPaymentProvider(event.target.value)}}/>
            </div>

                <br/>
            <div className={classes.editItem}>
                Current Account Number: {paymentToEdit.account_no}
                <br/>
                Edit Account Number: <TextField onChange={function(event) {setAccountNo(event.target.value)}}/>
            </div>
                <br/>
            <div className={classes.editItem}>
                Current Expiration Date: {paymentToEdit.expiry}
                <br/>
                Edit Expiration Date: <TextField onChange={function(event) {setExpireDate(event.target.value)}}/>

            </div>
                
                <Link to ="/user_payment">
                <button>Cancel</button>
                </Link>

                <Link to ="/user_payment">
                <button onClick={function()
                    {edit_user_payment(id, userId, paymentType, paymentProvider, accountNo, expireDate)} 
                    }>Edit User Payment</button>
                </Link>
        </div>
    )
}