import { Link} from 'react-router-dom';
import { useState } from 'react';
import { Redirect } from 'react-router';

export function CreateOrderDetails ({}) {
    const [totalOf, setTotalOf] = useState('');
    const [userId, setUserId] = useState('');
    const [paymentId, setPayment] = useState('');

    const BASE_URL = 'https://pure-reaches-94902.herokuapp.com/api'

    const handleSubmit = async (event) => {
        event.preventDefault();
        
    try {
        await fetch (`${BASE_URL}/order-details`, {
            method: "POST",
            body: {
                user_id: userId,
                total: totalOf,
                payment_id: paymentId,
               
            }
        })
        .then(response => response.json())
        .then(result => {
            console.log(userId, totalOf, paymentId)
            console.log(result);
            })
        .catch(console.error);
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div classname="CreateOrderDetails"> 
            <h1> Add New Order </h1>
            <form onSubmit={handleSubmit}> 
                <input name="userId"  placeholder="User ID" onChange={(event) => setUserId(parseInt(event.target.value))}/>
                <br></br>
                <input name="paymentId" placeholder="payment ID" onChange={(event) => setPayment(parseInt(event.target.value))}/>
                <br></br>
                <input name="totalOf"  placeholder="total" onChange={(event) => setTotalOf(event.target.value)}/>
                <br></br>
                <button type="submit"> Create Order </button>

            </form>
            <h2> <Link to="/order_details"> View Orders </Link>  </h2>

        </div>)
    
}

