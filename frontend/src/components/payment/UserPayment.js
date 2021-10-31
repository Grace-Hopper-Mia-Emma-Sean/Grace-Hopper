import * as React from "react";

import { DataGrid } from "../MUI";
import { user_payment } from "../../api/";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function UserPayment({ 
  userPaymentToEdit, 
  setUserPaymentToEdit,
  userPaymentToDelete,
  setUserPaymentToDelete
}) {
  const [userPayment, setUserPayment] = useState([]);

  useEffect(async () => {
    await user_payment(localStorage.getItem("token"))
      .then(() => {
        console.log(localStorage.getItem("userPayments"));
        setUserPayment(JSON.parse(localStorage.getItem("userPayments")));
      })
      .catch((error) => console.log(error))
      .finally(localStorage.removeItem("userPayments"));
  }, []);


  const rows = [...userPayment];
  console.log(rows);

  const renderEditButton = (item) => {
    return (
      <Link to="/edit_user_payment">
        <button
          onClick={function () {
            console.log(item.row), setUserPaymentToEdit(item.row);
          }}
        >
          Edit
        </button>
      </Link>
    );
  };

  const renderDeleteButton = (item) => {
    return (
      <Link to="/delete_user_payment">
        <button
          onClick={function () {
            console.log(item.row), setUserPaymentToDelete(item.row);
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
      headerName: "User Payment ID",
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
      field: "payment_type",
      headerName: "Payment Type",
      headerAlign: "center",
      width: 300,
    },
    {
      field: "account_no",
      headerName: "Account Number",
      headerAlign: "center",
      width: 100,
      align: "center",
    },
    {
        field: "expiry",
        headerName: "Expiration Date",
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
        <Link to="/create_user_payment">
          <button>Add User Payment </button>
        </Link>
      </div>
    </div>
  );
}
