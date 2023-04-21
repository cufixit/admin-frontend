import { Container } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AccountContext } from "./AccountContext";
import apigClient from "../ApigClient";

const Report = () => {
  const params = useParams();
  const { session } = useContext(AccountContext);

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  const getReport = async () => {
    try {
      const response = await apigClient.invokeApi(
        {},
        `/admin/reports/${params.id}`,
        "GET",
        {
          headers: { Authorization: session["idToken"]["jwtToken"] },
        }
      );
      console.log(response);
      setReport(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReport();
  }, []);

  return loading ? (
    ""
  ) : (
    <Container>
      <h1>{report.title}</h1>
      <h2>Details</h2>
      <div>Description: {report.description}</div>
      <div>Location: {report.location}</div>
      <div>Status: {report.status}</div>
      {report.imageUrls.map((url) => (
        <img src={url} alt="image" key={url} />
      ))}
    </Container>
  );
};

export default Report;
