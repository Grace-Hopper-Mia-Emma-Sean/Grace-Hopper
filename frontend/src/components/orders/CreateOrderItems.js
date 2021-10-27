import {create_order_items } from "../../api";
import {useState, useEffect} from "react";

export function CreateOrderItems() {
    const [ create_orderItems, setCreateOrderItems ] = useState([])
        useEffect(() => {
            const fetchCreateOrderItems = async () => {
                const resp = await create_order_items() 
                console.log(resp)
                setCreateOrderItems(resp.data)
                console.log(create_orderItems)
            }
            fetchCreateOrderItems()
        },[])
    return (
        <>
            <span> Order Items </span>
            { create_orderItems && create_orderItems.map (create_orderItem => {
                return (
                    <div className="order_items" key={create_orderItem.id}> 
                    <ul> ID: {create_orderItem.id} </ul>
                    </div>
                )
            })}
        </>
    )
  }
