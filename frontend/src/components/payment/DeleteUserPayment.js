import {delete_user_payment } from "../../api";
import {useState, useEffect} from "react";

export function DeleteUserPayment({userPaymentId}) {
    const [ deleteUserPayment, setDeleteUserPayment ] = useState([])
        
        const handleSubmit = (event)=> {
            event.preventDefault();

            delete_user_payment(userPaymentId) 
        }
       
    return (
        <>
            <form onSubmit={handleSubmit}>  
                <div ClassName="DeleteUserPayment">
                    <button type="submit" > Delete User Payment</button>
                    
                </div>
            </form>
        </>
    )
  }
