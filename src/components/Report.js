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
import RefreshIcon from "@mui/icons-material/Refresh";

const Report = () => {
  const params = useParams();
  const { session } = useContext(AccountContext);
  const navigate = useNavigate();

  const [report, setReport] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const getReport = async () => {
    try {
      const response = await apigClient.invokeApi(
        {},
        `/reports/${params.id}`,
        "GET",
        {
          headers: { Authorization: session["idToken"]["jwtToken"] },
        }
      );
      console.log(response);
      setReport(response.data.report);
      setImages(response.data.images);
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
              >{`${report.title}`}</Typography>
              <Divider sx={{ marginBottom: "25px" }} />
              <Stack spacing={2}>
                <Typography variant="body1">
                  Description: {report.description}
                </Typography>
                <Typography variant="body1">
                  Building: {report.building}
                </Typography>
                <Typography variant="body1">Status: {report.status}</Typography>
                <Typography variant="body1">
                  Date submitted: {report.createdDate}
                </Typography>
                <Typography variant="body1">User: {report.userId}</Typography>
              </Stack>
              {images.map((url) => (
                <img width="50%" src={url} alt="image" key={url} />
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
