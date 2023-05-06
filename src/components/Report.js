import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AccountContext } from "./AccountContext";
import { useLocation, useNavigate, Link } from "react-router-dom";
import apigClient from "../ApigClient";
import {
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

const Report = () => {
  const params = useParams();
  const { session } = useContext(AccountContext);
  const navigate = useNavigate();

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  let location = useLocation();

  const getReport = async () => {
    try {
      // const response = await apigClient.invokeApi(
      //   {},
      //   `/admin/reports/${params.id}`,
      //   "GET",
      //   {
      //     headers: { Authorization: session["idToken"]["jwtToken"] },
      //   }
      // );
      // console.log(response);
      // setReport(response.data);
      setReport(location.state.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReport();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      // const response = await apigClient.invokeApi(
      //   {},
      //   "/admin/groups",
      //   "POST",
      //   { headers: { Authorization: session["idToken"]["jwtToken"] } },
      //   report
      // );
      // console.log(response);
      navigate("/new", { state: { data: report } });
    } catch (error) {
      console.log(error);
    }
  };

  return loading ? (
    ""
  ) : (
    <Container fixed sx={{ marginTop: "100px" }}>
      <Grid container spacing={5} justifyContent="center">
        <Grid item xs={12} md={6} lg={7}>
          {
            <Paper sx={{ padding: "20px 30px 30px" }}>
              <Typography
                variant="h5"
                marginBottom="10px"
              >{`Report ${report.id}: ${report.title}`}</Typography>
              <Divider sx={{ marginBottom: "25px" }} />
              <Stack spacing={2}>
                <Typography variant="body1">
                  Description: {report.description}
                </Typography>
                <Typography variant="body1">
                  Location: {report.location}
                </Typography>
                <Typography variant="body1">Status: {report.status}</Typography>
                <Typography variant="body1">
                  Date submitted: {report.date}
                </Typography>
                <Typography variant="body1">User: {report.userID}</Typography>
              </Stack>
              {report.imageUrls?.map((url) => (
                <img src={url} alt="image" key={url} />
              ))}
              <Button
                type="submit"
                variant="contained"
                sx={{ marginTop: "30px", fontWeight: "800" }}
                onClick={onSubmit}
              >
                Create Group
              </Button>
            </Paper>
          }
        </Grid>
      </Grid>
    </Container>
  );
};

export default Report;
