import { IconButton, Badge, ShoppingCartIcon } from "../../MUI";
import { useState, useEffect } from "react";
import { getCartItemsByUserId } from "../../api";

export function CartIcon() {
  const badgeCount = JSON.parse(localStorage.cart).filter((x) => x.id).length;

  return (
    <div>
      {badgeCount > 0 ? (
        <IconButton
          style={{
            textDecoration: "none",
            color: "white",
          }}
        >
          <Badge badgeContent={badgeCount} color="error">
            <ShoppingCartIcon></ShoppingCartIcon>
          </Badge>
        </IconButton>
      ) : (
        <IconButton
          style={{
            textDecoration: "none",
            color: "white",
          }}
        >
          <ShoppingCartIcon></ShoppingCartIcon>
        </IconButton>
      )}
    </div>
  );
}
