import * as React from "react";

import { DataGrid } from "../MUI";
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
      .catch((error) => console.log(error))
      .finally(localStorage.removeItem("cart"));
  }, []);

  cart.forEach((cart, i) => Object.assign(cart, { id: i + 1 }));

  const rows = [...cart];
  console.log(rows);

  const columns = [
    // { field: "user_id", headerName: "User ID", width: 150 },
    { field: "product_id", headerName: "Product ID", width: 150 },
    { field: "quantity", headerName: "Quantity", width: 150 },
  ];

  return (
    <div>
      <div style={{ height: 650, width: "65%" }}>
        <DataGrid rows={rows} columns={columns} pageSize={10} />
      </div>
    </div>
  );
}
