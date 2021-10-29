import {payment_details} from "../../api";
import {useState, useEffect} from "react";

export function PaymentDetails() {
    const [ paymentDetails, setPaymentDetails ] = useState([])
        useEffect(() => {
            const fetchPaymentDetails = async () => {
                const resp = await payment_details() 
                console.log(resp)
                setPaymentDetails(resp.data)
                console.log(paymentDetails)
            }
            fetchPaymentDetails()
        },[])
    return (
        <>
            <span> Payment Details</span>
            {paymentDetails.forEach(paymentDetail => {
                localStorage.setItem("paymentDetailId", JSON.stringify(paymentDetail.id))

            })}

            { paymentDetails.map (paymentDetail => {
                return (
                    <div className="order_details" key={paymentDetail.id}> 
                    <ul> Payment ID: {paymentDetail.id} </ul>
                    <ul> Amount: {paymentDetail.amount} </ul>
                    <ul> Payment Option: {paymentDetail.provider} </ul>

                    </div>
                )
            })}
        </>
    )
  }