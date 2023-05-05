// import { Container, ListItemText, Stack } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AccountContext } from "./AccountContext";
import { useLocation } from "react-router-dom";
import { styled } from '@mui/material/styles';
// import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
// import { Box, Grid, IconButton, Typography, List, ListItem } from '@material-ui/core';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import apigClient from "../ApigClient";
import {
    Box,
    Button,
    Container,
    Divider, FormControl,
    Grid,
    IconButton,
    InputAdornment, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
    Paper, Stack,
    TextField,
    Typography
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';

const Group = () => {
    let location = useLocation();
    const data = location.state.data;
    const report = location.state.report;
    const [reports, setReports] = useState([report]);
    const [suggested, setSuggested] = useState(null);

    let rows = [
        { reportID: 1, title: 'Clogged sink in 2016 kitchen', description: "The sink is clogged and has been clogged since last Sunday.", location: 'East Campus', status: 'Submitted', date: "1/20/2023 2:58 PM EST" },
        { reportID: 3, title: 'Broken radiator in 2020A', description: "Radiator keeps on making weird noises. It will keep turning on and off for 5 minutes straight every day.", location: 'East Campus', status: 'In progress', date: "2/20/2023 1:00 PM EST" },
        { reportID: 6, title: 'Air conditioner not working in 627', description: "AC doesn't work.", location: 'Mudd Hall', status: 'In progress', date: "12/2/2022 11:31 AM EST" },
    ];
    rows.map((row) => row["id"] = row["reportID"]);

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
    }));

    // Adds a suggested report to the group
    const addToGroup = async (event, item) => {
        event.preventDefault();
        try {
            // const response = await apigClient.invokeApi(
            //   {},
            //   "/groups",
            //   "POST",
            //   { headers: { Authorization: session["idToken"]["jwtToken"] } },
            //   item
            // )
            // console.log(response);
            if (reports.find(elem => elem.id === item.id) === undefined) {
                setReports([...reports, item]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Gets the reports that are in the group
    const getReports = async () => {
        try {
            // const response = await apigClient.invokeApi(
            //   {},
            //   `/groups/${params.id}`,
            //   "GET",
            //   {
            //     headers: { Authorization: session["idToken"]["jwtToken"] },
            //   }
            // );
            // console.log(response);
            // setReports(response.data);
            setReports(reports);
        } catch (error) {
            console.log(error);
        }
    };

    // Gets suggested reports
    const getSuggested = async () => {
        try {
            // const response = await apigClient.invokeApi(
            //     {},
            //     "/suggested",
            //     "GET",
            //     { headers: { Authorization: session["idToken"]["jwtToken"] } },
            // );
            // console.log(response);
            setSuggested(rows);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getReports();
        getSuggested();
      }, []);    

    return (
        <Container fixed sx={{marginTop: "100px"}}>
            <Grid container spacing={5}>
                <Grid item xs={12} md={6} lg={7}>
                    {
                        <Paper sx={{padding: "20px 30px 30px"}}>
                            {/* <Typography variant="h5" marginBottom="10px">{`Add Items to ${order.initiator.firstName}'s ${order.platform.name} Order`}</Typography> */}
                            <Typography variant="h5" marginBottom="10px">{`Group ${data.id}: ${data.title}`}</Typography>
                            <Divider sx={{marginBottom: "25px"}} />
                            <Stack spacing={2}>
                                <Typography variant="body1">Description: {data.description}</Typography>
                                <Typography variant="body1">Location: {data.location}</Typography>
                                <Typography variant="body1">Status: {data.status}</Typography>
                            </Stack>
                            {/* <Button type="submit" variant="contained" fullWidth
                                    sx={{marginTop: "30px", fontWeight: "800"}}>
                                <AddIcon sx={{marginRight: "5px"}}/> Add
                            </Button> */}
                        </Paper>
                    }
                    {
                        <Paper sx={{padding: "20px 30px 30px"}}>
                            <Typography variant="h5" marginBottom="15px">Reports</Typography>
                            {/* <Typography fontSize="18px" marginBottom="5px">Hooray! You've submitted your items to the group order.</Typography>
                            <Typography fontSize="18px" marginBottom="20px">Once the initiator accepts your items, we'll let you know, and the order will show up on your "Joined Orders" page.</Typography>
                            <Button variant="contained" color="primary" sx={{fontWeight: "600", marginRight: "15px"}} component={Link} to={"/reports"}>Back to reports</Button>
                            <Button variant="outlined" color="primary" sx={{fontWeight: "600"}} component={Link} to={"/groups"}>Back to groups</Button> */}
                            <List>
                                 {reports.map(item => (
                                    <ListItem key={item.id}>
                                        <ListItemText primary={`Report ${item.id}: ${item.title}`} />
                                        <IconButton onClick={(event) => addToGroup(event, item)}>
                                            <InfoOutlinedIcon/>
                                        </IconButton>
                                        <IconButton onClick={(event) => addToGroup(event, item)}>
                                            <DeleteOutlineOutlinedIcon sx={{ color: "red" }}/>
                                        </IconButton>
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    }
                </Grid>
                <Grid item xs={12} md={6} lg={5}>
                    <Paper sx={{padding: "20px 30px 30px"}}>
                        <Typography variant="h5" marginBottom="10px">Suggested Reports</Typography>
                        <Divider sx={{marginBottom: "25px"}} />
                        {
                            <>
                                <List dense sx={{marginTop: "10px"}}>
                                    {rows.map((item, i) => (
                                            <ListItem
                                                key={i}
                                                disablePadding
                                            >
                                                <ListItemButton dense>
                                                    <ListItemIcon>
                                                        <ArrowBackIosIcon sx={{color: "success.main"}} />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={
                                                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                                                <Typography fontWeight="500" sx={{
                                                                    overflow: "hidden",
                                                                    textOverflow: "ellipsis",
                                                                    display: "-webkit-box",
                                                                    WebkitLineClamp: "2",
                                                                    WebkitBoxOrient: "vertical",
                                                                }}>
                                                                    {item.name}
                                                                </Typography>
                                                                <Typography marginLeft="30px" fontSize="1.3em" fontWeight="500">
                                                                    {`Report ${item.id}: ${item.title}`}
                                                                </Typography>
                                                            </Stack>
                                                        }
                                                    />
                                                </ListItemButton>
                                            </ListItem>
                                    ))}
                                </List>
                            </>
                        }
                    </Paper>
                </Grid>
            </Grid>
        </Container>
        // <Container>
        //     <Grid container spacing={2}>
        //         <Grid item xs={8}>
        //             <Item>
        //                 <Container>
        //                     <Typography variant="h5">{data.title} <span sx={{fontWeight: "bold"}}>({data.id})</span></Typography>
        //                     <Stack direction="column" spacing={2}>
        //                         <Typography variant="body1">Description: {data.description}</Typography>
        //                         <Typography variant="body1">Location: {data.location}</Typography>
        //                         <Typography variant="body1">Status: {data.status}</Typography>
        //                     </Stack>
        //                 </Container>
        //                     <List>
        //                         {reports.map(item => (
        //                             <ListItem key={item.id}>
        //                                 <ListItemText primary={`Report ${item.id}: ${item.title}`} />
        //                                 <IconButton onClick={(event) => addToGroup(event, item)}>
        //                                     <InfoOutlinedIcon/>
        //                                 </IconButton>
        //                                 <IconButton onClick={(event) => addToGroup(event, item)}>
        //                                     <DeleteOutlineOutlinedIcon/>
        //                                 </IconButton>
        //                             </ListItem>
        //                         ))}
        //                     </List>
        //                     {/* <Link href={`/reports/${report.id}`}>{report.title}</Link>
        //                      */}
        //             </Item>
        //         </Grid>
        //         <Grid item xs={4}>
        //             <Item>
        //                 <Container>
        //                     <h4>Suggested</h4>
        //                     <List>
        //                         {rows.map(item => (
        //                             <ListItem key={item.id}>
        //                                 <IconButton onClick={(event) => addToGroup(event, item)}>
        //                                     <ArrowBackIosIcon/>
        //                                 </IconButton>
        //                                 <Box 
        //                                     padding={1}
        //                                     display="flex"
        //                                     flexDirection="column"
        //                                     alignItems="center"
        //                                     justifyContent="center"
        //                                 >
        //                                     <Typography variant="subtitle1">Report {item.id}: {item.title}</Typography>
        //                                 </Box>
        //                             </ListItem>
        //                         ))}
        //                     </List>
        //                 </Container>
        //             </Item>
        //         </Grid>
        //     </Grid>
        // </Container>
      );
}

export default Group;