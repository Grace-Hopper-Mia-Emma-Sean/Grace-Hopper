import {edit_order_items} from "../../api";
import {useState, useEffect} from "react";

export function EditOrderItems() {
    const [ editOrderItems, setEditOrderItems ] = useState([])
        useEffect(() => {
            const fetchEditOrderItems = async () => {
                const resp = await edit_order_items() 
                console.log(resp)
                setEditOrderItems(resp.data)
                console.log(editOrderItems)
            }
            fetchEditOrderItems()
        },[])
    return (
        <>
            <span> Order Items Editted </span>
            { editOrderItems && editOrderItems.map (editOrderItem => {
                return (
                    <div className="editOrderItem" key={editOrderItem.id}> 
                    <ul> ID: {editOrderItem.id} </ul>
                    </div>
                )
            })}
        </>
    )
  }
