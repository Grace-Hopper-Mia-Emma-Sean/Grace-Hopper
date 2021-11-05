import { IconButton, Badge, ShoppingCartIcon, AccountCircle } from "../../MUI";
import { useState, useEffect } from "react";
import { getCartItemsByUserId } from "../../api";

export function MyOrdersIcon() {
  return (
    <IconButton
      style={{
        textDecoration: "none",
        color: "white",
      }}
    >
      <AccountCircle></AccountCircle>
    </IconButton>
  );
}
