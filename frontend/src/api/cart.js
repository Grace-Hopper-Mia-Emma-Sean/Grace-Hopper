import axios from "axios";

const createCartItem = async (productId, quantity, userId) => {
  console.log(productId, quantity, userId);
  return axios({
    method: "POST",
    url: `/cart-items/${userId}`,
    data: {
      product_id: productId,
      quantity: quantity,
      user_id: userId,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).catch((error) => console.error(error.response.data));
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
      console.error(error.response.data.error);
    })
    .then((response) => {
      response.data;
      console.error(response);
      localStorage.setItem("cart", JSON.stringify(response.data));
    });
};

const getCartItemsByUserId = async (token, id) => {
  return axios({
    method: "GET",
    url: `/cart-items/${id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .catch((error) => {
      console.error(error.response.data.error);
    })
    .then((response) => {
      if (response) {
        response.data;
        localStorage.setItem("cart", JSON.stringify(response.data));
      } else {
        console.log("No Cart Items");
      }
    });
};

const updateCartItem = async (cartItemsId, quantity, userId) => {
  return axios({
    method: "PATCH",
    url: `cart-items/${cartItemsId}/${userId}`,
    data: {
      quantity: quantity,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .catch((error) => console.error(error))
    .then((response) => {
      response.data.cartChanges;
      // })
      // .then(() => {
      //   getCartItemsByUserId(localStorage.token, localStorage.id);
      //   if (response) localStorage.setItem("cart", JSON.stringify(response.data));
      // })
      // .catch((error) => {
      //   console.error(error);
    });
};

const deleteCartItem = async (cartId) => {
  return axios({
    method: "DELETE",
    url: `cart-items/${cartId}`,
    data: { user_id: cartId },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .catch((error) => console.error(error.response.data.error))
    .then((response) => {
      console.log(response);
      window.location.reload(true);
      console.log("Cart Item Deleted");
      // find a way to avoid having to use alert
      // return alert("cart item successfully deleted");
    });
};

export {
  createCartItem,
  getCartItems,
  getCartItemsByUserId,
  updateCartItem,
  deleteCartItem,
};
