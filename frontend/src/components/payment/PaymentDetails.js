import * as React from "react";
import { DataGrid } from "../MUI";
import { payment_details } from "../../api/";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function PaymentDetails({ 
  paymentToEdit, 
  setPaymentToEdit, 
  paymentToDelete, 
  setPaymentToDelete 
}) {
  const [payment, setPayment] = useState([]);

  useEffect(async () => {
    await payment_details(localStorage.getItem("token"))
      .then(() => {
        console.log(localStorage.getItem("payment_details"));
        setPayment(JSON.parse(localStorage.getItem("payment_details")));
      })
      .catch((error) => console.log(error))
      .finally(localStorage.removeItem("payment_details"));
  }, []);

  // product.forEach((product, i) => Object.assign(product, { id: i + 1 }));

  const rows = [...payment];
  console.log(rows);

  const renderEditButton = (item) => {
    return (
      <Link to="/edit_payment_details">
        <button
          onClick={function () {
            console.log(item.row), setPaymentToEdit(item.row);
          }}
        >
          Edit
        </button>
      </Link>
    );
  };

  const renderDeleteButton = (item) => {
    return (
      <Link to="/delete_payment_details">
        <button
          onClick={function () {
            console.log(item.row), setPaymentToDelete(item.row);
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
      headerName: "Payment ID",
      headerAlign: "center",
      width: 150,
      align: "center",
    },
    {
      field: "order_id",
      headerName: "Order ID",
      headerAlign: "center",
      width: 350,
    },
    {
      field: "amount",
      headerName: "Amount",
      headerAlign: "center",
      width: 300,
    },
    {
      field: "provider",
      headerName: "Payment Provider",
      headerAlign: "center",
      width: 300,
    },
    {
      field: "status",
      headerName: "Status",
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
        <Link to="/create_payment_details">
          <button>Add Payment Detail</button>
        </Link>
      </div>
    </div>
  );
}
