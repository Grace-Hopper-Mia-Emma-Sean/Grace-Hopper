import axios from "axios";

//Order Details

const order_details = async () => {
  return axios({
    method: "GET",
    url: "/order-details",
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((error) => {
    console.error(error.response.data);
  });
};

const edit_order_details = async () => {};

const delete_order_details = async () => {};

const create_order_details = async (user_id, payment_id, total) => {
  return axios({
    method: "POST",
    url: "/order-details",
    data: {
      user_id: user_id,
      payment_id: payment_id,
      total: total,
    },
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((error) => {
    console.error(error.response.data);
  });
};

//OrderItems

const edit_order_items = async () => {};

const delete_order_items = async () => {};

const create_order_items = async () => {};

const order_items = async () => {
  return axios({
    method: "GET",
    url: "/order-items",
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((error) => {
    console.error(error.response.data);
  });
};

export {
  order_details,
  edit_order_details,
  delete_order_details,
  create_order_details,
  edit_order_items,
  delete_order_items,
  create_order_items,
  order_items,
};
