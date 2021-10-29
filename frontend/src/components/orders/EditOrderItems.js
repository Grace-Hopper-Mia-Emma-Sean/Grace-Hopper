import {edit_order_items} from "../../api";
import {useState, useEffect} from "react";

export function EditOrderItems() {
    const [ editOrderItems, setEditOrderItems ] = useState([])
        useEffect(() => {
            const fetchEditOrderItems = async () => {
                const resp = await edit_order_items() 
                console.log(resp)
                setEditOrderItems(resp)
                console.log(editOrderItems)
            }
            fetchEditOrderItems()
        },[])
        return (
            <>
                <span> Edit Order Item </span>
                <form onSubmit={EditOrderItems}>
                    <label> Hi </label>
    
                </form>
            </>
        )
  }
