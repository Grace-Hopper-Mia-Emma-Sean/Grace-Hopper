import {delete_order_details } from "../../api";
import {useState, useEffect} from "react";

export function DeleteOrderDetails() {
    const [ deleteOrderDetails, setDeleteOrderDetails ] = useState([])
        useEffect(() => {
            const fetchDeleteOrderDetails = async () => {
                const resp = await delete_order_details () 
                console.log(resp)
                setDeleteOrderDetails(resp.data)
                console.log(deleteOrderDetails)
            }
            fetchDeleteOrderDetails()
        },[])
    return (
        <>
            <form onSubmit={DeleteOrderDetails}>  
                <div ClassName="DeleteOrderDetails">
                    <button type="submit"> Delete Order Details</button>

                </div>
            </form>
        </>
    )
  }
