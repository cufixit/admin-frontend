import React, { useContext } from "react";
import { AccountContext } from "./AccountContext";
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';

const Status = () => {
  const { session, logout } = useContext(AccountContext);

  // console.log(session);

  const pages = ['Reports', 'Groups'];

  return <Grid> {
    session ?
    <Box sx={{ flexGrow: 1, marginBottom: "20px" }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            href="/"
          >
            <HomeIcon />
          </IconButton>
          <Button href="/reports" color="inherit">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Reports
            </Typography>
          </Button>
          <Button href="/groups" color="inherit">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Groups
            </Typography>
          </Button>
          <Button sx={{ marginLeft: "auto" }} color="inherit" onClick={logout}>Log out</Button>
        </Toolbar>
      </AppBar>
    </Box>
    : ""
  } </Grid>;
};

export default Status;
