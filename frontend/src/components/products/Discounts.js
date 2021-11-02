import { getProductDiscounts } from "../../api";
import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom"
import {DataGrid} from "../../MUI"


export function Discounts({discountToEdit, setDiscountToEdit}) {
  const [discounts, setDiscounts] = useState([])

  useEffect(() => {
    const fetchDiscounts = async () => {
      const resp = await getProductDiscounts()
      console.log(resp)
      setDiscounts(resp)
    }
    fetchDiscounts()
  }, [])

const rows = [...discounts]

const renderEditButton = (item) => {
  return (
    <Link to="/editdiscount">
      <button
        onClick={function () {
          console.log(item.row), setDiscountToEdit(item.row);
        }}
      >
        Edit
      </button>
     </Link>
  );
};

const columns = [
  {
    field: "id",
    headerName: "Discount ID",
    headerAlign: "center",
    width: 150,
    align: "center"
  },
  {
    field: "name",
    headerName: "Discount Name",
    headerAlign: "center",
    width: 300,
    align: "center"
  },
  {
    field: "description",
    headerName: "Discount Description",
    headerAlign: "center",
    width: 500,
    align: "center"
  },
  {
    field: "discount_percent",
    headerName: "Discount Percent",
    headerAlign: "center",
    width: 300,
    align: "center"
  },
  {
    field: "edit",
    headerName: "Edit",
    headerAlign: "center",
    width: 300,
    align: "center",
    renderCell: renderEditButton
  }
]



  return (
    <>
      <div>
        <div style={{height: 650, width: "100%"}}>
          <DataGrid rows={rows} columns={columns} pageSize={10}>
          </DataGrid>

          <Link to="/creatediscount">
          <button>Create a New Discount</button>
          </Link>
          <Link to="/admin/products">
          <button>Return To Products Table</button>
          </Link>
         
        </div>
      </div>
    </>
  );
}