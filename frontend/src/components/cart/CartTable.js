import * as React from "react";

import { DataGrid } from "../../MUI";
import { getCartItems } from "../../api/";
import { useState, useEffect } from "react";

export function CartTable() {
  const [cart, setCart] = useState([]);

  useEffect(async () => {
    await getCartItems(localStorage.getItem("token"))
      .then(() => {
        console.log(localStorage.getItem("cart"));
        setCart(JSON.parse(localStorage.getItem("cart")));
      })
      .catch((error) => console.log(error));
    // .finally(localStorage.removeItem("cart"));
  }, []);

  cart.forEach((cart, i) => Object.assign(cart, { id: i + 1 }));

  const rows = [...cart];
  console.log(rows);

  const columns = [
    {
      field: "user_id",
      headerName: "User ID",
      headerAlign: "center",
      width: 100,
      align: "center",
    },
    {
      field: "name",
      headerName: "Product",
      headerAlign: "center",
      width: 350,
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
      field: "total",
      headerName: "Total",
      headerAlign: "center",
      width: 100,
      align: "center",
    },
  ];
  return (
    <div>
      <div style={{ height: 650, width: "70%" }}>
        <DataGrid rows={rows} columns={columns} pageSize={10} />
      </div>
    </div>
  );
}
