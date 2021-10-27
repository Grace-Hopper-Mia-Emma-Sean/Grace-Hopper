import {create_order_details} from "../../api";
import {useState, useEffect} from "react";

export function CreateOrderDetails() {
    const [ create_orderDetails, setCreateOrderDetails ] = useState([])
        useEffect(() => {
            const fetchCreateOrderDetails = async () => {
                const resp = await create_order_details() 
                console.log(resp)
                setCreateOrderDetails(resp.data)
                console.log(create_orderDetails)
            }
            fetchCreateOrderDetails()
        },[])
    return (
        <>
            <span> Order Details </span>
            { create_orderDetails && create_orderDetails.map (create_orderDetail => {
                return (
                    <div className="order_details" key={create_orderDetail.id}> 
                    <ul> ID: {create_orderDetail.id} </ul>
                    </div>
                )
            })}
        </>
    )
  }