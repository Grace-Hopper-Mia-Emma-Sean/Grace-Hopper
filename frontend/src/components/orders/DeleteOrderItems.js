import {delete_order_items  } from "../../api";
import {useState, useEffect} from "react";

export function DeleteOrderItems() {
    const [ deleteOrderItems, setDeleteOrderItems ] = useState([])
        useEffect(() => {
            const fetchDeleteOrderItems = async () => {
                const resp = await delete_order_items() 
                console.log(resp)
                setDeleteOrderItems(resp.data)
                console.log(deleteOrderItems)
            }
            fetchDeleteOrderItems()
        },[])
    return (
        <>
            <span> Order Items Deleted </span>
            { deleteOrderItems && deleteOrderItems.map (deleteOrderItem => {
                return (
                    <div className="orderItemsDeleted" key={deleteOrderItem.id}> 
                    <ul> ID: {deleteOrderItem.id} </ul>
                    </div>
                )
            })}
        </>
    )
  }
