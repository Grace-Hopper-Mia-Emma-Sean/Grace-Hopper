import { login } from "../../api";
import { Redirect } from "react-router";
import { createCartItem } from "../../api";

import {
  Avatar,
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  Grid,
  Link,
  LockOutlinedIcon,
  TextField,
  ThemeProvider,
  Typography,
} from "../../MUI";
import { useEffect } from "react";

export function Login({
  loggedIn,
  username,
  password,
  setLoggedIn,
  setUsername,
  setPassword,
}) {
  const theme = createTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = await login(username, password);
      setLoggedIn(true);
      setUsername(username);
      setPassword(password);
      let KVPs = [
        { token: loginUser.data.token },
        { username: username },
        {
          admin:
            loginUser.data.isAdmin == null ? false : loginUser.data.isAdmin,
        },
        { id: loginUser.data.id },
      ];
      KVPs.forEach((KVP) =>
        localStorage.setItem(Object.keys(KVP), Object.values(KVP))
      );
    } catch (error) {
      console.error(error);
      setLoggedIn(false);
    } finally {
      const cart = JSON.parse(localStorage.getItem("cart"));
      console.log(cart);
      cart.forEach((item) =>
        createCartItem(item.id, item.quantity, localStorage.getItem("id"))
      );
    }
  };

  // useEffect(() => {
  //   const cart = JSON.parse(localStorage.getItem("cart"));
  //   console.log(cart);
  //   cart.forEach((item) =>
  //     createCartItem(item.id, item.quantity, item.user_id)
  //   );
  // }, [userId]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#F18D9E" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            style={{ color: "#15909f", fontWeight: "bold" }}
          >
            Log In
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                  minLength="8"
                />
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ backgroundColor: "rgb(86, 193, 196)", color: "white" }}
            >
              Log In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/register" variant="body2" color="#98DBC6">
                  No account yet? Create an account.
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {loggedIn ? <Redirect to="/" /> : null}
      </Container>
    </ThemeProvider>
  );
}
