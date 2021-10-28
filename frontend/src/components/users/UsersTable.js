import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useState, useEffect } from "react";

import { getUsers } from "../../api/";

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

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Username</TableCell>
            <TableCell align="left">First&nbsp;Name</TableCell>
            <TableCell align="left">Last&nbsp;Name</TableCell>
            <TableCell align="left">Phone</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Admin</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.username}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {user.username}
              </TableCell>
              <TableCell align="left">{user.first_name}</TableCell>
              <TableCell align="left">{user.last_name}</TableCell>
              <TableCell align="left">{user.telephone}</TableCell>
              <TableCell align="left">{user.email}</TableCell>
              <TableCell align="left">{JSON.stringify(user.isAdmin)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
