import { getProductCategories } from "../../api";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DataGrid, makeStyles, Button } from "../../MUI";

export function Categories({ categoryToEdit, setCategoryToEdit }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const resp = await getProductCategories();
      setCategories(resp);
    };
    fetchCategories();
  }, []);

  const rows = [...categories];

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
      align: "center",
    },
    {
      field: "name",
      headerName: "Category Name",
      headerAlign: "center",
      width: 300,
      align: "center",
    },
    {
      field: "description",
      headerName: "Category Description",
      headerAlign: "center",
      width: 500,
      align: "center",
    },
    {
      field: "edit",
      headerName: "Edit",
      headerAlign: "center",
      width: 300,
      align: "center",
      renderCell: renderEditButton,
    },
  ];

  const useStyles = makeStyles((theme) => ({
    body: { backgroundColor: "#457B9D" },
    buttoncontainer: {
      display: 'flex',
      justifyContent: 'space-evenly'
    },
    button :{
      height: '40px'
    }
  }));
  
  const classes = useStyles()

  return (
    <>
      <div>
        <div style={{ height: 650, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} pageSize={10}></DataGrid>
        </div>
          <div className={classes.buttoncontainer}>
            <Link to="/createcategory">
                <Button className={classes.button}>Create a New Category</Button>
            </Link>
            <Link to="/admin/products">
                <Button className={classes.button}>Return To Products Table</Button>
            </Link>
          </div>
      </div>
    </>
  );
}
