import {create_user_payment  } from "../../api";
import {useState, useEffect} from "react";

export function CreateUserPayment() {
    const [ createUserPayment, setCreateUserPayment ] = useState([])
       
            const handleSubmit = async () => {
                const resp = await create_user_payment  () 
                console.log(resp)
                setCreateUserPayment(resp.data)
                console.log(createUserPayment)
                
            }
            
        
    return (
        <>
            <form onSubmit={handleSubmit}>  
                <div ClassName="CreateUserPayment">
                    <button type="submit" > Create User Payment</button>
                    
                </div>
            </form>

            {/* <span> User Payment Created</span>
            { createUserPayment && createUserPayment.map (createUserPay => {
                return (
                    <div className="createUserPay" key={createUserPay.id}> 
                    <ul> ID: {createUserPay.id} </ul>
                    </div>
                )
            })} */}
        </>
    )
  }
