// import { Container, ListItemText, Stack } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AccountContext } from "./AccountContext";
import { useLocation } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CheckIcon from "@mui/icons-material/Check";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import apigClient from "../ApigClient";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Modal,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

const Group = () => {
  let location = useLocation();
  const data = location.state.data;
  const report = location.state.report;
  const [reports, setReports] = useState([report]);
  const [suggested, setSuggested] = useState(null);
  const [added, setAdded] = useState([]);
  const [confirmedIds, setConfirmedIds] = useState([]);

  // Modal for viewing a report
  const [modalContent, setModalContent] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = async (event, item) => {
    event.preventDefault();
    setOpen(true);
    setModalContent(item);
  };
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 5,
  };

  let rows = [
    {
      reportID: 1,
      title: "Clogged sink on 5th floor kitchen",
      description:
        "The sink is clogged and has been clogged since last Sunday.",
      building: "Schapiro Residence Hall",
      status: "Submitted",
      date: "1/20/2023 2:58 PM EST",
    },
    {
      reportID: 3,
      title: "Broken radiator in 555",
      description:
        "Radiator keeps on making weird noises. It will keep turning on and off for 5 minutes straight every day.",
      building: "Alfred Lerner Hall",
      status: "In progress",
      date: "2/20/2023 1:00 PM EST",
    },
    {
      reportID: 6,
      title: "Air conditioner not working in 627",
      description: "AC doesn't work.",
      building: "Northwest Corner",
      status: "In progress",
      date: "12/2/2022 11:31 AM EST",
    },
  ];
  rows.map((row) => (row["id"] = row["reportID"]));

  // Adds a suggested report to the group
  const addSuggested = async (event, item) => {
    event.preventDefault();
    try {
      if (
        added.find((elem) => elem.id === item.id) === undefined &&
        reports.find((elem) => elem.id === item.id) === undefined
      ) {
        setAdded([...added, item]);
        setConfirmedIds([...confirmedIds, item.id]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Removes suggested report from the group
  const removeSuggested = async (event, item) => {
    event.preventDefault();
    try {
      setAdded(added.filter((elem) => elem.id !== item.id));
      setConfirmedIds(confirmedIds.filter((elem) => elem !== item.id));
    } catch (error) {
      console.log(error);
    }
  };

  // Confirms and posts the request to add the suggested reports to the group
  const confirmAdd = async (event) => {
    event.preventDefault();
    try {
      // const response = await apigClient.invokeApi(
      //   {},
      //   `/groups/${params.id}/reports`,
      //   "POST",
      //   { headers: { Authorization: session["idToken"]["jwtToken"] } },
      //   confirmedIds
      // )
      // console.log(response);
      setReports([...reports, ...added]);
      setAdded([]);
      setConfirmedIds([]);
    } catch (error) {
      console.log(error);
    }
  };

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
      //     `/groups/${params.id}/suggest`,
      //     "GET",
      //     { headers: { Authorization: session["idToken"]["jwtToken"] } },
      // );
      // console.log(response);
      // setSuggested(response.data);
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
    <Container fixed sx={{ marginTop: "100px" }}>
      <Grid container spacing={5}>
        <Grid item xs={12} md={6} lg={7}>
          {
            <Paper sx={{ padding: "20px 30px 30px" }}>
              <Typography
                variant="h5"
                marginBottom="10px"
              >{`Group ${data.id}: ${data.title}`}</Typography>
              <Divider sx={{ marginBottom: "25px" }} />
              <Stack spacing={2}>
                <Typography variant="body1">
                  Description: {data.description}
                </Typography>
                <Typography variant="body1">
                  Building: {data.building}
                </Typography>
                <Typography variant="body1">Status: {data.status}</Typography>
              </Stack>
              <Paper sx={{ marginTop: "20px" }}>
                <List>
                  {reports.map((item) => (
                    <ListItem key={item.id}>
                      <ListItemText primary={`${item.title}`} />
                      <IconButton onClick={(event) => handleOpen(event, item)}>
                        <InfoOutlinedIcon />
                      </IconButton>
                      <IconButton>
                        <DeleteOutlineOutlinedIcon sx={{ color: "red" }} />
                      </IconButton>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Paper>
          }
          {added.length == 0 ? (
            <></>
          ) : (
            <Paper sx={{ padding: "20px 30px 30px", margin: "30px 0px 50px" }}>
              <Typography variant="h5" marginBottom="15px">
                Reports to Add
              </Typography>
              <List>
                {added.map((item) => (
                  <ListItem key={item.id}>
                    <ListItemText primary={`${item.title}`} />
                    <IconButton onClick={(event) => handleOpen(event, item)}>
                      <InfoOutlinedIcon />
                    </IconButton>
                    <IconButton
                      onClick={(event) => removeSuggested(event, item)}
                    >
                      <DeleteOutlineOutlinedIcon sx={{ color: "red" }} />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
              <Button
                variant="contained"
                color="success"
                fullWidth
                sx={{ marginTop: "10px", fontWeight: "800" }}
                onClick={confirmAdd}
              >
                <CheckIcon sx={{ marginRight: "5px" }} /> Confirm Add Reports
              </Button>
            </Paper>
          )}
        </Grid>
        <Grid item xs={12} md={6} lg={5}>
          <Paper sx={{ padding: "20px 30px 30px" }}>
            <Typography variant="h5" marginBottom="10px">
              Suggested Reports
            </Typography>
            <Divider sx={{ marginBottom: "25px" }} />
            {
              <>
                <List dense sx={{ marginTop: "10px" }}>
                  {rows.map((item, i) => (
                    <ListItem key={i} disablePadding>
                      <IconButton
                        onClick={(event) => addSuggested(event, item)}
                      >
                        <ArrowBackIosIcon />
                      </IconButton>
                      <ListItemText
                        primary={
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Typography
                              fontWeight="500"
                              sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: "2",
                                WebkitBoxOrient: "vertical",
                              }}
                            >
                              {`${item.title}`}
                            </Typography>
                            <IconButton
                              onClick={(event) => handleOpen(event, item)}
                            >
                              <InfoOutlinedIcon />
                            </IconButton>
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
            {`${modalContent.title}`}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 3 }}>
            {`Description: ${modalContent.description}`}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {`Building: ${modalContent.building}`}
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
};

export default Group;
