import * as React from "react";

import { DataGrid } from "../../MUI";
import { order_details } from "../../api/";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function OrderDetails({
  orderDetailsToEdit,
  setOrderDetailsToEdit,
  orderToDelete,
  setOrderToDelete,
 
}) {

  const [  orderDetails, setOrderDetails] = useState([])

  useEffect(async () => {
    await order_details(localStorage.getItem("token"))
      .then(() => {
        console.log(localStorage.getItem("orderDetails"));
        setOrderDetails(JSON.parse(localStorage.getItem("orderDetails")));
      })
      .catch((error) => console.log(error))
      .finally(localStorage.removeItem("orderDetails"));
  }, []);

  const rows = [...orderDetails];
  console.log(rows);


  const renderDeleteButton = (item) => {
    return (
      <Link to="/delete_order_details">
        <button
          onClick={function () {
            console.log("1",item.row),
            setOrderToDelete(item.row)
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
      headerName: "Order Detail ID",
      headerAlign: "center",
      width: 150,
      align: "center",
    },
    {
      field: "user_id",
      headerName: "User ID",
      headerAlign: "center",
      width: 350,
    },
    {
      field: "total",
      headerName: "Total",
      headerAlign: "center",
      width: 300,
    },
    {
      field: "payment_id",
      headerName: "Payment ID",
      headerAlign: "center",
      width: 100,
      align: "center",
    },
    {
      field: "delete",
      headerName: "Delete",
      headerAlign: "center",
      width: 100,
      align: "center",
      renderCell: renderDeleteButton,
    },
  ];
  return (
    <div>
      <div style={{ height: 650, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} pageSize={10} />
        {/* <Link to="/create_order_details">
          <button>Add Order Details </button>
        </Link> */}
      </div>
    </div>
  );
}
