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
      const products = response.data;

      localStorage.setItem("product", JSON.stringify(products));

      localStorage.setItem(
        "productId",
        JSON.stringify(products.map((product) => product.id))
      );
    });
};

const getProductsByCategory = async (categoryId) => {
  return axios({
    method: "GET",
    url: `/products/category/${categoryId}`,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .catch((error) => {
      console.error(error.response.data);
    })
    .then((response) => {
      response.data;
    });
};

const getProductCategories = async () => {
  return axios({
    method: "GET",
    url: "/product-category",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .catch((error) => {
      console.error(error.response.data);
    })
    .then((response) => {
      return response.data;
    });
};

const getProductDiscounts = async () => {
  return axios({
    method: "GET",
    url: "/product-discount",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .catch((error) => {
      console.error(error.response.data);
    })
    .then((response) => {
      return response.data;
    });
};

const editProduct = async (
  id,
  name,
  description,
  sku,
  category,
  price,
  discount,
  quantity
) => {
  const token = localStorage.getItem("token");
  console.log(token);
  return axios({
    method: "PATCH",
    url: `/products/${id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    data: JSON.stringify({
      name: name,
      description: description,
      SKU: sku,
      category_id: category,
      price: price,
      discount_id: discount,
      quantity: quantity,
    }),
  })
    .catch((error) => {
      console.error(error.response.data);
    })
    .then((response) => {
      response.data;
      window.location.reload(true);
    });
};

const obj = {
  name: "Microsoft Surface Mobile Mouse",
  description:
    "The Microsoft Surface Mobile Mouse is a well-engineered peripheral with long battery life, a stylish design, and cutting-edge wireless connectivity.",
  sku: 6261287,
  category_id: 4,
  price: 34.99,
  discount_id: 1,
  quantity: 30,
};

const createProduct = async (
  name,
  description,
  sku,
  category,
  price,
  discount,
  quantity
) => {
  const token = localStorage.getItem("token");
  console.log(token);
  return axios({
    method: "POST",
    url: "/products",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    data: JSON.stringify({
      name: name,
      description: description,
      SKU: sku,
      category_id: category,
      price: price,
      discount_id: discount,
      quantity: quantity,
    }),
  })
    .catch((error) => {
      console.error(error.response.data);
    })
    .then((response) => {
      response.data;
      window.location.reload(true);
    });
};

const deleteProduct = async (id) => {
  const token = localStorage.getItem("token");
  return axios({
    method: "DELETE",
    url: `/products/${id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .catch((error) => {
      console.error(error.response.data);
    })
    .then((response) => {
      response.data;
      window.location.reload(true);
    });
};

export {
  getProducts,
  editProduct,
  createProduct,
  getProductsByCategory,
  getProductCategories,
  deleteProduct,
  getProductDiscounts,
};
