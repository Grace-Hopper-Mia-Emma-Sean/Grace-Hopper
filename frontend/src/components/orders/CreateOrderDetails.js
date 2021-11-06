import { Link} from 'react-router-dom';
import { useState } from 'react';
import { Redirect } from 'react-router';

export function CreateOrderDetails ({}) {
    const [totalOf, setTotalOf] = useState('');
    const [userId, setUserId] = useState(0);
    const [paymentId, setPayment] = useState(0);

    const BASE_URL = 'https://pure-reaches-94902.herokuapp.com/api'

    const handleSubmit = async (event) => {
        event.preventDefault();
        
    try {
        fetch (`${BASE_URL}/order-details`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: {
                user_id: userId,
                payment_id: paymentId,
                total: totalOf
            }
        })
        .then(response => response.text())
        .then(result => {
            console.log(userId, paymentId, totalOf)
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
                <input type="text" name="userId" value={userId} placeholder="User ID" onChange={(event) => setUserId(event.target.value)}/>
                <br></br>
                <input type="text" name="paymentId" value={paymentId} placeholder="payment ID" onChange={(event) => setPayment(event.target.value)}/>
                <br></br>
                <input type="text" name="totalOf" value={totalOf} placeholder="total" onChange={(event) => setTotalOf(event.target.value)}/>
                <br></br>
                <button type="submit"> Create Order </button>

            </form>
            <h2> <Link to="/order_details"> View Orders </Link>  </h2>

        </div>)
    
}

