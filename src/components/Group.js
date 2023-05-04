import { Container } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AccountContext } from "./AccountContext";
import { useLocation } from "react-router-dom";
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';

const Group = () => {
    let location = useLocation();
    console.log(location);
    const data = location.state.data;
    const report = location.state.report;

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
    }));
      

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Item>
                        <Container>
                            <h2>Group #{data.id}: {data.title}</h2>
                            <h3>Details</h3>
                            <div>Description: {data.description}</div>
                            <div>Location: {data.location}</div>
                            <div>Status: {data.status} </div>
                        </Container>
                        <br/>
                        <Container>
                            <h3>Reports</h3>
                            <Link href={`/reports/${report.id}`}>{report.title}</Link>
                        </Container>
                    </Item>
                </Grid>
                <Grid item xs={4}>
                    <Item>
                        <Container>
                            <h4>Suggested</h4>
                        </Container>
                    </Item>
                </Grid>
            </Grid>
        </Container>
      );
}

export default Group;