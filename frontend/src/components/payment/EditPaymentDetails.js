import {edit_payment_details} from "../../api";
import {useState, useEffect} from "react";

export function EditPaymentDetails() {
    const [ editPaymentDetails, setEditPaymentDetails ] = useState([])
        useEffect(() => {
            const fetchEditPaymentDetails = async () => {
                const resp = await edit_payment_details() 
                console.log(resp)
                setEditPaymentDetails(resp.data)
                console.log(editPaymentDetails)
            }
            fetchEditPaymentDetails()
        },[])
        return (
            <>
                <span> Edit Payment Details</span>
                <form onSubmit={EditPaymentDetails}>
                    <label> Hi </label>
    
                </form>
            </>
        )
  }
