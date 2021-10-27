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
  });
};

const edit_payment_details = async () => {};

const delete_payment_details = async () => {};

const create_payment_details = async () => {};

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
  });
};

const edit_user_payment = async () => {};

const delete_user_payment = async () => {};

const create_user_payment = async () => {};

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
