// import {edit_user_payment} from "../../api";
import axios from "axios";
import {useState, useEffect} from "react";


export function EditUserPayment({userPaymentId, token}) {
    const [userId, setUserId] = useState('')
    const [paymentType, setPaymentType] = useState('')
    const [paymentProvider, setPaymentProvider] = useState('')
    const [accountNo, setAccountNo] = useState('')
    const [expireDate, setExpireDate] = useState('')
    const [editUserPayment, setEditUserPayment ] = useState(false)

    // const token = localStorage.getItem("token");
    // const userPaymentId = localStorage.getItem("user_paymentId")


        useEffect(() => {
            
            return axios({
                method: "PATCH",
                url: `/user-payment/${userPaymentId}`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    
                    user_id: userId,
                    payment_type: paymentType,
                    provider: paymentProvider,
                    account_no: accountNo,
                    expiry: expireDate,
                
                    })
                }) .then (response => {
                    console.log(response)
                    setEditUserPayment(true)
                    
                })
                .catch((error) => {
                    console.error(error.response.data);
                    });
        
        },[])
    return (
        <>
            <span> Edit User Payment </span>
            <form onSubmit={EditUserPayment}>
                <label> User ID </label>
                <input type="text" name="user_id" value={userId} onChange={(event)=> setUserId(event.target.value)}></input>
            
                <label> Payment Type </label>
                <input type="text" name="payment_type" value={paymentType} onChange={(event)=> setPaymentType(event.target.value)}></input>
            
                <label> Payment Provider </label>
                <input type="text" name="provider" value={paymentProvider} onChange={(event)=> setPaymentProvider(event.target.value)}></input>
            
                <label> Account Number </label>
                <input type="text" name="account_no" value={accountNo} onChange={(event)=> setAccountNo(event.target.value)}></input>
            
                <label> Expiration Date </label>
                <input type="text" name="expiry" value={expireDate} onChange={(event)=> setExpireDate(event.target.value)}></input>

                <button type="submit"> Pay Up!!</button>
            </form>

                {/* {editUserPayment ? alert ("You've successfully paid us for what you bought!") : null} */}
        </>
    )
  }


  