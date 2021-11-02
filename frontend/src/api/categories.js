import axios from "axios";

const editCategory = async(id, name, description) => {
    const token = localStorage.getItem("token")
    console.log(token)
    return axios({
      method: "PATCH",
      url: `/product-category/${id}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + token
      },
      data: JSON.stringify({
        name: name,
        description: description,
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

  const createCategory = async(name, description) => {
    const token = localStorage.getItem("token")
    console.log(token)
    return axios({
      method: "POST",
      url: '/product-category',
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + token
      },
      data: JSON.stringify({
        name: name,
        description: description
      })
    }).catch((error)=> {
      console.error(error.response.data)
    })
    .then((response) => {
      response.data
      console.log(response)
      window.location.reload(true)
    })
  }

  const deleteCategory = async(id) => {
    const token = localStorage.getItem("token")
    return axios({
      method: "DELETE",
      url:`/product-category/${id}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + token
      }
    }).catch((error)=>{
      console.error(error.response.data)
    })
    .then((response) => {
      response.data
      console.log(response)
      window.location.reload(true)
    })
  }

export {editCategory, createCategory, deleteCategory}