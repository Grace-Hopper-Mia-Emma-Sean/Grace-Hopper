import * as React from "react";

import { DataGrid } from "../MUI";
import { order_items } from "../../api/";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function OrderItems({ 
  orderItemsToEdit, 
  setOrderItemsToEdit,
  orderItemsToDelete,
  setOrderItemsToDelete 
}) {
  const [orderItems, setOrderItems] = useState([]);

  useEffect(async () => {
    await order_items(localStorage.getItem("token"))
      .then(() => {
        console.log(localStorage.getItem("orderItems"));
        setOrderItems(JSON.parse(localStorage.getItem("orderItems")));
      })
      .catch((error) => console.log(error))
      .finally(localStorage.removeItem("orderItems"));
  }, []);


  const rows = [...orderItems];
  console.log(rows);

  const renderEditButton = (item) => {
    return (
      <Link to="/edit_order_items">
        <button
          onClick={function () {
            console.log(item.row), setOrderItemsToEdit(item.row);
          }}
        >
          Edit
        </button>
      </Link>
    );
  };
  const renderDeleteButton = (item) => {
    return (
      <Link to="/delete_order_items">
        <button
          onClick={function () {
            console.log(item.row), setOrderItemsToDelete(item.row);
          }}
        >
          Delete
        </button>
      </Link>
    );
  };


  const columns = [
    {
      field: "id",
      headerName: "Order Item ID",
      headerAlign: "center",
      width: 150,
      align: "center",
    },
    {
      field: "order_id",
      headerName: "Order Detail ID",
      headerAlign: "center",
      width: 350,
    },
    {
      field: "product_id",
      headerName: "Product ID",
      headerAlign: "center",
      width: 300,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      headerAlign: "center",
      width: 100,
      align: "center",
    },

    {
      field: "edit",
      headerName: "Edit",
      headerAlign: "center",
      width: 100,
      align: "center",
      renderCell: renderEditButton,
    },
    {
      field: "delete",
      headerName: "Delete",
      headerAlign: "center",
      width: 100,
      align: "center",
      renderCell: renderDeleteButton,
    }
  ];
  return (
    <div>
      <div style={{ height: 650, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} pageSize={10} />
        <Link to="/create_order_items">
          <button>Add Order Items </button>
        </Link>
      </div>
    </div>
  );
}
