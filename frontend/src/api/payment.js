import axios from "axios";


//Payment Details
const payment_details = async () => {
  return axios({
    method: "GET",
    url: "/payment-details",
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((error) => {
    console.error(error.response.data);
  })
  .then((response) => {
    const paymentDetails = response.data;
    console.log(response);
    localStorage.setItem("payment_details", JSON.stringify(paymentDetails));
    // localStorage.setItem("payment_details_Id", JSON.stringify(paymentDetails.map (paymentDetail => paymentDetail.id)));

  });
};

const edit_payment_details = async (id, orderId, amountPay, paymentProvider, statusPay) => {
  return axios({
    method: "PATCH",
    url: `/payment-details/${id}`,
    data: {
      order_id: orderId,
      amount: amountPay,
      provider: paymentProvider,
      status: statusPay,
    },
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((error) => {
    console.error(error.response.data);
  });
};

const delete_payment_details = async () => {
 const paymentDetailsId = localStorage.getItem("paymentDetailId")
  return axios({
    method: "DELETE",
    url: `/payment-details/${paymentDetailsId}`,
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((error) => {
    console.error(error.response.data);
  });
  
};

const create_payment_details = async (order_id,amount, provider, status) => {
  return axios({
    method: "POST",
    url: "/payment-details",
    data: {
      order_id: order_id,
      amount: amount,
      provider: provider,
      status: status,
    },
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((error) => {
    console.error(error.response.data);
  })
  
};

//User Payment

const user_payment = async () => {

  const token = localStorage.getItem("token");
  return axios({
    method: "GET",
    url: "/user-payment",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).catch((error) => {
    console.error(error.response.data);
  })
  .then((response) => {
    const userPayments = response.data;
    console.log(response);
    localStorage.setItem("userPayments", JSON.stringify(userPayments));
    localStorage.setItem("userPaymentId", JSON.stringify(userPayments.map (userPayment => userPayment.id)));

  });
};


const edit_user_payment = async (user_id,payment_type,provider,account_no,expiry) => {
  const token = localStorage.getItem("token");
  const userPaymentId = localStorage.getItem("user_paymentId")

  return axios({
    method: "PATCH",
    url: `/user-payment/${userPaymentId}`,
    data: {
      user_id: user_id,
      payment_type: payment_type,
      provider: provider,
      account_no: account_no,
      expiry: expiry,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).catch((error) => {
    console.error(error.response.data);
  });
};

const delete_user_payment = async (userPaymentId) => {
 const token = localStorage.getItem("token");

 return axios({
    method: "DELETE",
    url: `/user-payment/${userPaymentId}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).catch((error) => {
    console.error(error.response.data);
  });
};

const create_user_payment = async (id, user_id, payment_type, provider,account_no, expiry) => {
  const token = localStorage.getItem("token");
  return axios({
    method: "POST",
    url: "/user-payment",
    data: {
      id: id,
      user_id:user_id ,
      payment_type: payment_type,
      provider: provider,
      account_no: account_no,
      expiry:expiry,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).catch((error) => {
    console.error(error.response.data);
  });
};

export {
  payment_details,
  edit_payment_details,
  delete_payment_details,
  create_payment_details,
  user_payment,
  edit_user_payment,
  delete_user_payment,
  create_user_payment,
};
