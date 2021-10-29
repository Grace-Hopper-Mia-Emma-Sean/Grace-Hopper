import {order_details} from "../../api";
import {useState, useEffect} from "react";

export function OrderDetails() {
    const [ orderDetails, setOrderDetails ] = useState([])
        useEffect(() => {
            const fetchOrderDetails = async () => {
                const resp = await order_details() 
                console.log(resp)
                setOrderDetails(resp.data)
                console.log(orderDetails)
            }
            fetchOrderDetails()
        },[])
    return (
        <>
            <span>Order Details</span>
            {orderDetails.forEach(orderDetail => {
                localStorage.setItem("orderdetail_id", JSON.stringify(orderDetail.id))

            })}
            { orderDetails && orderDetails.map (orderDetail => {
                return (
                    <div className="order_details" key={orderDetail.id}> 
                    <ul> Order Details ID: {orderDetail.id} </ul>
                    <ul> Total: {orderDetail.total} </ul>
                    </div>
                )
            })}
        </>
    )
  }