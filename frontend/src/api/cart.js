import axios from "axios";

const createCartItem = async (userId, productId, quantity) => {
  return axios({
    method: "POST",
    url: `/cart/${userId}`,
    data: {
      productId: productId,
      quantity: quantity,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .catch((error) => {
      throw error.response.data.error;
    })
    .then((response) => {
      response.data; // find a way to avoid having to use alert
      return alert("cart item successfully added");
    });
};

const getCartItems = async (token) => {
  return axios({
    method: "GET",
    url: "/cart-items",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .catch((error) => {
      throw error.response.data.error;
    })
    .then((response) => {
      response.data;
      console.log(response);
      localStorage.setItem("cart", JSON.stringify(response.data));
    });
};

const getCartItemsByUserId = async (token) => {
  return axios({
    method: "GET",
    url: `/cart/${userId}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .catch((error) => {
      throw error.response.data.error;
    })
    .then((response) => response.data);
};

const updateCartItems = async (token, userId, productId, quantity) => {
  return axios({
    method: "PATCH",
    url: `cart/${userId}`,
    data: {
      productId: productId,
      quantity: quantity,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .catch((error) => console.error(error.response.data))
    .then((response) => {
      response.data;
      // find a way to avoid having to use alert
      return alert("cart item successfully updated");
    });
};

const deleteCartItem = async (token, userId, productId, quantity) => {
  return axios({
    method: "DELETE",
    url: `cartitems/${userId}`,
    data: { id: userId },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .catch((error) => console.error(error.response.data))
    .then((response) => {
      response.data;
      // find a way to avoid having to use alert
      return alert("cart item successfully deleted");
    });
};

export {
  createCartItem,
  getCartItems,
  getCartItemsByUserId,
  updateCartItems,
  deleteCartItem,
};
