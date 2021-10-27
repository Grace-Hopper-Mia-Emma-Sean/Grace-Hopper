import {edit_order_details} from "../../api";
import {useState, useEffect} from "react";

export function EditOrderDetails() {
    const [ editOrderDetails, setEditOrderDetails ] = useState([])
        useEffect(() => {
            const fetchEditOrderDetails = async () => {
                const resp = await edit_order_details() 
                console.log(resp)
                setEditOrderDetails(resp.data)
                console.log(editOrderDetails)
            }
            fetchEditOrderDetails()
        },[])
    return (
        <>
            <span> Order Items Editted </span>
            { editOrderDetails && editOrderDetails.map (editOrderDetail => {
                return (
                    <div className="editOrderDetail" key={editOrderDetail.id}> 
                    <ul> ID: {editOrderDetail.id} </ul>
                    </div>
                )
            })}
        </>
    )
  }
