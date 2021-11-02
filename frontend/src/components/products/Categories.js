import { getProductCategories } from "../../api";
import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom"
import {DataGrid} from "../../MUI"


export function Categories({categoryToEdit, setCategoryToEdit}) {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      const resp = await getProductCategories()
      setCategories(resp)
    }
    fetchCategories()
  }, [])

const rows = [...categories]

const renderEditButton = (item) => {
  return (
    <Link to="/editcategory">
      <button
        onClick={function () {
          setCategoryToEdit(item.row);
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
    headerName: "Category ID",
    headerAlign: "center",
    width: 150,
    align: "center"
  },
  {
    field: "name",
    headerName: "Category Name",
    headerAlign: "center",
    width: 300,
    align: "center"
  },
  {
    field: "description",
    headerName: "Category Description",
    headerAlign: "center",
    width: 500,
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

          <Link to="/createcategory">
          <button>Create a New Category</button>
          </Link>
          <Link to="/admin/products">
          <button>Return To Products Table</button>
          </Link>
         
        </div>
      </div>
    </>
  );
}