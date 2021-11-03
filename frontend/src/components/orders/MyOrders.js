import * as React from "react";

import { DataGrid } from "../../MUI";
import { order_details } from "../../api/";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function MyOrder({
}) {
  const [orderDetails, setOrderDetails] = useState([]);

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

  
  const columns = [
    {
      field: "id",
      headerName: "Order Detail ID",
      headerAlign: "center",
      width: 150,
      align: "center",
    },
    {
      field: "total",
      headerName: "Total",
      headerAlign: "center",
      width: 300,
    },
    
  ];
  return (
    <div>
      <div style={{ height: 650, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} pageSize={10} />
      </div>
    </div>
  );
}
