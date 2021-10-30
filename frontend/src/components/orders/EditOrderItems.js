import axios from "axios";
import {useState, useEffect} from "react";


export function EditOrderItems({orderItemsId}) {
    const [orderId, setOrderId] = useState('')
    const productId = localStorage.getItem('product')
    const [quantityOf, setQuantityOf] = useState('')
    const [editOrderItems, setEditOrderItems ] = useState(false)

        useEffect(() => {
            return axios({
                method: "PATCH",
                url: `/order-items/${orderItemsId}`,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    
                    order_id: orderId,
                    product_id: productId,
                    quantity: quantityOf,
                
                    })
                }) .then (response => {
                    console.log(response)
                    setEditOrderItems(true)
                    
                })
                .catch((error) => {
                    console.error(error.response.data);
                    });
        },[])

    return (
        <>
            <span> Edit Order Items </span>
            <form onSubmit={EditOrderItems}>
                <label> Order ID </label>
                <input type="text" name="order_id" value={orderId} onChange={(event)=> setOrderId(event.target.value)}></input>
            
                <label> Product ID {productId} </label>
            
                <label> Quantity </label>
                <input type="text" name="quantity" value={quantityOf} onChange={(event)=> setQuantityOf(event.target.value)}></input>
            
                <button type="submit"> Edit Order Items</button>
            </form>

                {/* {editOrderItems ? alert ("You've successfully edit your order!") : null} */}
        </>
    )
  }


  