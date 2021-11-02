import * as React from "react";

import {
  CssBaseline,
  Box,
  Typography,
  Container,
  Link,
  Paper,
  BottomNavigation,
  BottomNavigationAction,
  makeStyles,
  Theme,
  GitHubIcon,
} from "../../MUI";

const useStyles = makeStyles((theme) => ({
  footer: {
    background: "#1D3557",
    color: "white",
    padding: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  // typography: {
  //   color: "#F1FAEE",
  //   textDecoration: "none",
  //   fontSize: "h6",
  // },
}));

export function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.footer}>
      <Link
        href="https://github.com/Grace-Hopper-Mia-Emma-Sean/Grace-Hopper"
        sx={{ textDecoration: "none", color: "#F1FAEE", fontSize: "1rem" }}
      >
        Created 2021 by Mia Dao, Emma Crane, and Sean Conte <GitHubIcon />
      </Link>
    </div>
  );
}
