import * as React from "react";

import { DataGrid } from "../../MUI";
import { getUsers } from "../../api/";
import { useState, useEffect } from "react";

export function UsersTable() {
  const [users, setUsers] = useState([]);

  useEffect(async () => {
    await getUsers(localStorage.getItem("token"))
      .then(() => {
        setUsers(JSON.parse(localStorage.getItem("users")));
      })
      .catch((error) => console.log(error))
      .finally(localStorage.removeItem("users"));
  }, []);

  users.forEach((user, i) => Object.assign(user, { id: i + 1 }));

  const rows = [...users];

  const columns = [
    {
      field: "username",
      headerName: "Username",
      headerAlign: "center",
      width: 150,
    },
    {
      field: "first_name",
      headerName: "First Name",
      headerAlign: "center",
      width: 150,
    },
    {
      field: "last_name",
      headerName: "Last Name",
      headerAlign: "center",
      width: 150,
    },
    {
      field: "telephone",
      headerName: "Phone",
      headerAlign: "center",
      width: 150,
      align: "center",
    },
    {
      field: "email",
      headerName: "Email",
      headerAlign: "center",
      width: 325,
    },
    {
      field: "isAdmin",
      headerName: "Admin",
      headerAlign: "center",
      width: 150,
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
