import { AddShoppingCartIcon, Button } from "../MUI";
import { createCartItem } from "../../api";
import { useState, useEffect } from "react";

export function CreateCartItem() {
  return (
    <div>
      <Button variant="contained">Add to Cart</Button>
    </div>
  );
}
