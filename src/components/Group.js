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
    Modal,
    Paper, Stack,
    TextField,
    Typography
} from "@mui/material";

const Group = () => {
    let location = useLocation();
    const data = location.state.data;
    const report = location.state.report;
    const [reports, setReports] = useState([report]);
    const [modalContent, setModalContent] = useState({});
    const [suggested, setSuggested] = useState(null);
    const [open, setOpen] = useState(false);
    const handleOpen = async (event, item) => {
        event.preventDefault();
        setOpen(true);
        setModalContent(item);
    }
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        border: '1px solid #000',
        boxShadow: 24,
        p: 5,
    };

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
                                        <IconButton onClick={(event) => handleOpen(event, item)}>
                                            <InfoOutlinedIcon/>
                                        </IconButton>
                                        <IconButton>
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
                                                <IconButton onClick={(event) => addToGroup(event, item)}>
                                                    <ArrowBackIosIcon/>
                                                </IconButton>
                                                <ListItemText
                                                    primary={
                                                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                                                            <Typography fontWeight="500" onClick={(event) => handleOpen(event, item)} sx={{
                                                                overflow: "hidden",
                                                                textOverflow: "ellipsis",
                                                                display: "-webkit-box",
                                                                WebkitLineClamp: "2",
                                                                WebkitBoxOrient: "vertical",
                                                            }}>
                                                                {`Report ${item.id}: ${item.title}`}
                                                            </Typography>
                                                        </Stack>
                                                    }
                                                />
                                            </ListItem>
                                    ))}
                                </List>
                            </>
                        }
                    </Paper>
                </Grid>
            </Grid>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    {`Report ${modalContent.id}: ${modalContent.title}`}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 3 }}>
                    {`Description: ${modalContent.description}`}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {`Location: ${modalContent.location}`}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {`Status: ${modalContent.status}`}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {`Date Submitted: ${modalContent.date}`}
                    </Typography>
                </Box>
            </Modal>
        </Container>
      );
}

export default Group;