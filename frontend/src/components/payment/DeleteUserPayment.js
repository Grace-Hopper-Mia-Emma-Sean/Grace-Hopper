import {delete_user_payment } from "../../api";
import {useState, useEffect} from "react";

export function DeleteUserPayment() {
    const [ deleteUserPayment, setDeleteUserPayment ] = useState([])
        useEffect(() => {
            const fetchDeleteUserPayment= async () => {
                const resp = await delete_user_payment  () 
                console.log(resp)
                setDeleteUserPayment(resp)
                console.log(deleteUserPayment)
            }
            fetchDeleteUserPayment()
        },[])
    return (
        <>
            <span> User Payment Deleted</span>
        </>
    )
  }
