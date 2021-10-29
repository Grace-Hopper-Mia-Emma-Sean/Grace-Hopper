import {delete_payment_details} from "../../api";
import {useState, useEffect} from "react";

export function DeletePaymentDetails() {
    const [ deletePaymentDetails, setDeletePaymentDetails ] = useState([])
        useEffect(() => {
            const fetchDeletePaymentDetails = async () => {
                const resp = await delete_payment_details ()
                console.log(resp) 
                setDeletePaymentDetails(resp.data)
                console.log(deletePaymentDetails)
            }
            fetchDeletePaymentDetails()
        },[])
        return (
            <>
                <form onSubmit={DeletePaymentDetails}>  
                    <div ClassName="DeletePaymentDetails">
                        <button type="submit"> Delete Payment Details</button>
    
                    </div>
                </form>
            </>
        )
  }
