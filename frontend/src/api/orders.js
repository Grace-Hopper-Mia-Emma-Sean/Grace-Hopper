import axios from "axios";

//Order Details

const order_details = async () => {
  return axios({
    method: "GET",
    url: "/order-details",
    headers: {
      "Content-Type": "application/json"
    },
  }).catch((error) => {
    console.error(error.response.data);
  });
};

const edit_order_details = async (user_id, payment_id, total) => {
  const orderDetailsId = localStorage.getItem("orderdetail_id")
  return axios({
      method: "PATCH",
      url: `/order-details/${orderDetailsId}`,
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
 const orderDetailsId = localStorage.getItem("orderdetail_id")
  return axios({
    method: "DELETE",
    url: `/order-details/${orderDetailsId}`,
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

const edit_order_items = async (order_id, product_id, quantity) => {
  const orderItemsId = localStorage.getItem("orderItemId")
  return axios({
      method: "PATCH",
      url: `/order-items/${orderItemsId}`,
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
 const orderItemsId = localStorage.getItem("orderItemId")

  return axios({
    method: "DELETE",
    url: `/order-items/${orderItemsId}`,
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
    url: "/order-items",
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
