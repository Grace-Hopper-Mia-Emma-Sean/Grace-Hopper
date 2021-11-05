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
  currentRevenue,
  setCurrentRevenue
 
}) {

  const [  orderDetails, setOrderDetails] = useState([])
  const [ revenue, setRevenue] = useState([])

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

  // const getOrders = async () => { 
  //     const newArr = [];
  //     rows.forEach((row)=> {
  //       newArr.push(row.total)
  //     })
  //     setRevenue(newArr);
  //     console.log(revenue)
    
  // }

  const renderDeleteButton = (item) => {
    return (
      <Link to="/delete_order_details">
        <button
          onClick={function () {
            console.log("1",item.row.id),
            // setOrderToDelete(item.row)
            localStorage.setItem("Order To Delete", item.row.id)
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
      width: 200,
      align: "center",
    },
    {
      field: "user_id",
      headerName: "User ID",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "total",
      headerName: "Total",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "payment_id",
      headerName: "Payment ID",
      headerAlign: "center",
      width: 200,
      align: "center",
    },
    {
      field: "delete",
      headerName: "Delete",
      headerAlign: "center",
      width: 200,
      align: "center",
      renderCell: renderDeleteButton,
    }
  ];
  return (
    <div>
      {/* {getOrders()} */}
      <div style={{ height: 650, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} pageSize={10} />
        {/* <Link to="/create_order_details">
          <button>Add Order Details </button>
        </Link> */}
      </div>
    </div>
  );
}
