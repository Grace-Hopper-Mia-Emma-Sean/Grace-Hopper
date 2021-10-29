import {delete_order_items} from "../../api";
import {useState, useEffect} from "react";

export function DeleteOrderItems() {
    const [ deleteOrderItems, setDeleteOrderItems ] = useState([])
        useEffect(() => {
            const fetchDeleteOrderItems = async () => {
                const resp = await delete_order_items() 
                console.log(resp)
                setDeleteOrderItems(resp)
                console.log(deleteOrderItems)
            }
            fetchDeleteOrderItems()
        },[])
    return (
        <>
            <form onSubmit={DeleteOrderItems}>  
                <div ClassName="DeleteOrderItems">
                    <button type="submit"> Delete Order Items</button>

                </div>
            </form>
        </>
    )
  }
