import React from "react";
import { useNavigate } from "react-router";
import { Button, Container, Grid, Stack, Typography } from "@mui/material";

const Start = () => {
  let navigate = useNavigate();
  const login = () => {
    navigate(`/login`);
  };
  const signup = () => {
    navigate(`/signup`);
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
        <Typography variant="h4">Admin Portal</Typography>
      </Grid>
      <Grid item xs={3}>
        <Stack direction="row" spacing={2}>
          <Button onClick={login} variant="contained" size="large">
            Login
          </Button>
          <Button onClick={signup} variant="outlined" size="large">
            Register
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Start;
