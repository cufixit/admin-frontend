import { Container } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AccountContext } from "./AccountContext";
import { useLocation, useNavigate, Link } from "react-router-dom";
import apigClient from "../ApigClient";
import Button from '@material-ui/core/Button';

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
      navigate("/new", {state: { data: report }});
    } catch (error) {
      console.log(error);
    }
  };

  return loading ? (
    ""
  ) : (
    <Container>
      <h1>{report.title}</h1>
      <h2>Details</h2>
      <div>Description: {report.description}</div>
      <div>Location: {report.location}</div>
      <div>Status: {report.status}</div>
      {report.imageUrls?.map((url) => (
        <img src={url} alt="image" key={url} />
      ))}
      <Button variant="contained" onClick={onSubmit}>
        Create Group
      </Button>
    </Container>
  );
};

export default Report;
