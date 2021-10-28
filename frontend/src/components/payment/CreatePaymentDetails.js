import {create_payment_details } from "../../api";
import {useState, useEffect} from "react";

export function CreatePaymentDetails() {
    const [ createPaymentDetails, setCreatePaymentDetails ] = useState([])
        useEffect(() => {
            const fetchCreatePaymentDetails = async () => {
                const resp = await create_payment_details () 
                console.log(resp)
                setCreatePaymentDetails(resp.data)
                console.log(createPaymentDetails)
            }
            fetchCreatePaymentDetails()
        },[])
    return (
        <>
            <span> Payment Details Created</span>
            { createPaymentDetails && createPaymentDetails.map (createPaymentDetail => {
                return (
                    <div className="createPaymentDetail" key={createPaymentDetail.id}> 
                    <ul> ID: {createPaymentDetail.id} </ul>
                    </div>
                )
            })}
        </>
    )
  }
