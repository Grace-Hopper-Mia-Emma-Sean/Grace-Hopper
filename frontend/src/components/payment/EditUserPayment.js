import {edit_user_payment} from "../../api";
import {useState, useEffect} from "react";

export function EditUserPayment() {
    const [ editUserPayment, setEditUserPayment ] = useState([])
        useEffect(() => {
            const fetchEditUserPayment = async () => {
                const resp = await edit_user_payment () 
                setEditUserPayment(resp.data)
                console.log(editUserPayment)
            }
            fetchEditUserPayment()
        },[])
    return (
        <>
            <span> User Payment Editted</span>
            { editUserPayment && editUserPayment.map (editUserPay => {
                return (
                    <div className="editUserPay" key={editUserPay.id}> 
                    <ul> ID: {editUserPay.id} </ul>
                    </div>
                )
            })}
        </>
    )
  }
