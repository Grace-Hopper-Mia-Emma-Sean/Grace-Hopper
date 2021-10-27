import axios from "axios";

//Order Details

const order_details = async () => {
  return axios({
    method: "GET",
    url: "/order_details",
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((error) => {
    console.error(error.response.data);
  });
};

const edit_order_details = async (user_id, payment_id, total) => {
  return axios({
      method: "PATCH",
      url: `/order_details/${orderDetailsId}`,
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

const delete_order_details = async () => {
  return axios({
    method: "DELETE",
    url: `/order_details/${orderDetailsId}`,
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((error) => {
    console.error(error.response.data);
  });
};

const create_order_details = async (user_id, payment_id, total) => {
  return axios({
    method: "POST",
    url: "/order_details",
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

const edit_order_items = async (order_id, product_id, quantity) => {
  return axios({
      method: "PATCH",
      url: `/order_items/${orderItemsId}`,
      data: {
       order_id: order_id,
      product_id: product_id,
      quantity: quantity,
      },
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => {
      console.error(error.response.data);
    });
};

const delete_order_items = async () => {
  return axios({
    method: "DELETE",
    url: `/order_items/${orderItemsId}`,
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((error) => {
    console.error(error.response.data);
  });
};

const create_order_items = async (order_id, product_id, quantity) => {
  return axios({
    method: "POST",
    url: "/order_items",
    data: {
      order_id: order_id,
      product_id: product_id,
      quantity: quantity,
    },
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((error) => {
    console.error(error.response.data);
  });
};

const order_items = async () => {
  return axios({
    method: "GET",
    url: "/order_items",
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
