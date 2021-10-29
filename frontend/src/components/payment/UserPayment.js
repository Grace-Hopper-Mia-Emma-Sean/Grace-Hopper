import {user_payment} from "../../api";
import {useState, useEffect} from "react";
import { EditUserPayment } from "..";

export function UserPayment({loggedIn, token}) {
    const [ userPayments, setUserPayment ] = useState([])
        useEffect(() => {
            const fetchUserPayment = async () => {
                const resp = await user_payment() 
                console.log(resp)
                setUserPayment(resp.data)
                console.log(userPayments)
            }
            fetchUserPayment()
        },[])
    
    return (
        <>
            <h1> User Payment</h1>
            { userPayments && userPayments.map (userPayment => {
                return (
                    <div className="order_details" key={userPayment.id}> 
                    <h2> ID: {userPayment.id} </h2>
                    <h2> Payment_Type: {userPayment.paymnent_type} </h2>
                    <h2> Payment Option: {userPayment.provider} </h2>
                    <h2> Account Number: {userPayment.account_no} </h2>
                    {loggedIn ? <EditUserPayment userPaymentId={userPayment.id} token={token}/> :null}

                    </div>
                )
            })}
        </>
    )
  }