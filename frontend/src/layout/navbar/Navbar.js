import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Logout, CartIcon, OpenDrawer } from "../../components";

import { getProductCategories } from "../../api";

import {
  styled,
  alpha,
  AppBar,
  Box,
  Button,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  MenuItem,
  Menu,
  MenuIcon,
  SearchIcon,
  AccountCircle,
  MailIcon,
  NotificationsIcon,
  MoreIcon,
  ShoppingCartIcon,
} from "../../MUI";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export function Navbar({
  token,
  loggedIn,
  username,
  setLoggedIn,
  searchTerm,
  setSearchTerm,
  admin,
  productCategory,
  setProductCategory,
  selectProductCategory,
  setSelectProductCategory,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getProductCategories();
      const categories = response;
      setCategoryList(categories);
    };
    fetchCategories();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ backgroundColor: "#1D3557" }}>
          <OpenDrawer loggedIn={loggedIn} admin={admin} />
          <Button
            component={Link}
            to="/"
            underline="hover"
            style={{
              textDecoration: "none",
              color: "#F1FAEE",
              fontSize: "24px",
              fontFamily: "Architects Daughter",
            }}
          >
            MESS Electronics
          </Button>
          <Search sx={{ flexGrow: 3 }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={function (event) {
                setSearchTerm(event.target.value);
              }}
            />
          </Search>

          <Box sx={{ flexGrow: 1 }} />
          <Button
            id="basic-button"
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            style={{
              color: "white",
              font: "Arvo",
            }}
            onClick={handleClick}
          >
            Shop By Category
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {categoryList.map((category) => {
              return (
                <MenuItem
                  onClick={function () {
                    handleClose,
                      setProductCategory(category.id),
                      setSelectProductCategory(true);
                  }}
                >
                  {category.name}
                </MenuItem>
              );
            })}
          </Menu>
          <Button
            style={{
              color: "white",
              font: "Arvo",
            }}
            onClick={function () {
              setSelectProductCategory(false);
            }}
          >
            See All
          </Button>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {!loggedIn ? (
              <Button
                component={Link}
                to="/login"
                underline="hover"
                style={{
                  textDecoration: "none",
                  color: "white",
                  font: "Arvo",
                }}
              >
                Login
              </Button>
            ) : null}
            {!loggedIn ? (
              <Button
                component={Link}
                to="/register"
                underline="hover"
                style={{
                  textDecoration: "none",
                  color: "white",
                  font: "Arvo",
                }}
              >
                Register
              </Button>
            ) : null}
            {loggedIn && admin === "true" ? (
              <Button
                component={Link}
                to="/admin"
                underline="hover"
                style={{
                  textDecoration: "none",
                  color: "white",
                  font: "Arvo",
                }}
              >
                Admin
              </Button>
            ) : null}
            <Button>
              <Link to="/cart">
                <CartIcon />
              </Link>
            </Button>
            {loggedIn ? (
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                // aria-controls={menuId}
                aria-haspopup="true"
                // onClick={handleProfileMenuOpen}
                color="inherit"
                textDecoration="none"
              >
                <AccountCircle />
              </IconButton>
            ) : null}
            {loggedIn ? (
              <Button>
                <Logout setLoggedIn={setLoggedIn} />
              </Button>
            ) : null}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
