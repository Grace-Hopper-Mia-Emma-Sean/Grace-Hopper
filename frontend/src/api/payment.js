import axios from "axios";

//Payment Details
const PaymentDetails = async () => {
    return axios({
        method: "GET",
        url: "/payment_details",
        // data: {
          
        // },
        // headers: {
        //   "Content-Type": "application/json",
        // },
      }).catch((error) => {
        console.error(error.response.data);
      });
};

  const EditPaymentDetails = async () => {
    
};

  const DeletePaymentDetails = async () => {
    
  };

  const CreatePaymentDetails = async () => {
    
};


//User Payment

const UserPayment = async () => {
    
};

  const EditUserPayment = async () => {
    
};

  const DeleteUserPayment = async () => {
    
  };

  const CreateUserPayment = async () => {
    
};

export {
    PaymentDetails,
    EditPaymentDetails,
    DeletePaymentDetails,
    CreatePaymentDetails,
    UserPayment,
    EditUserPayment,
    DeleteUserPayment,
    CreateUserPayment
};