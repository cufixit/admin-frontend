import { Container } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AccountContext } from "./AccountContext";
import { useLocation, Link } from "react-router-dom";
import apigClient from "../ApigClient";
import Button from '@material-ui/core/Button';

const Report = () => {
  const params = useParams();
  const { session } = useContext(AccountContext);

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  // const getReport = async () => {
  //   try {
  //     const response = await apigClient.invokeApi(
  //       {},
  //       `/admin/reports/${params.id}`,
  //       "GET",
  //       {
  //         headers: { Authorization: session["idToken"]["jwtToken"] },
  //       }
  //     );
  //     console.log(response);
  //     setReport(response.data);
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getReport();
  // }, []);

  // return loading ? (
  //   ""
  // ) : (
  let location = useLocation();
  const data = location.state.data;

  return (
    <Container>
      <h1>{data.title}</h1>
      <h2>Details</h2>
      <div>Description: {data.description}</div>
      <div>Location: {data.location}</div>
      <div>Status: {data.status}</div>
      {/* {report.imageUrls.map((url) => (
        <img src={url} alt="image" key={url} />
      ))} */}
      <Button component={Link} state={{ data: data }} to="/new" variant="contained">
        Create Group
      </Button>
    </Container>
  );
};

export default Report;
