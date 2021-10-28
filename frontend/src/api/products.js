import axios from "axios";

const getProducts = async () => {
  return axios({
    method: "GET",
    url: "/products",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .catch((error) => {
      console.error(error.response.data);
    })
    .then((response) => {
      response.data;
      console.log(response);
      localStorage.setItem("product", JSON.stringify(response.data));
    });
};

export default getProducts;
