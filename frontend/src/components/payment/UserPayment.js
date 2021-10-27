import {user_payment} from "../../api";
import {useState, useEffect} from "react";

export function UserPayment() {
    const [ userPayments, setUserPayment ] = useState([])
        useEffect(() => {
            const fetchUserPayment = async () => {
                const resp = await user_payment() 
                setUserPayment(resp.data)
                console.log(userPayments)
            }
            fetchUserPayment()
        },[])
    return (
        <>
            <span> User Payment</span>
            { userPayments.map (userPayment => {
                return (
                    <div className="order_details" key={userPayment.id}> 
                    <ul> User ID: {userPayment.user_id} </ul>
                    <ul> Payment_Type: {userPayment.paymnent_type} </ul>
                    <ul> Payment Option: {userPayment.provider} </ul>
                    <ul> Account Number: {userPayment.account_no} </ul>

                    </div>
                )
            })}
        </>
    )
  }