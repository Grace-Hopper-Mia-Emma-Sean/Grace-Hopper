import axios from "axios";

/**
 *
 * DONE: login, register
 *
 * TODO: getAllUsers, getUserById, createCartItems, getAllCartItems, getCartItemsByUserId, updateCartItems, removeCartItems
 *
 * STRETCH || ARCHIVED: CRUD address, CRUD shopping_session, updateUser, deleteUser
 *
 */

const register = async (username, password) => {
  return axios({
    method: "POST",
    url: "/users/register",
    data: {
      username: username,
      password: password,
    },
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((error) => {
    console.error(error.response.data);
    if (error.response.data.name == "UserExistsError")
      return alert(
        "So, this is awkward. That name's already taken. Go ahead and try picking another one."
      );
  });
  // if we do .then((res) => {}), it returns undefined in the Login component
};

const login = async (username, password) => {
  return axios({
    method: "POST",
    url: "/users/login",
    data: {
      username: username,
      password: password,
    },
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((error) => {
    console.error(error.response.data);
    if (error.response.data.name == "IncorrectCredentialsError")
      return alert(
        "Oh, no! It looks like your either your username is incorrect. Please, try again."
      );
  });
  // if we do .then((res) => {}), it returns undefined in the Login component
};

const getUsers = async () => {
  return axios({
    method: "GET",
    url: "/users",
  })
    .catch((error) => {
      throw error.response.data.error;
    })
    .then((response) => response.data);
};

const getUserById = async (id) => {
  return axios({
    method: "GET",
    url: `/users/${id}`,
    data: { userId: id },
    headers: {
      "Content-Type": "application/json",
    },
  })
    .catch((error) => {
      console.error(error.response.data);
      // find a way to avoid having to use alert
      alert("No user exists with that id");
    })
    .then((response) => response.data);
};

export { login, register, getUsers, getUserById };
