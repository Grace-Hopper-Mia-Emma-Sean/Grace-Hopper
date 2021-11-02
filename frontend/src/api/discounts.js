import axios from "axios";

const editDiscount = async(id, name, description, discountPercent) => {
    const token = localStorage.getItem("token")
    console.log(token)
    return axios({
        method: "PATCH",
        url: `product-discount/${id}`,
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + token
        },
        data: JSON.stringify({
            name: name,
            description: description,
            discount_percent: discountPercent
        })
    }).catch((error) => {
        console.error(error.response.data)
    })
    .then((response) => {
        response.data
        console.log(response)
        window.location.reload(true)
    })
}

const createDiscount = async (name, description, discountPercent ) => {
    const token = localStorage.getItem("token")
    console.log(token)
    return axios({
        method: "POST",
        url: '/product-discount',
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + token
        },
        data: JSON.stringify({
            name: name,
            description: description,
            discount_percent: discountPercent,
        })
    }).catch((error)=> {
        console.error(error.response.data)
    })
    .then((response) => {
        console.log(response)
        window.location.reload(true)
    })
}

const deleteDiscount = async (id) => {
    const token = localStorage.getItem("token")
    console.log(token)
    return axios ({
        method: "DELETE",
        url: `/product-discount/${id}`,
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + token
        }
    }).catch((error) => {
        console.error(error.response.data)
    })
    .then((response) => {
        response.data
        console.log(response)
        window.location.reload(true)
    })
}

export {editDiscount, createDiscount, deleteDiscount}