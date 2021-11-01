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

import { Redirect } from "react-router";
import { register } from "../../api";

export function Register({
  username,
  password,
  confirmPassword,
  setUsername,
  setPassword,
  setConfirmPassword,
  setToken,
  loggedIn,
  setLoggedIn,
}) {
  const theme = createTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword)
      return alert(
        "Uhoh! The passwords you entered aren't the same. Double check them and try again."
      );
    const data = new FormData(e.currentTarget);

    try {
      const registerUser = await register(username, password);
      setUsername(username);
      setPassword(password);
      setLoggedIn(true);
      let KVPs = [
        { token: registerUser.data.token },
        { username: username },
        {
          admin:
            registerUser.data.isAdmin == null
              ? false
              : registerUser.data.isAdmin,
        },
        { id: registerUser.data.id },
      ];
      KVPs.forEach((KVP) =>
        localStorage.setItem(Object.keys(KVP), Object.values(KVP))
      );
    } catch (error) {
      console.error(error);
      if (error.name == "UserExistsError")
        return alert(
          "So, this is awkward... that username is already taken. Mind picking another one?"
        );
    }
  };

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
            Sign up
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
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2" color="#98DBC6">
                  Already have an account? Sign in
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
