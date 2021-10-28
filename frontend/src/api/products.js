import axios from "axios";

const getProducts = async () => {
    return axios ({
        method: "GET",
        url: "/products",
        headers: {
            "Content-Type": "application/json",
        },
    }).catch((error) => {
        console.error(error.response.data)
    })
}

export default getProducts;