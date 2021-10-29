import * as React from "react";

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "../MUI";

import { getCartItemsByUserId } from "../../api";
import { useState, useEffect } from "react";

export function CartCard() {
  const [cart, setCart] = useState([]);

  useEffect(async () => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    await getCartItemsByUserId(token, id)
      .then(() => {
        console.log(localStorage.getItem("cart"));
        setCart([JSON.parse(localStorage.getItem("cart"))]);
      })
      .catch((error) => console.log(error))
      .finally(localStorage.removeItem("cart"));
  }, []);

  const badgeCount = cart === null ? 0 : cart.length;

  return (
    <Card sx={{ maxWidth: 256 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {/* {cart.product} */}
        </Typography>
        <Typography variant="body2" color="text.secondary"></Typography>
        <CardMedia
          component="img"
          height="128"
          width="128"
          image="http://placeimg.com/128/128/tech"
          alt="tech"
        />
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

// [
//   {
//     user_id: 4,
//     name: "iMac 24inch (8 core, M1 Chip, 500 GB SSD)",
//     quantity: 2,
//     price: "2000.00",
//     total: "4000.00",
//   },
//   {
//     user_id: 3,
//     name: "ASUS ROG Gaming PC",
//     quantity: 1,
//     price: "1700.00",
//     total: "1700.00",
//   },
//   {
//     user_id: 6,
//     name: "The Intel i7",
//     quantity: 3,
//     price: "700.00",
//     total: "2100.00",
//   },
//   {
//     user_id: 2,
//     name: "The Apple M1 Chip (Recently Updated!)",
//     quantity: 2,
//     price: "749.99",
//     total: "1499.98",
//   },
//   {
//     user_id: 5,
//     name: "NVIDIA Alienware X17 Gaming Laptop",
//     quantity: 2,
//     price: "2200.00",
//     total: "4400.00",
//   },
// ];
