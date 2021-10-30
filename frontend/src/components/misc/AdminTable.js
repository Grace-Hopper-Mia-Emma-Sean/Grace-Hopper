import * as React from "react";

import { createTheme, ThemeProvider, Typography } from "../MUI";
import { 
  UsersTable, 
  CartTable, 
  ProductsTable,
  UserPayment,
  PaymentDetails,
  OrderItems,
  OrderDetails
 } from "..";

const theme = createTheme();

theme.typography.h3 = {
  fontSize: "1.2rem",
  "@media (min-width:600px)": {
    fontSize: "1.5rem",
    textAlign: "center",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2rem",
  },
};

export function AdminTable() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Typography variant="h3">
          Users
          <UsersTable />
        </Typography>
        <Typography variant="h3">
          Cart Items
          <CartTable />
        </Typography>
        <Typography variant="h3">
          Products
          <ProductsTable />
        </Typography>

        <Typography variant="h3">
          Products
          <UserPayment />
        </Typography>

        <Typography variant="h3">
          Products
          <PaymentDetails />
        </Typography>

        <Typography variant="h3">
          Products
          <OrderItems />
        </Typography>

        <Typography variant="h3">
          Products
          <OrderDetails />
        </Typography>
        
      </ThemeProvider>
    </div>
  );
}
