// import { Container, ListItemText, Stack } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AccountContext } from "./AccountContext";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CheckIcon from "@mui/icons-material/Check";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import apigClient from "../ApigClient";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Modal,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

const Group = () => {
  const params = useParams();
  const { session } = useContext(AccountContext);

  //   let location = useLocation();
  //   const data = location.state.data;
  //   const report = location.state.report;
  const [reports, setReports] = useState([]);
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [suggested, setSuggested] = useState(null);
  const [added, setAdded] = useState([]);
  const [confirmedIds, setConfirmedIds] = useState([]);
  const [status, setStatus] = useState("SUBMITTED");
  const [editStatus, setEditStatus] = useState(false);

  const navigate = useNavigate();

  // Modal for viewing a report
  const [modalContent, setModalContent] = useState({});
  const [open, setOpen] = useState(false);

  // Dialog for deleting a group and/or reports
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpen = async (event, item) => {
    event.preventDefault();
    console.log(item);
    getReport(item);
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
      const response = await apigClient.invokeApi(
        {},
        `/groups/${params.id}/reports`,
        "PUT",
        { headers: { Authorization: session["idToken"]["jwtToken"] } },
        {
          reports: [...reports.map((report) => report.id), ...confirmedIds],
        }
      );
      setReports([...reports, ...added]);
      setAdded([]);
      setConfirmedIds([]);
    } catch (error) {
      console.log(error);
    }
  };

  // Gets the reports that are in the group
  const getGroup = async () => {
    try {
      const response = await apigClient.invokeApi(
        {},
        `/groups/${params.id}`,
        "GET",
        {
          headers: { Authorization: session["idToken"]["jwtToken"] },
        }
      );
      console.log(response);
      setGroup(response.data.group);
      setReports(
        response.data.reports.map((report) => ({
          ...report,
          id: report.reportId,
        }))
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Deletes the group
  const deleteGroup = async () => {
    try {
      const response = await apigClient.invokeApi(
        {},
        `/groups/${params.id}`,
        "DELETE",
        {
          headers: { Authorization: session["idToken"]["jwtToken"] },
        }
      );
      console.log(response);
      navigate("/groups");
    } catch (error) {
      console.log(error);
    }
  };

  // Deletes the reports in the group
  const deleteReports = async () => {
    try {
      const response = await apigClient.invokeApi(
        {},
        `/groups/${params.id}?cascade=true`,
        "DELETE",
        {
          headers: { Authorization: session["idToken"]["jwtToken"] },
        }
      );
      console.log(response);
      navigate("/groups");
    } catch (error) {
      console.log(error);
    }
  };

  // Deletes a report from the group
  const deleteReportFromGroup = async (event, item) => {
    event.preventDefault();
    setReports(reports.filter((elem) => elem.id !== item.reportId));
    const filteredReports = reports.filter((elem) => elem.id !== item.reportId);
    try {
      const response = await apigClient.invokeApi(
        {},
        `/groups/${params.id}/reports`,
        "PUT",
        {
          headers: { Authorization: session["idToken"]["jwtToken"] },
        },
        {
          reports: [filteredReports.map((report) => report.id)],
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // Gets specific report
  const getReport = async (item) => {
    try {
      const response = await apigClient.invokeApi(
        {},
        `/reports/${item.id}`,
        "GET",
        {
          headers: { Authorization: session["idToken"]["jwtToken"] },
        }
      );
      console.log(response);
      setModalContent(response.data.report);
      setOpen(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Gets suggested reports
  const getSuggested = async () => {
    try {
      const response = await apigClient.invokeApi(
        {},
        `/groups/${params.id}/suggest`,
        "GET",
        { headers: { Authorization: session["idToken"]["jwtToken"] } }
      );
      console.log(response);
      setSuggested(
        response.data.reports.map((report) => ({
          ...report,
          id: report.reportId,
        }))
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (event) => {
    event.preventDefault();
    try {
      const response = await apigClient.invokeApi(
        {},
        "/groups",
        "PATCH",
        { headers: { Authorization: session["idToken"]["jwtToken"] } },
        { status: status }
      );
      setEditStatus(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGroup();
    getSuggested();
  }, []);

  return loading ? (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      Loading...
      <RefreshIcon />
    </Grid>
  ) : (
    <Container fixed sx={{ marginTop: "100px" }}>
      <Grid container spacing={5}>
        <Grid item xs={12} md={6} lg={7}>
          {
            <Paper sx={{ padding: "20px 30px 30px" }}>
              <Typography
                variant="h5"
                marginBottom="10px"
              >{`${group?.title}`}</Typography>
              <Divider sx={{ marginBottom: "25px" }} />
              <Stack spacing={2}>
                <Typography variant="body1">
                  Description: {group?.description}
                </Typography>
                <Typography variant="body1">
                  Building: {group?.building}
                </Typography>
                {editStatus ? (
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Status
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={status}
                      label="Status"
                      onChange={(event) => setStatus(event.target.value)}
                    >
                      <MenuItem value={"SUBMITTED"}>SUBMITTED</MenuItem>
                      <MenuItem value={"REVIEWING"}>REVIEWING</MenuItem>
                      <MenuItem value={"RESOLVED"}>RESOLVED</MenuItem>
                    </Select>
                    <Button
                      type="submit"
                      variant="contained"
                      onClick={updateStatus}
                    >
                      Update status
                    </Button>
                  </FormControl>
                ) : (
                  <>
                    <Typography variant="body1">
                      Status: {group?.status}
                    </Typography>
                    <Button
                      type="submit"
                      variant="contained"
                      onClick={(event) => setEditStatus(true)}
                    >
                      Edit status
                    </Button>
                  </>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    marginTop: "30px",
                    fontWeight: "800",
                    backgroundColor: "red",
                  }}
                  onClick={(event) => setDialogOpen(true)}
                >
                  Delete
                </Button>
                <Dialog
                  open={dialogOpen}
                  onClose={(event) => setDialogOpen(false)}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Delete Group"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Would you like to delete all the reports in this group as
                      well?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "red",
                      }}
                      onClick={deleteReports}
                    >
                      Yes, delete the reports.
                    </Button>
                    <Button variant="contained" onClick={deleteGroup}>
                      No, just delete the group.
                    </Button>
                  </DialogActions>
                </Dialog>
              </Stack>
              <Paper sx={{ marginTop: "20px" }}>
                <List>
                  {reports.map((item) => (
                    <ListItem key={item.id}>
                      <ListItemText primary={`${item.title}`} />
                      <IconButton onClick={(event) => handleOpen(event, item)}>
                        <InfoOutlinedIcon />
                      </IconButton>
                      <IconButton
                        onClick={(event) => deleteReportFromGroup(event, item)}
                      >
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
                {suggested === null ? (
                  <></>
                ) : (
                  <List dense sx={{ marginTop: "10px" }}>
                    {suggested.map((item, i) => (
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
                )}
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
            {`Date Submitted: ${modalContent.createdDate}`}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {`User ID: ${modalContent.userId}`}
          </Typography>
        </Box>
      </Modal>
    </Container>
  );
};

export default Group;
