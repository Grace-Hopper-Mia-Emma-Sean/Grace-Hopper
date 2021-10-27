import {delete_payment_details} from "../../api";
import {useState, useEffect} from "react";

export function DeletePaymentDetails() {
    const [ deletePaymentDetails, setDeletePaymentDetails ] = useState([])
        useEffect(() => {
            const fetchDeletePaymentDetails = async () => {
                const resp = await delete_payment_details () 
                setDeletePaymentDetails(resp.data)
                console.log(deletePaymentDetails)
            }
            fetchDeletePaymentDetails()
        },[])
    return (
        <>
            <span> Payment Details Deleted</span>
            { deletePaymentDetails && deletePaymentDetails.map (deletePaymentDetail => {
                return (
                    <div className="deletePaymentDetail" key={deletePaymentDetail.id}> 
                    <ul> ID: {deletePaymentDetail.id} </ul>
                    </div>
                )
            })}
        </>
    )
  }
