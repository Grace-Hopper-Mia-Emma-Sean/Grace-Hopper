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
  })
  .then((response) => {
    const orderDetails = response.data;
    localStorage.setItem("orderDetails", JSON.stringify(orderDetails));

  });
};

const edit_order_details = async (id, userId, paymentId, totalOf) => {
  return axios({
      method: "PATCH",
      url: `/order-details/${id}`,
      data: {
        user_id: userId,
        payment_id: paymentId,
        total: totalOf
      },
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => {
      console.error(error.response.data);
    });
};

const delete_order_details = async (id) => {

  return axios({
    method: "DELETE",
    url: `/order-details/${id}`,
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((error) => {
    console.error(error.response);
  }).then((response) => {
    console.log("Order Deleted", response)
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
  }).then((response) => {
    console.log("Order Created",response)
  });
};

//OrderItems

const edit_order_items = async (id, orderId, productId, quantityOf) => {

  return axios({
      method: "PATCH",
      url: `/order-items/${id}`,
      data: {
      order_id: orderId,
      product_id: productId,
      quantity: quantityOf,
      },
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => {
      console.error(error.response.data);
    });
};


const delete_order_items = async (id) => {

  return axios({
    method: "DELETE",
    url: `/order-items/${id}`,
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
  })
  .then((response) => {
    const orderItems = response.data;
    console.log(response);
    localStorage.setItem("orderItems", JSON.stringify(orderItems));

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
