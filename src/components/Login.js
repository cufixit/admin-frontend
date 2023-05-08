import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import {
  Alert,
  Box,
  Button,
  FormControl,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AccountContext } from "./AccountContext";

const Login = () => {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { session, login } = useContext(AccountContext);

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      await login(email, password);
      navigate("/home");
    } catch (err) {
      setError(err.message);
      console.log("Failed to log in", err);
    }
  };

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={3}>
        <Paper elevation={3} style={{ padding: "40px 30px" }}>
          <Box component="form" onSubmit={onSubmit}>
            <Stack direction="column" spacing={3} width="400px">
              <Typography variant="h4">Admin Log In</Typography>
              {error && <Alert severity="error">{error}</Alert>}
              <FormControl fullWidth>
                <TextField
                  variant="outlined"
                  label="Email address"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value.trim())}
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  variant="outlined"
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value.trim())}
                />
              </FormControl>
              <Button variant="contained" type="submit" size="large">
                Login
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
