import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  MenuIcon,
} from "../../MUI";

export function OpenDrawer({ loggedIn, admin }) {
  const [openDrawer, setOpenDrawer] = useState(false);

  const useStyles = makeStyles(() => ({
    link: {
      textDecoration: "none",
      color: "white",
      fontSize: "20px",
    },
    icon: {
      color: "white",
    },
    list: {
      backgroundColor: "#82b1ff",
    },
  }));

  const classes = useStyles();

  return (
    <>
      <IconButton
        onClick={() => setOpenDrawer(!openDrawer)}
        className={classes.icon}
      >
        <MenuIcon />
      </IconButton>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List className={classes.list}>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/" className={classes.link}>
                Home
              </Link>
            </ListItemText>
          </ListItem>
          <Divider />
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/cart" className={classes.link}>
                Shopping Cart
              </Link>
            </ListItemText>
          </ListItem>
          <Divider />
          {loggedIn && admin == "true" ? (
            <ListItem onClick={() => setOpenDrawer(false)}>
              <ListItemText>
                <Link to="/admin" className={classes.link}>
                  Admin
                </Link>
              </ListItemText>
            </ListItem>
          ) : null}
          <Divider />
          {!loggedIn ? (
            <ListItem onClick={() => setOpenDrawer(false)}>
              <ListItemText>
                <Link to="/login" className={classes.link}>
                  Login
                </Link>
              </ListItemText>
            </ListItem>
          ) : null}
          <Divider />
          {!loggedIn ? (
            <ListItem onClick={() => setOpenDrawer(false)}>
              <ListItemText>
                <Link to="/register" className={classes.link}>
                  Register
                </Link>
              </ListItemText>
            </ListItem>
          ) : null}
          <Divider />
          {loggedIn ? (
            <ListItem onClick={() => setOpenDrawer(false)}>
              <ListItemText>
                <Link to="/" className={classes.link}>
                  Logout (Not Functional)
                </Link>
              </ListItemText>
            </ListItem>
          ) : null}
          <Divider />
          <ListItem onClick={() => setOpenDrawer(false)}>
              <ListItemText>
                <Link to="/contact_us" className={classes.link}>
                  Contact Us
                </Link>
              </ListItemText>
            </ListItem>
        </List>
      </Drawer>
    </>
  );
}
