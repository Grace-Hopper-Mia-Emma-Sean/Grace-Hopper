import {edit_order_details} from "../../api";
import {useState, useEffect} from "react";

export function EditOrderDetails() {
    const [ total, setTotal] = useState('')
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
            <span> Edit Order Details </span>
            <form onSubmit={EditOrderDetails}>
                <label> Total </label>
                {/* <input type="text" name="total" value={total} onChange={(event)=> setTotal(event.target.value)}> </input> */}

            </form>
        </>
    )
  }
  
