import {delete_user_payment } from "../../api";
import {useState, useEffect} from "react";

export function DeleteUserPayment() {
    const [ deleteUserPayment, setDeleteUserPayment ] = useState([])
        useEffect(() => {
            const fetchDeleteUserPayment= async () => {
                const resp = await delete_user_payment  () 
                setDeleteUserPayment(resp.data)
                console.log(deleteUserPayment)
            }
            fetchDeleteUserPayment()
        },[])
    return (
        <>
            <span> User Payment Deleted</span>
            { deleteUserPayment && deleteUserPayment.map (deleteUserPay => {
                return (
                    <div className="deleteUserPay" key={deleteUserPay.id}> 
                    <ul> ID: {deleteUserPay.id} </ul>
                    </div>
                )
            })}
        </>
    )
  }
