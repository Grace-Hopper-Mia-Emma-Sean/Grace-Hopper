import axios from "axios";

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
};

export { login, register };
