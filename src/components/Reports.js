import React, { useState, useContext, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";
import { AccountContext } from "./AccountContext";
import apigClient from "../ApigClient";

const Reports = () => {
  const { session } = useContext(AccountContext);

  const [reports, setReports] = useState(null);
  const [loading, setLoading] = useState(true);

  const getReports = async () => {
    try {
      const response = await apigClient.invokeApi({}, "/admin/reports", "GET", {
        headers: { Authorization: session["idToken"]["jwtToken"] },
      });
      console.log(response);
      setReports(
        response.data.map((report) => ({ ...report, id: report.reportID }))
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReports();
  }, []);

  const columns = [
    { field: "reportID", headerName: "Report #", type: "number", width: 70 },
    { field: "title", headerName: "Report Title", width: 300 },
    { field: "description", headerName: "Description" },
    { field: "location", headerName: "Location", width: 200 },
    { field: "status", headerName: "Status", width: 200 },
    {
      field: "details",
      headerName: "Details",
      sortable: false,
      renderCell: (cellValues) => {
        return <Link to={`/reports/${cellValues.id}`}>Details</Link>;
      },
    },
    { field: "date" },
  ];

  return loading ? (
    ""
  ) : (
    <Container maxWidth="lg">
      <div style={{ fontSize: "200%" }}>Reports</div>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          initialState={{
            columns: {
              columnVisibilityModel: {
                description: false,
                date: false,
              },
            },
          }}
          rows={reports}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </Container>
  );
};

export default Reports;
