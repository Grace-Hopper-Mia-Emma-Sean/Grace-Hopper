import {create_user_payment  } from "../../api";
import {useState, useEffect} from "react";

export function CreateUserPayment() {
    const [ createUserPayment, setCreateUserPayment ] = useState([])
        useEffect(() => {
            const fetchCreateUserPayment = async () => {
                const resp = await create_user_payment  () 
                setCreateUserPayment(resp.data)
                console.log(createUserPayment)
            }
            fetchCreateUserPayment()
        },[])
    return (
        <>
            <span> User Payment Created</span>
            { createUserPayment && createUserPayment.map (createUserPay => {
                return (
                    <div className="createUserPay" key={createUserPay.id}> 
                    <ul> ID: {createUserPay.id} </ul>
                    </div>
                )
            })}
        </>
    )
  }
