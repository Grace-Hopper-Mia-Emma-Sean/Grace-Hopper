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
            <span> Order Details Deleted </span>
            { deleteOrderDetails && deleteOrderDetails.map (deleteOrderDetail => {
                return (
                    <div className="orderDetailsDeleted" key={deleteOrderDetail.id}> 
                    <ul> ID: {deleteOrderDetail.id} </ul>
                    </div>
                )
            })}
        </>
    )
  }
