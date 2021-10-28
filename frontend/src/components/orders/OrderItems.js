import {order_items} from "../../api";
import {useState, useEffect} from "react";

export function OrderItems() {
    const [ orderItems, setOrderItems ] = useState([])
        useEffect(() => {
            const fetchOrderItems = async () => {
                const resp = await order_items() 
                console.log(resp)
                setOrderItems(resp.data)
                console.log(orderItems)
            }
            fetchOrderItems()
        },[])
    return (
        <>
            <span>Order Items</span>
            { orderItems.map (orderItem => {
                return (
                    <div className="order_items" key={orderItem.id}> 
                    <ul> Product ID: {orderItem.product_id}</ul>
                    <ul> Order ID: {orderItem.order_id}</ul>
                    <ul> Quantity: {orderItem.quantity} </ul>
                    </div>
                )
            })}
        </>
    )
  }