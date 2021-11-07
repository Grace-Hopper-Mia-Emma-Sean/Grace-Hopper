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

import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ComputerIcon from "@mui/icons-material/Computer";
import { Link } from "react-router-dom";

export function DashboardIcons() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: "-1.5rem",
      }}
    >
      <Link to="/admin">
        <IconButton sx={{ padding: 30 }}>
          <DashboardIcon />
          <ListItemText primary="Dashboard" />
        </IconButton>
      </Link>
      <Link to="/dashboard_users">
        <IconButton sx={{ padding: 30 }}>
          <PeopleIcon />
          <ListItemText primary="Customers" />
        </IconButton>
      </Link>
      <Link to="/dashboard_products">
        <IconButton sx={{ padding: 30 }}>
          <ComputerIcon />
          <ListItemText primary="Products" />
        </IconButton>
      </Link>
      <Link to="/dashboard_cart">
        <IconButton sx={{ padding: 30 }}>
          <ShoppingCartIcon />
          <ListItemText primary="Cart History" />
        </IconButton>
      </Link>
    </Box>
  );
}
