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
            <span> Payment Details Editted</span>
            { editPaymentDetails && editPaymentDetails.map (editPaymentDetail => {
                return (
                    <div className="editPaymentDetail" key={editPaymentDetail.id}> 
                    <ul> ID: {editPaymentDetail.id} </ul>
                    </div>
                )
            })}
        </>
    )
  }
