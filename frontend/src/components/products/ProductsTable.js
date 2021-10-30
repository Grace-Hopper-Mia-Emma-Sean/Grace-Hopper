import * as React from "react";

import { DataGrid } from "../MUI";
import { getProducts } from "../../api/";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function ProductsTable({productToEdit, setProductToEdit}) {
  const [product, setProduct] = useState([]);

  useEffect(async () => {
    await getProducts(localStorage.getItem("token"))
      .then(() => {
        console.log(localStorage.getItem("product"));
        setProduct(JSON.parse(localStorage.getItem("product")));
      })
      .catch((error) => console.log(error))
      .finally(localStorage.removeItem("product"));
  }, []);

  // product.forEach((product, i) => Object.assign(product, { id: i + 1 }));

  const rows = [...product];
  console.log(rows);

  const renderEditButton = (item) => {
    return (
      <Link to ="/editProduct">
      <button onClick={function (){console.log(item.row), setProductToEdit(item.row)}}>Edit</button>
      </Link>
    )
  }

  const columns = [
    {
      field: "id",
      headerName: "Product ID",
      headerAlign: "center",
      width: 150,
      align: "center",
    },
    {
      field: "name",
      headerName: "Product Name",
      headerAlign: "center",
      width: 350,
    },
    {
      field: "description",
      headerName: "Description",
      headerAlign: "center",
      width: 300,
    },
    {
      field: "sku",
      headerName: "SKU",
      headerAlign: "center",
      width: 100,
      align: "center",
    },
    {
      field: "price",
      headerName: "Price",
      headerAlign: "center",
      width: 100,
      align: "center",
    },
    {
      field: "quantity",
      headerName: "Quantity",
      headerAlign: "center",
      width: 100,
      align: "center",
    },
    {
      field: "category_id",
      headerName: "Category",
      headerAlign: "center",
      width: 100,
      align: "center"
    },
    {
      field: "edit",
      headerName: "Edit",
      headerAlign: "center",
      width: 100,
      align: "center",
      renderCell: renderEditButton
    }
  ];
  return (
    <div>
      <div style={{ height: 650, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} pageSize={10} />
        <Link to= "/createproduct">
        <button>Add a New Product</button>
        </Link>
      </div>
    </div>
  );
}
