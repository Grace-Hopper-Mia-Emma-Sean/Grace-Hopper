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
      
      console.log(response);
      localStorage.setItem("product", JSON.stringify(products));

      localStorage.setItem("productId", JSON.stringify(products.map (product => product.id)));

    });
};

const editProduct = async(id, name, description, sku, category, price, discount, quantity) => {
  const token = localStorage.getItem("token")
  console.log(token)
  return axios({
    method: "PATCH",
    url: `/products/${id}`,
    headers: {
      "Content-Type": "application/json",
      "Authorization": 'Bearer ' + token
    },
    data: JSON.stringify({
      name: name,
      description: description,
      SKU: sku,
      category_id: category,
      price: price,
      discount_id: discount,
      quantity: quantity
    })
  }).catch((error)=>  {
    console.error(error.response.data)
  })
  .then((response) => {
    response.data;
    console.log(response);
    window.location.reload(true)
  })
}

const createProduct = async(name, description, sku, category, price, discount, quantity ) => {
  const token = localStorage.getItem("token")
  console.log(token)
  return axios ({
    method: "POST",
    url: '/products',
    headers: {
      "Content-Type": "application/json",
      "Authorization": 'Bearer ' + token
    },
    data: JSON.stringify({
      name: name,
      description: description,
      SKU: sku,
      category_id: category,
      price: price,
      discount_id: discount,
      quantity: quantity
    })
  }).catch((error)=>  {
    console.error(error.response.data)
  })
  .then((response) => {
    response.data;
    console.log(response);
    window.location.reload(true)
  })
}

export { getProducts, editProduct, createProduct };
