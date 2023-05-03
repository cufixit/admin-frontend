import { Container } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AccountContext } from "./AccountContext";
import { useLocation } from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import apigClient from "../ApigClient";

const Group = () => {
    let location = useLocation();
    const data = location.state.data;

    return (
        <Container>
            <h1>Create Group</h1>
            <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            >
            <div>
                <TextField
                required
                id="outlined-required"
                label="Required"
                defaultValue="Hello World"
                />
                <TextField id="outlined-search" label="Search field" type="search" />
                <TextField
                id="outlined-helperText"
                label="Helper text"
                defaultValue="Default Value"
                helperText="Some important text"
                />
            </div>
            </Box>
        </Container>
      );
}

export default Group;