import axios from "axios";

//Order Details

const OrderDetails = async () => {
    return axios({
      method: "GET",
      url: "/order_details"
    }).catch((error) => {
      console.error(error.response.data);
    });
  };

  const EditOrderDetails = async () => {
    
};

  const DeleteOrderDetails = async () => {
    
};

  const CreateOrderDetails = async () => {
    
  };


//OrderItems

const EditOrderItems = async () => {
    
};

  const DeleteOrderItems = async () => {
    
};

  const CreateOrderItems = async () => {
    
  };

  const OrderItems = async () => {
    
};

  export { 
      OrderDetails, 
      EditOrderDetails, 
      DeleteOrderDetails, 
      CreateOrderDetails, 
      EditOrderItems, 
      DeleteOrderItems, 
      OrderItems,
      CreateOrderItems
     };